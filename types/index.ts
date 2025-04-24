// 用户类型
export interface User {
  id: string;
  username: string;
}

// Dify应用类型
export interface DifyApp {
  id: string;
  name: string;
  groupName: string;
  apiUrl: string;
  apiKey: string;
  visualEnabled?: boolean;
}

// 聊天消息类型
export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  files?: File[];
  createdAt: number;
}

// 文件类型
export interface File {
  id: string;
  name: string;
  type: string;
  url: string;
}

// 会话类型
export interface Conversation {
  id: string;
  name: string;
  appId: string;
  userId: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

// API响应类型
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// 流式聊天响应类型
export interface StreamChunk {
  event: string;
  conversation_id: string;
  message_id: string;
  task_id: string;
  id: string;
  answer: string;
  created_at: number;
  from_variable_selector?: any;
}

// 消息结束事件类型
export interface MessageEndChunk {
  event: 'message_end';
  conversation_id: string;
  message_id: string;
  task_id: string;
  id: string;
  metadata: {
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
      total_price: string;
      currency: string;
      latency: number;
    };
  };
  files: null | File[];
}

// 应用参数类型
export interface DifyParameters {
  file_upload?: {
    image?: {
      enabled: boolean;
      number_limits: number;
      transfer_methods: string[];
    }
  };
  user_input_form?: any[];
  introduction?: string;
  system_parameters?: {
    file_size_limit: number;
    image_file_size_limit: number;
    audio_file_size_limit: number;
    video_file_size_limit: number;
  };
} 