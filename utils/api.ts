import axios from 'axios';
import { DifyApp, DifyParameters, Conversation } from '@/types';

// 创建一个API实例
const createApiInstance = (app: DifyApp) => {
  const api = axios.create({
    baseURL: app.apiUrl,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${app.apiKey}`
    }
  });
  
  return api;
};

// 获取应用参数
export const fetchAppParameters = async (app: DifyApp): Promise<DifyParameters> => {
  try {
    const api = createApiInstance(app);
    const response = await api.get('/parameters');
    return response.data;
  } catch (error) {
    console.error('获取应用参数失败:', error);
    throw error;
  }
};

// 发送聊天消息
export const sendChatMessage = async (
  app: DifyApp, 
  query: string, 
  userId: string,
  conversationId?: string, 
  files?: { type: string; transfer_method: string; url?: string; upload_file_id?: string }[]
) => {
  try {
    const payload = {
      inputs: {},
      query,
      response_mode: 'streaming',
      conversation_id: conversationId || '',
      user: userId,
      files: files || []
    };

    // 使用fetch处理流式响应
    const response = await fetch(`${app.apiUrl}/chat-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${app.apiKey}`
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error('发送聊天消息失败:', error);
    throw error;
  }
};

// 停止响应
export const stopResponseStream = async (app: DifyApp, taskId: string, userId: string) => {
  try {
    const api = createApiInstance(app);
    await api.post(`/chat-messages/${taskId}/stop`, { user: userId });
  } catch (error) {
    console.error('停止响应失败:', error);
    throw error;
  }
};

// 上传文件
export const uploadFile = async (app: DifyApp, file: File, userId: string) => {
  try {
    const api = createApiInstance(app);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user', userId);
    
    const response = await api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('上传文件失败:', error);
    throw error;
  }
};

// 获取会话列表
export const fetchConversations = async (app: DifyApp, userId: string) => {
  try {
    const api = createApiInstance(app);
    const response = await api.get(`/conversations?user=${userId}`);
    return response.data;
  } catch (error) {
    console.error('获取会话列表失败:', error);
    throw error;
  }
};

// 获取会话消息历史
export const fetchConversationMessages = async (app: DifyApp, conversationId: string, userId: string) => {
  try {
    const api = createApiInstance(app);
    const response = await api.get(`/messages?conversation_id=${conversationId}&user=${userId}`);
    return response.data;
  } catch (error) {
    console.error('获取会话消息失败:', error);
    throw error;
  }
};

// 删除会话
export const deleteConversation = async (app: DifyApp, conversationId: string, userId: string) => {
  try {
    const api = createApiInstance(app);
    await api.delete(`/conversations/${conversationId}`, {
      data: { user: userId }
    });
  } catch (error) {
    console.error('删除会话失败:', error);
    throw error;
  }
};

// 重命名会话
export const renameConversation = async (app: DifyApp, conversationId: string, name: string, userId: string) => {
  try {
    const api = createApiInstance(app);
    const response = await api.post(`/conversations/${conversationId}/name`, {
      name,
      auto_generate: false,
      user: userId
    });
    return response.data;
  } catch (error) {
    console.error('重命名会话失败:', error);
    throw error;
  }
};

// 自动生成会话名称
export const autoGenerateConversationName = async (app: DifyApp, conversationId: string, userId: string) => {
  try {
    const api = createApiInstance(app);
    const response = await api.post(`/conversations/${conversationId}/name`, {
      auto_generate: true,
      user: userId
    });
    return response.data;
  } catch (error) {
    console.error('自动生成会话名称失败:', error);
    throw error;
  }
}; 