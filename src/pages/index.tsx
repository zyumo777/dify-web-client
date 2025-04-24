import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore, useAppStore, useConversationStore } from '@/store';
import AppHeader from '@/components/layout/AppHeader';
import Sidebar from '@/components/layout/Sidebar';
import ChatInputBox from '@/components/chat/ChatInputBox';
import ChatMessage from '@/components/chat/ChatMessage';
import Button from '@/components/ui/Button';
import { StopIcon } from '@/components/icons';
import { Message } from '@/types';
import { sendChatMessage, stopResponseStream, uploadFile } from '@/utils/api';
import { handleStream, parseSSEResponse, decodeStreamContent } from '@/utils/streamParser';

export default function Home() {
  const router = useRouter();
  const { user, isLoggedIn } = useUserStore();
  const { currentApp, apps } = useAppStore();
  const { 
    conversations,
    currentConversation,
    setCurrentConversation,
    addMessageToConversation,
    addConversation,
    fetchConversations
  } = useConversationStore();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // 检查系统是否已初始化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isInitialized = localStorage.getItem('isInitialized');
      
      if (!isInitialized) {
        // 系统未初始化，跳转到初始化页面
        router.push('/initialize');
        return;
      }
      
      // 已初始化但未登录，跳转到登录页面
      if (!isLoggedIn) {
        router.push('/login');
      }
    }
  }, [isLoggedIn, router]);

  // 初始化应用数据
  useEffect(() => {
    if (isLoggedIn && user && apps.length > 0) {
      const userAppId = apps[0].id; // 默认使用第一个应用
      fetchConversations(user.id, userAppId);
    }
  }, [isLoggedIn, user, apps, fetchConversations]);

  // 监听当前会话变化
  useEffect(() => {
    if (currentConversation) {
      setMessages(currentConversation.messages);
    } else {
      setMessages([]);
    }
  }, [currentConversation]);

  // 切换侧边栏
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 开始新会话
  const startNewChat = () => {
    if (!user || !currentApp) return;
    
    // 清空当前消息
    setMessages([]);
    setStreamedContent('');
    setCurrentConversation(null);
  };

  // 发送消息
  const sendMessage = async (content: string, files?: File[]) => {
    if (!content.trim() && (!files || files.length === 0)) return;
    if (!user || !currentApp) return;
    
    setIsLoading(true);
    setIsStreaming(true);
    
    try {
      // 创建用户消息
      const userMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'user',
        content,
        conversationId: currentConversation?.id || '',
        createdAt: Date.now(),
      };
      
      // 如果有文件，处理文件上传
      if (files && files.length > 0) {
        const uploadedFiles = [];
        for (const file of files) {
          if (file.type.startsWith('image/')) {
            try {
              const uploadResult = await uploadFile(currentApp, file, user.id);
              uploadedFiles.push({
                id: uploadResult.id,
                name: file.name,
                type: file.type,
                url: uploadResult.url
              });
            } catch (error) {
              console.error('文件上传失败:', error);
            }
          }
        }
        
        if (uploadedFiles.length > 0) {
          userMessage.files = uploadedFiles;
        }
      }
      
      // 添加用户消息到前端显示
      setMessages(msgs => [...msgs, userMessage]);
      
      // 创建一个空的助手消息用于流式显示
      const assistantMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: '',
        conversationId: currentConversation?.id || '',
        createdAt: Date.now(),
      };
      
      setMessages(msgs => [...msgs, assistantMessage]);
      setStreamedContent('');
      
      // 准备文件数据
      const fileData = userMessage.files?.map(file => ({
        type: 'image',
        transfer_method: 'remote_url',
        url: file.url
      }));
      
      // 发送请求到后端
      const response = await sendChatMessage(
        currentApp,
        content,
        user.id,
        currentConversation?.id,
        fileData
      );
      
      // 处理流式响应
      if (response.status === 200) {
        let responseText = '';
        let finalConversationId = currentConversation?.id || '';
        let finalMessageId = '';
        
        // 使用handleStream函数处理流式响应
        await handleStream(
          response,
          (streamChunk) => {
            // 处理消息块
            finalConversationId = streamChunk.conversation_id;
            finalMessageId = streamChunk.message_id;
            setCurrentTaskId(streamChunk.task_id);
            
            // 解码内容
            const content = decodeStreamContent(streamChunk.answer || '');
            responseText += content;
            setStreamedContent(responseText);
            
            // 更新助手消息
            assistantMessage.content = responseText;
            assistantMessage.conversationId = finalConversationId;
            assistantMessage.id = finalMessageId;
          },
          (messageEndChunk) => {
            // 处理消息结束
            finalConversationId = messageEndChunk.conversation_id;
            finalMessageId = messageEndChunk.id;
          },
          (error) => {
            // 处理错误
            console.error('流式处理错误:', error);
          }
        );
        
        // 更新最终消息
        setStreamedContent('');
        
        // 更新消息状态
        const finalMessages = [userMessage, { ...assistantMessage, content: responseText }];
        
        // 如果是新会话，创建会话
        if (!currentConversation) {
          const newConversation = {
            id: finalConversationId,
            name: content.substring(0, 30) + (content.length > 30 ? '...' : ''),
            appId: currentApp.id,
            userId: user.id,
            messages: finalMessages,
            createdAt: Date.now(),
            updatedAt: Date.now()
          };
          
          addConversation(newConversation);
        } else {
          // 添加消息到现有会话
          userMessage.conversationId = finalConversationId;
          assistantMessage.conversationId = finalConversationId;
          assistantMessage.content = responseText;
          assistantMessage.id = finalMessageId;
          
          addMessageToConversation(currentConversation.id, userMessage);
          addMessageToConversation(currentConversation.id, assistantMessage);
        }
      }
    } catch (error) {
      console.error('发送消息失败:', error);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setCurrentTaskId(null);
    }
  };

  // 停止响应
  const stopResponse = async () => {
    if (!currentTaskId || !user || !currentApp) return;
    
    try {
      await stopResponseStream(currentApp, currentTaskId, user.id);
      setIsStreaming(false);
      setCurrentTaskId(null);
    } catch (error) {
      console.error('停止响应失败:', error);
    }
  };

  if (!isLoggedIn) {
    return null; // 等待重定向到登录页
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 侧边栏 */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        onStartNewChat={startNewChat}
      />
      
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col h-full bg-[#F7F8F9]">
        {/* 头部 */}
        <AppHeader onToggleSidebar={toggleSidebar} />
        
        {/* 聊天内容区 */}
        <div className="flex-1 overflow-y-auto">
          {messages.length > 0 ? (
            <div>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isStreaming={isStreaming && message.role === 'assistant' && message === messages[messages.length - 1]}
                  showTimestamp
                />
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-2">开始新的对话</h2>
                <p className="text-gray-600 mb-8">
                  {currentApp ? `与 ${currentApp.name}（${currentApp.groupName}）开始对话吧！` : ''}
                </p>
                {!currentApp && apps.length === 0 && (
                  <p className="text-gray-500 text-sm">
                    在开始聊天前，您需要先添加一个Dify应用。
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* 输入框区域 */}
        <div className="p-4 bg-[#F7F8F9]">
          {isStreaming && (
            <div className="flex justify-center mb-4">
              <Button
                onClick={stopResponse}
                variant="outline"
                className="flex items-center gap-2"
              >
                <StopIcon className="w-4 h-4" />
                <span>停止响应</span>
              </Button>
            </div>
          )}
          
          <div className="max-w-4xl mx-auto">
            <ChatInputBox
              onSendMessage={sendMessage}
              disabled={isLoading || !currentApp}
              showFileUpload={currentApp?.visualEnabled}
              placeholder={currentApp ? "输入您的问题..." : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 