import React from 'react';
import { useUserStore, useAppStore, useConversationStore } from '@/store';
import { ChatIcon, EditIcon, DeleteIcon, UserIcon, SettingsIcon, InfoIcon, GithubIcon } from '@/components/icons';
import Button from '@/components/ui/Button';
import UserMenu from '@/components/layout/UserMenu';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onStartNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse, onStartNewChat }) => {
  const { user } = useUserStore();
  const { currentApp } = useAppStore();
  const { 
    conversations, 
    currentConversation, 
    setCurrentConversation,
    updateConversationName,
    removeConversation
  } = useConversationStore();

  const [isEditing, setIsEditing] = React.useState<string | null>(null);
  const [editName, setEditName] = React.useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const menuPositionRef = React.useRef<HTMLDivElement>(null);

  // 选择会话
  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  };

  // 开始编辑会话名称
  const handleStartEditing = (conversationId: string, name: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsEditing(conversationId);
    setEditName(name);
  };

  // 保存编辑的会话名称
  const handleSaveEdit = (conversationId: string) => {
    if (editName.trim()) {
      updateConversationName(conversationId, editName.trim());
    }
    setIsEditing(null);
  };

  // 处理编辑名称的按键事件
  const handleEditKeyDown = (e: React.KeyboardEvent, conversationId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit(conversationId);
    } else if (e.key === 'Escape') {
      setIsEditing(null);
    }
  };

  // 删除会话
  const handleDeleteConversation = (conversationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeConversation(conversationId);
  };

  // 用户菜单按钮点击
  const handleUserMenuClick = () => {
    setIsUserMenuOpen(true);
  };

  // 统一的用户图标组件
  const UserAvatar = () => (
    <div className="w-8 h-8 min-w-[2rem] min-h-[2rem] bg-gray-300 rounded-full flex items-center justify-center">
      <UserIcon className="w-5 h-5 text-gray-600" />
    </div>
  );

  // 如果侧边栏折叠，只显示一个最小化版本
  if (isCollapsed) {
    return (
      <div className="w-16 h-full bg-gray-100 border-r border-gray-200 flex flex-col relative">
        <div className="p-3">
          <Button 
            onClick={onStartNewChat} 
            className="w-full h-[38px] px-0 flex items-center justify-center"
            variant="primary"
          >
            <ChatIcon className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <button
              onClick={onToggleCollapse}
              className="w-full p-2 flex items-center justify-center text-gray-600 hover:bg-gray-200 rounded"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center justify-between" ref={menuPositionRef}>
            <button
              onClick={handleUserMenuClick}
              className="flex items-center justify-center hover:bg-gray-200 rounded-md p-1"
            >
              <UserAvatar />
            </button>
            <div className="w-8 h-8"></div> {/* 占位元素，与展开状态保持对称 */}
          </div>
          
          {isUserMenuOpen && (
            <UserMenu 
              isOpen={isUserMenuOpen} 
              onClose={() => setIsUserMenuOpen(false)} 
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-full bg-gray-100 border-r border-gray-200 flex flex-col relative">
      <div className="p-3">
        <Button 
          onClick={onStartNewChat} 
          className="w-full h-[38px]"
          variant="primary"
        >
          <div className="flex items-center gap-2">
            <ChatIcon className="w-5 h-5" />
            <span>开始新对话</span>
          </div>
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-2">
          {/* 会话列表 */}
          {conversations.length > 0 ? (
            <div className="space-y-1">
              {conversations.map(conversation => (
                <div 
                  key={conversation.id}
                  className={`rounded-md p-2 cursor-pointer ${
                    currentConversation?.id === conversation.id 
                      ? 'bg-gray-200' 
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <div className="flex items-center justify-between">
                    {isEditing === conversation.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onBlur={() => handleSaveEdit(conversation.id)}
                        onKeyDown={(e) => handleEditKeyDown(e, conversation.id)}
                        className="flex-1 mr-2 px-1 py-0.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                        autoFocus
                      />
                    ) : (
                      <div className="flex-1 text-sm font-medium truncate">
                        {conversation.name}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-1">
                      {!isEditing && (
                        <>
                          <button
                            onClick={(e) => handleStartEditing(conversation.id, conversation.name, e)}
                            className="p-1 text-gray-500 hover:text-gray-700 rounded-full"
                          >
                            <EditIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => handleDeleteConversation(conversation.id, e)}
                            className="p-1 text-gray-500 hover:text-gray-700 rounded-full"
                          >
                            <DeleteIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              没有会话历史
            </div>
          )}
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center justify-between" ref={menuPositionRef}>
          <button 
            className="flex items-center justify-center hover:bg-gray-200 rounded-md p-1"
            onClick={handleUserMenuClick}
          >
            <UserAvatar />
          </button>
          
          <button
            onClick={onToggleCollapse}
            className="p-1 text-gray-500 hover:text-gray-700 rounded-full"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      
      {isUserMenuOpen && (
        <UserMenu 
          isOpen={isUserMenuOpen} 
          onClose={() => setIsUserMenuOpen(false)} 
        />
      )}
    </div>
  );
};

export default Sidebar;