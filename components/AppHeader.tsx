import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, AddIcon, EditIcon, DeleteIcon, CheckIcon } from './icons';
import { useAppStore } from '@/utils/store';
import AddAppModal from './AddAppModal';
import { DifyApp } from '@/types';

interface AppHeaderProps {
  onToggleSidebar: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar }) => {
  const { currentApp, apps, setCurrentApp, removeApp, fetchApps } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddAppModalOpen, setIsAddAppModalOpen] = useState(false);
  const [appToEdit, setAppToEdit] = useState<DifyApp | undefined>(undefined);

  // 初始化时加载应用数据
  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  // 对应用按组进行分组
  const groupedApps = apps.reduce<Record<string, DifyApp[]>>((groups, app) => {
    const groupName = app.groupName || '未分组';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(app);
    return groups;
  }, {});

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
    setAppToEdit(undefined);
    setIsAddAppModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleEditApp = (app: DifyApp, e: React.MouseEvent) => {
    e.stopPropagation();
    setAppToEdit(app);
    setIsAddAppModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleDeleteApp = (appId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('确定要删除此应用吗？')) {
      removeApp(appId);
    }
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
              <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                <ul className="py-1">
                  {Object.entries(groupedApps).map(([groupName, groupApps]) => (
                    <li key={groupName} className="mb-1">
                      <div className="px-4 py-1 text-xs font-semibold text-gray-500 bg-gray-50">
                        {groupName}
                      </div>
                      <ul>
                        {groupApps.map(app => (
                          <li key={app.id} className="relative group">
                            <button
                              onClick={() => handleAppSelect(app.id)}
                              className={`flex items-center w-full px-4 py-2 text-sm text-left ${currentApp?.id === app.id ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
                            >
                              {currentApp?.id === app.id && (
                                <CheckIcon className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                              )}
                              <span className={currentApp?.id === app.id ? 'ml-0' : 'ml-6'}>
                                {app.name}
                              </span>
                            </button>
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 hidden group-hover:flex items-center space-x-1">
                              <button
                                onClick={(e) => handleEditApp(app, e)}
                                className="p-1 text-gray-500 hover:text-gray-700 rounded"
                              >
                                <EditIcon className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteApp(app.id, e)}
                                className="p-1 text-gray-500 hover:text-red-500 rounded"
                              >
                                <DeleteIcon className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
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
        appToEdit={appToEdit}
      />
    </header>
  );
};

export default AppHeader;