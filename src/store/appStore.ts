import { create } from 'zustand';
import { DifyApp } from '@/types';
import { appStorage } from '@/lib/storage';

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
      
      // 优先使用localStorage中保存的应用ID
      const savedAppId = appStorage.getCurrentAppId();
      let currentApp = null;
      
      if (apps.length > 0) {
        if (savedAppId) {
          // 查找保存的应用ID对应的应用
          currentApp = apps.find(app => app.id === savedAppId);
        }
        
        // 如果没有找到保存的应用或没有保存的应用ID，使用第一个应用
        if (!currentApp) {
          currentApp = apps[0];
          // 保存为当前应用
          if (currentApp) {
            appStorage.saveCurrentAppId(currentApp.id);
          }
        }
      }
      
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
    if (typeof window !== 'undefined') {
      if (app) {
        appStorage.saveCurrentAppId(app.id);
      } else {
        // 如果设置为null，清除当前应用ID
        appStorage.saveCurrentAppId('');
      }
    }
    set({ currentApp: app });
  },
})); 