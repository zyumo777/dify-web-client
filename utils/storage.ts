import { DifyApp, User, Conversation } from '@/types';

// 保存对象到localStorage
const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`保存数据到localStorage失败:`, error);
  }
};

// 从localStorage获取对象
const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`从localStorage获取数据失败:`, error);
    return null;
  }
};

// 从localStorage删除对象
const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`从localStorage删除数据失败:`, error);
  }
};

// 用户相关存储
export const userStorage = {
  // 保存用户信息
  saveUser: (user: User): void => {
    saveToLocalStorage('dify_user', user);
  },

  // 获取用户信息
  getUser: (): User | null => {
    return getFromLocalStorage<User>('dify_user');
  },

  // 删除用户信息
  removeUser: (): void => {
    removeFromLocalStorage('dify_user');
  }
};

// Dify应用相关存储
export const appStorage = {
  // 保存应用列表
  saveApps: (apps: DifyApp[]): void => {
    saveToLocalStorage('dify_apps', apps);
  },

  // 获取应用列表
  getApps: (): DifyApp[] => {
    return getFromLocalStorage<DifyApp[]>('dify_apps') || [];
  },

  // 获取特定用户的应用列表
  getUserApps: (userId: string): DifyApp[] => {
    const apps = getFromLocalStorage<DifyApp[]>('dify_apps') || [];
    return apps;
  },

  // 添加应用
  addApp: (app: DifyApp): void => {
    const apps = appStorage.getApps();
    // 生成唯一ID
    if (!app.id) {
      app.id = Math.random().toString(36).substring(2, 9);
    }
    apps.push(app);
    saveToLocalStorage('dify_apps', apps);
  },

  // 更新应用
  updateApp: (app: DifyApp): void => {
    const apps = appStorage.getApps();
    const index = apps.findIndex(a => a.id === app.id);
    if (index !== -1) {
      apps[index] = app;
      saveToLocalStorage('dify_apps', apps);
    }
  },

  // 删除应用
  removeApp: (appId: string): void => {
    const apps = appStorage.getApps();
    const newApps = apps.filter(app => app.id !== appId);
    saveToLocalStorage('dify_apps', newApps);
    
    // 如果删除的是当前选中的应用，也清除当前应用记录
    const currentAppId = getFromLocalStorage<string>('dify_current_app_id');
    if (currentAppId === appId) {
      removeFromLocalStorage('dify_current_app_id');
    }
  },
  
  // 保存当前选中的应用ID
  saveCurrentAppId: (appId: string): void => {
    saveToLocalStorage('dify_current_app_id', appId);
  },
  
  // 获取当前选中的应用ID
  getCurrentAppId: (): string | null => {
    return getFromLocalStorage<string>('dify_current_app_id');
  },
  
  // 获取当前选中的应用
  getCurrentApp: (): DifyApp | null => {
    const currentAppId = appStorage.getCurrentAppId();
    if (!currentAppId) return null;
    
    const apps = appStorage.getApps();
    return apps.find(app => app.id === currentAppId) || null;
  }
};

// 会话相关存储
export const conversationStorage = {
  // 保存会话列表
  saveConversations: (conversations: Conversation[]): void => {
    saveToLocalStorage('dify_conversations', conversations);
  },

  // 获取会话列表
  getConversations: (): Conversation[] => {
    return getFromLocalStorage<Conversation[]>('dify_conversations') || [];
  },

  // 获取特定用户和应用的会话列表
  getUserAppConversations: (userId: string, appId: string): Conversation[] => {
    const conversations = getFromLocalStorage<Conversation[]>('dify_conversations') || [];
    return conversations.filter(c => c.userId === userId && c.appId === appId);
  },

  // 添加会话
  addConversation: (conversation: Conversation): void => {
    const conversations = conversationStorage.getConversations();
    conversations.push(conversation);
    saveToLocalStorage('dify_conversations', conversations);
  },

  // 更新会话
  updateConversation: (conversation: Conversation): void => {
    const conversations = conversationStorage.getConversations();
    const index = conversations.findIndex(c => c.id === conversation.id);
    if (index !== -1) {
      conversations[index] = conversation;
      saveToLocalStorage('dify_conversations', conversations);
    }
  },

  // 删除会话
  removeConversation: (conversationId: string): void => {
    const conversations = conversationStorage.getConversations();
    const newConversations = conversations.filter(c => c.id !== conversationId);
    saveToLocalStorage('dify_conversations', newConversations);
  },

  // 获取特定会话
  getConversation: (conversationId: string): Conversation | null => {
    const conversations = conversationStorage.getConversations();
    return conversations.find(c => c.id === conversationId) || null;
  }
};