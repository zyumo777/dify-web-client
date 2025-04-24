import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SendIcon, FileIcon } from './icons';
import { css, Global } from '@emotion/react';

interface ChatInputBoxProps {
  onSendMessage: (content: string, files?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
  showFileUpload?: boolean;
}

// 常量配置
const CONSTANTS = {
  BUTTON_ZONE_WIDTH: 120, // 按钮区域宽度，单位px
  ACTIVATION_THRESHOLD: 5, // 左侧边缘缓冲区，单位px
  MIN_HEIGHT: 58, // textarea最小高度
  MAX_LINES: 10, // textarea最大行数
  EXTRA_HEIGHT: 16 // 额外高度padding
};

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = '输入您的问题...',
  showFileUpload = false,
}) => {
  // 状态管理
  const [message, setMessage] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [showBackground, setShowBackground] = useState<boolean>(false);
  
  // DOM引用
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 计算文本宽度并决定是否显示背景
  const checkTextWidth = useCallback(() => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const textWidth = getTextWidth(message, getComputedStyle(textarea).font);
    const availableWidth = textarea.clientWidth - (CONSTANTS.BUTTON_ZONE_WIDTH + CONSTANTS.ACTIVATION_THRESHOLD);
    
    // 如果文本宽度接近或超过可用宽度，显示背景
    if (textWidth > availableWidth) {
      setShowBackground(true);
    } else if (textWidth < availableWidth - CONSTANTS.ACTIVATION_THRESHOLD * 2) {
      // 只有当文本宽度明显小于可用宽度时才隐藏背景，添加额外缓冲区防止频繁切换
      setShowBackground(false);
    }
  }, [message]);

  // 辅助函数：计算文本宽度
  const getTextWidth = (text: string, font: string): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;
    
    context.font = font;
    return context.measureText(text).width;
  };

  // 调整textarea高度
  const adjustTextareaHeight = useCallback(() => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 24;
    
    // 重置高度，让scrollHeight正确计算
    textarea.style.height = 'auto';
    
    // 计算实际内容需要的高度（不含额外padding）
    const contentHeight = Math.max(
      CONSTANTS.MIN_HEIGHT, // 最小高度
      Math.min(textarea.scrollHeight, lineHeight * CONSTANTS.MAX_LINES + CONSTANTS.EXTRA_HEIGHT) // 最大高度为设定行数
    );
    
    // 最终高度 = 内容高度 + (显示背景时的额外高度)
    const extraPadding = showBackground ? 0 : 0; // 显示背景时额外添加的高度
    const finalHeight = contentHeight + extraPadding;
    
    textarea.style.height = `${finalHeight}px`;
  }, [showBackground]);

  // 监听输入内容变化
  useEffect(() => {
    // 调整textarea高度
    adjustTextareaHeight();
    
    // 检查文本宽度
    checkTextWidth();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', checkTextWidth);
    return () => window.removeEventListener('resize', checkTextWidth);
  }, [message, showBackground, adjustTextareaHeight, checkTextWidth]);

  // 事件处理函数
  // 发送消息
  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage || files.length > 0) {
      onSendMessage(trimmedMessage, files.length > 0 ? files : undefined);
      setMessage('');
      setFiles([]);
      setShowBackground(false);
    }
  };

  // 处理键盘事件（Enter发送消息，Shift+Enter换行）
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 处理文件上传
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  // 处理文件点击上传按钮
  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 移除已上传的文件
  const handleRemoveFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  // 处理粘贴图片
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (!showFileUpload) return;
    
    const items = e.clipboardData.items;
    const imageFiles: File[] = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          imageFiles.push(file);
        }
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault();
      setFiles(prevFiles => [...prevFiles, ...imageFiles]);
    }
  };

  // 渲染部分
  return (
    <>
      <Global 
        styles={css`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      />
      
      {/* 文件预览区域 */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 mb-2 border rounded-lg bg-white">
          {files.map((file, index) => (
            <div key={index} className="relative group">
              {file.type.startsWith('image/') ? (
                <div className="relative w-20 h-20 rounded overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="relative flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                  <FileIcon className="w-4 h-4" />
                  <span className="text-xs truncate max-w-[150px]">{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 输入框容器 */}
      <div className="relative rounded-lg">
        {/* 文本输入区域 */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full py-4 px-3 focus:outline-none resize-none bg-white focus:ring-1 focus:ring-primary border-0 rounded-lg shadow-md scrollbar-hide"
          style={{ 
            minHeight: `${CONSTANTS.MIN_HEIGHT}px`,
            paddingBottom: showBackground ? '64px' : '16px',
            overflowY: 'auto',
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none' /* IE and Edge */
          }}
        />
        
        {/* 浮动按钮区域 */}
        <div 
          className="absolute right-0 bottom-1.5 z-10 px-4 flex items-center justify-end gap-2"
          style={{
            width: showBackground ? '100%' : `${CONSTANTS.BUTTON_ZONE_WIDTH}px`,
            height: '58px',
            backgroundColor: showBackground ? 'white' : 'transparent',
            pointerEvents: showBackground ? 'auto' : 'none',
            borderRadius: '0.75rem',
            transition: 'width 0.2s ease, background-color 0.2s ease'
          }}
        >
          {/* 按钮容器 */}
          <div className="flex items-center gap-2" style={{ pointerEvents: 'auto' }}>
            {/* 文件上传按钮 */}
            {showFileUpload && (
              <>
                <button
                  onClick={handleFileUploadClick}
                  className="flex items-center justify-center text-gray-500 bg-gray-200 p-2 rounded-full shadow-sm border-2 border-transparent box-border hover:text-primary hover:border-primary"
                  style={{width: '36px', height: '36px'}}
                  disabled={disabled}
                  aria-label="上传文件"
                >
                  <FileIcon className="w-5 h-5" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                  multiple
                />
              </>
            )}

            {/* 发送按钮 */}
            <button
              onClick={handleSendMessage}
              className={`flex items-center justify-center p-2 rounded-full shadow-sm ${
                message.trim() || files.length > 0
                  ? 'text-primary box-border border-2 border-primary bg-white hover:bg-gray-50'
                  : 'text-gray-400 bg-gray-200 cursor-not-allowed border-2 border-transparent'
              }`}
              disabled={disabled || (!message.trim() && files.length === 0)}
              aria-label="发送消息"
              style={{width: '36px', height: '36px'}}
            >
              <SendIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInputBox; 