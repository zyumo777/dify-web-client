/**
 * localStorage 存储工具函数
 */

// 检查是否在浏览器环境中
const isBrowser = typeof window !== 'undefined';

// 保存对象到localStorage
export const saveToLocalStorage = <T>(key: string, data: T): void => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`保存数据到localStorage失败:`, error);
  }
};

// 从localStorage获取对象
export const getFromLocalStorage = <T>(key: string): T | null => {
  if (!isBrowser) return null;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`从localStorage获取数据失败:`, error);
    return null;
  }
};

// 从localStorage删除对象
export const removeFromLocalStorage = (key: string): void => {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`从localStorage删除数据失败:`, error);
  }
}; 