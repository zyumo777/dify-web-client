import { Conversation } from '@/types';
import { saveToLocalStorage, getFromLocalStorage } from './utils';

/**
 * 会话相关存储
 */
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