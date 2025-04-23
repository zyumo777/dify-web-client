import React, { useState, useRef } from 'react';
import { SendIcon, FileIcon } from './icons';
import TextArea from './ui/TextArea';

interface ChatInputBoxProps {
  onSendMessage: (content: string, files?: File[]) => void;
  disabled?: boolean;
  placeholder?: string;
  showFileUpload?: boolean;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = '输入您的问题...',
  showFileUpload = false,
}) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 发送消息
  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage || files.length > 0) {
      onSendMessage(trimmedMessage, files.length > 0 ? files : undefined);
      setMessage('');
      setFiles([]);
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
      // 将FileList转换为File数组
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
  const handlePaste = (e: React.ClipboardEvent) => {
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

  return (
    <div className="relative border rounded-lg shadow-sm bg-white">
      {/* 显示已上传的文件预览 */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 border-b">
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

      <div className="flex items-end p-2">
        {/* 文件上传按钮 */}
        {showFileUpload && (
          <>
            <button
              onClick={handleFileUploadClick}
              className="p-2 text-gray-500 hover:text-gray-700"
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

        {/* 文本输入框 */}
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          disabled={disabled}
          autoResize
          minRows={1}
          maxRows={6}
          className="flex-1 py-2 px-3 focus:outline-none resize-none"
        />

        {/* 发送按钮 */}
        <button
          onClick={handleSendMessage}
          className={`p-2 rounded-full ${
            message.trim() || files.length > 0
              ? 'text-primary hover:bg-gray-100'
              : 'text-gray-400 cursor-not-allowed'
          }`}
          disabled={disabled || (!message.trim() && files.length === 0)}
          aria-label="发送消息"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInputBox; 