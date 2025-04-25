import React from 'react';
import { Message } from '@/types';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import { RobotIcon, ChatUserIcon } from '@/components/icons';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
  showTimestamp?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isStreaming = false,
  showTimestamp = false,
}) => {
  const isUser = message.role === 'user';
  const isThinking = message.role === 'assistant' && message.content.includes('Thinking');

  // 格式化时间戳
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`py-2 ${isStreaming && !isUser ? 'animate-pulse' : ''}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-start gap-2`}>
          {/* 非用户消息显示头像 */}
          {!isUser && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <RobotIcon className="w-8 h-8 text-primary" />
              </div>
            </div>
          )}

          {/* 消息内容 */}
          <div className={`max-w-[80%]`}>
            {/* 思考过程特殊处理 */}
            {isThinking ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                <MarkdownRenderer content={message.content} />
              </div>
            ) : (
              <div className={`py-0.5 px-3 ${isUser ? 'bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg' : 'bg-gray-100 text-gray-800 rounded-tr-lg rounded-br-lg rounded-bl-lg'}`}>
                {/* 文件处理 */}
                {message.files && message.files.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {message.files.map((file, index) => (
                      <div key={index} className="relative">
                        {file.type.startsWith('image/') ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="max-w-xs max-h-60 rounded object-contain"
                          />
                        ) : (
                          <div className={`p-2 rounded ${isUser ? 'bg-blue-400' : 'bg-gray-200'}`}>
                            <span>{file.name}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Markdown渲染 */}
                <MarkdownRenderer content={message.content} />
              </div>
            )}

            {/* 时间戳 */}
            {showTimestamp && (
              <div className={`mt-1 text-xs text-gray-500 ${isUser ? 'text-right' : 'text-left'}`}>
                {formatTimestamp(message.createdAt)}
              </div>
            )}
          </div>

          {/* 用户消息显示头像 */}
          {isUser && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <ChatUserIcon className="w-8 h-8 text-primary" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 