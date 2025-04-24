import { create } from 'zustand';
import { Conversation, Message } from '@/types';
import { conversationStorage } from '@/lib/storage';

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
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  isLoading: false,
  fetchConversations: (userId: string, appId: string) => {
    if (typeof window !== 'undefined') {
      const conversations = conversationStorage.getUserAppConversations(userId, appId);
      // 按更新时间降序排序
      const sortedConversations = [...conversations].sort((a, b) => b.updatedAt - a.updatedAt);
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
  }
})); 