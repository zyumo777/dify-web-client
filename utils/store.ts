import { create } from 'zustand';
import { DifyApp, User, Conversation, Message } from '@/types';
import { userStorage, appStorage, conversationStorage } from '@/utils/storage';

// 用户状态
interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: typeof window !== 'undefined' ? userStorage.getUser() : null,
  isLoggedIn: typeof window !== 'undefined' ? !!userStorage.getUser() : false,
  login: (user: User) => {
    userStorage.saveUser(user);
    set({ user, isLoggedIn: true });
  },
  logout: () => {
    userStorage.removeUser();
    set({ user: null, isLoggedIn: false });
  }
}));

// Dify应用状态
interface AppState {
  apps: DifyApp[];
  currentApp: DifyApp | null;
  isLoading: boolean;
  fetchApps: () => void;
  addApp: (app: DifyApp) => void;
  updateApp: (app: DifyApp) => void;
  removeApp: (appId: string) => void;
  setCurrentApp: (app: DifyApp | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  apps: typeof window !== 'undefined' ? appStorage.getApps() : [],
  currentApp: typeof window !== 'undefined' ? appStorage.getCurrentApp() : null,
  isLoading: false,
  fetchApps: () => {
    if (typeof window !== 'undefined') {
      const apps = appStorage.getApps();
      const currentApp = appStorage.getCurrentApp();
      set({ apps, currentApp });
    }
  },
  addApp: (app: DifyApp) => {
    appStorage.addApp(app);
    set((state) => ({ 
      apps: [...state.apps, app],
      // 如果是第一个应用，自动设为当前应用
      currentApp: state.apps.length === 0 ? app : state.currentApp
    }));
    
    // 如果是第一个应用，保存当前应用ID
    if (typeof window !== 'undefined' && get().apps.length === 1) {
      appStorage.saveCurrentAppId(app.id);
    }
  },
  updateApp: (app: DifyApp) => {
    appStorage.updateApp(app);
    set((state) => ({
      apps: state.apps.map((a) => (a.id === app.id ? app : a)),
      currentApp: state.currentApp?.id === app.id ? app : state.currentApp,
    }));
  },
  removeApp: (appId: string) => {
    appStorage.removeApp(appId);
    set((state) => {
      const filteredApps = state.apps.filter((app) => app.id !== appId);
      
      // 如果删除的是当前应用，选择第一个应用作为当前应用或设为null
      let newCurrentApp = state.currentApp;
      if (state.currentApp?.id === appId) {
        newCurrentApp = filteredApps.length > 0 ? filteredApps[0] : null;
        
        // 更新存储中的当前应用ID
        if (typeof window !== 'undefined') {
          if (newCurrentApp) {
            appStorage.saveCurrentAppId(newCurrentApp.id);
          } else {
            appStorage.saveCurrentAppId('');
          }
        }
      }
      
      return {
        apps: filteredApps,
        currentApp: newCurrentApp,
      };
    });
  },
  setCurrentApp: (app: DifyApp | null) => {
    if (typeof window !== 'undefined' && app) {
      appStorage.saveCurrentAppId(app.id);
    }
    set({ currentApp: app });
  },
}));

// 会话状态
interface ConversationState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isLoading: boolean;
  fetchConversations: (userId: string, appId: string) => void;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (conversation: Conversation) => void;
  removeConversation: (conversationId: string) => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
  addMessageToConversation: (conversationId: string, message: Message) => void;
  updateConversationName: (conversationId: string, name: string) => void;
  togglePinConversation: (conversationId: string) => void;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  isLoading: false,
  fetchConversations: (userId: string, appId: string) => {
    if (typeof window !== 'undefined') {
      const conversations = conversationStorage.getUserAppConversations(userId, appId);
      // 排序：先固定在前，再按更新时间降序
      const sortedConversations = [...conversations].sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return b.updatedAt - a.updatedAt;
      });
      set({ conversations: sortedConversations });
    }
  },
  addConversation: (conversation: Conversation) => {
    conversationStorage.addConversation(conversation);
    set((state) => ({ 
      conversations: [conversation, ...state.conversations],
      currentConversation: conversation
    }));
  },
  updateConversation: (conversation: Conversation) => {
    conversationStorage.updateConversation(conversation);
    set((state) => ({
      conversations: state.conversations.map((c) => 
        c.id === conversation.id ? conversation : c
      ),
      currentConversation: state.currentConversation?.id === conversation.id 
        ? conversation 
        : state.currentConversation,
    }));
  },
  removeConversation: (conversationId: string) => {
    conversationStorage.removeConversation(conversationId);
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== conversationId),
      currentConversation: state.currentConversation?.id === conversationId 
        ? null 
        : state.currentConversation,
    }));
  },
  setCurrentConversation: (conversation: Conversation | null) => {
    set({ currentConversation: conversation });
  },
  addMessageToConversation: (conversationId: string, message: Message) => {
    const conversation = conversationStorage.getConversation(conversationId);
    if (conversation) {
      conversation.messages.push(message);
      conversation.updatedAt = Date.now();
      conversationStorage.updateConversation(conversation);
      
      set((state) => ({
        conversations: state.conversations.map((c) => 
          c.id === conversationId ? conversation : c
        ),
        currentConversation: state.currentConversation?.id === conversationId 
          ? conversation 
          : state.currentConversation,
      }));
    }
  },
  updateConversationName: (conversationId: string, name: string) => {
    const conversation = conversationStorage.getConversation(conversationId);
    if (conversation) {
      conversation.name = name;
      conversationStorage.updateConversation(conversation);
      
      set((state) => ({
        conversations: state.conversations.map((c) => 
          c.id === conversationId ? conversation : c
        ),
        currentConversation: state.currentConversation?.id === conversationId 
          ? conversation 
          : state.currentConversation,
      }));
    }
  },
  togglePinConversation: (conversationId: string) => {
    const conversation = conversationStorage.getConversation(conversationId);
    if (conversation) {
      conversation.pinned = !conversation.pinned;
      conversationStorage.updateConversation(conversation);
      
      const conversations = [...get().conversations];
      const sortedConversations = conversations.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return b.updatedAt - a.updatedAt;
      });
      
      set({
        conversations: sortedConversations,
        currentConversation: get().currentConversation?.id === conversationId 
          ? conversation 
          : get().currentConversation,
      });
    }
  },
}));