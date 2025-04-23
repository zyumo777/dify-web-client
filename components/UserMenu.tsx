import React, { useRef, useEffect } from 'react';
import { useUserStore } from '@/utils/store';
import { SettingsIcon, InfoIcon, GithubIcon } from './icons';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ isOpen, onClose }) => {
  const { logout } = useUserStore();
  const menuRef = useRef<HTMLDivElement>(null);

  // 处理点击外部关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // 处理设置点击
  const handleSettingsClick = () => {
    // TODO: 实现设置功能
    alert('设置功能正在开发中');
    onClose();
  };

  // 处理关于点击
  const handleAboutClick = () => {
    alert('Dify Web Client v1.0.0\n开发者: Jiqing');
    onClose();
  };

  // 处理源码点击
  const handleSourceClick = () => {
    window.open('https://github.com/heyjiqing/dify-web-client', '_blank');
    onClose();
  };

  // 处理登出点击
  const handleLogoutClick = () => {
    logout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute bottom-16 left-4 w-48 bg-white rounded-md shadow-lg z-20 py-1"
    >
      <button
        onClick={handleSettingsClick}
        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
      >
        <SettingsIcon className="w-4 h-4 mr-3" />
        <span>设置</span>
      </button>
      
      <button
        onClick={handleAboutClick}
        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
      >
        <InfoIcon className="w-4 h-4 mr-3" />
        <span>关于</span>
      </button>
      
      <button
        onClick={handleSourceClick}
        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
      >
        <GithubIcon className="w-4 h-4 mr-3" />
        <span>源码</span>
      </button>
      
      <div className="border-t border-gray-200 my-1"></div>
      
      <button
        onClick={handleLogoutClick}
        className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
          <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>登出</span>
      </button>
    </div>
  );
};

export default UserMenu; 