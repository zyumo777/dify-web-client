import React from 'react';
import { Message } from '@/types';
import MarkdownRenderer from './ui/MarkdownRenderer';
import { LogoIcon, UserIcon } from './icons';

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
    <div
      className={`py-6 ${isUser ? 'bg-white' : 'bg-gray-50'} ${
        isStreaming && !isUser ? 'animate-pulse' : ''
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-start gap-4">
          {/* 头像 */}
          <div className="flex-shrink-0 mt-1">
            {isUser ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-gray-600" />
              </div>
            ) : (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <LogoIcon className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          {/* 消息内容 */}
          <div className="flex-1 min-w-0">
            {/* 思考过程特殊处理 */}
            {isThinking ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="inline-block w-4 h-4 mr-2 bg-gray-400 rounded-sm" />
                  <span className="font-medium text-gray-700">Thinking</span>
                </div>
                <MarkdownRenderer content={message.content} />
              </div>
            ) : (
              <div>
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
                          <div className="bg-gray-100 p-2 rounded">
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
              <div className="mt-1 text-xs text-gray-500">
                {formatTimestamp(message.createdAt)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 