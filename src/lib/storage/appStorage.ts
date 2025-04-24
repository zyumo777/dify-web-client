import { DifyApp } from '@/types';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './utils';

/**
 * Dify应用相关存储
 */
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