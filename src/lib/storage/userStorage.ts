import { User } from '@/types';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './utils';

/**
 * 用户相关存储
 */
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