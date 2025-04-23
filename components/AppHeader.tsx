import React, { useState } from 'react';
import { ChevronDownIcon, AddIcon } from './icons';
import { useAppStore } from '@/utils/store';
import AddAppModal from './AddAppModal';

interface AppHeaderProps {
  onToggleSidebar: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar }) => {
  const { currentApp, apps, setCurrentApp } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddAppModalOpen, setIsAddAppModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAppSelect = (appId: string) => {
    const selectedApp = apps.find(app => app.id === appId);
    if (selectedApp) {
      setCurrentApp(selectedApp);
    }
    setIsDropdownOpen(false);
  };

  const handleAddApp = () => {
    setIsAddAppModalOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <button 
          onClick={onToggleSidebar}
          className="mr-4 p-2 rounded-md hover:bg-gray-100"
          aria-label="切换侧边栏"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        
        {apps.length === 0 ? (
          <button 
            onClick={handleAddApp}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded hover:bg-primary/90"
          >
            <AddIcon className="w-4 h-4" />
            <span>添加应用</span>
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-100"
            >
              <span>{currentApp?.name || '选择应用'}</span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                  {apps.map(app => (
                    <li key={app.id}>
                      <button
                        onClick={() => handleAppSelect(app.id)}
                        className={`flex items-center w-full px-4 py-2 text-sm text-left ${currentApp?.id === app.id ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                      >
                        {app.name}
                      </button>
                    </li>
                  ))}
                  <li className="border-t border-gray-200 mt-1">
                    <button
                      onClick={handleAddApp}
                      className="flex items-center w-full px-4 py-2 text-sm text-left text-primary hover:bg-gray-50"
                    >
                      <AddIcon className="w-4 h-4 mr-2" />
                      添加应用
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      <AddAppModal 
        isOpen={isAddAppModalOpen} 
        onClose={() => setIsAddAppModalOpen(false)} 
      />
    </header>
  );
};

export default AppHeader; 