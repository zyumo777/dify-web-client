import { create } from 'zustand';
import { User } from '@/types';
import { userStorage } from '@/lib/storage';

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