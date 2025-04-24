import React from 'react';
import { useUserStore, useAppStore, useConversationStore } from '@/store';
import { 
  ChatIcon, 
  EditIcon, 
  DeleteIcon, 
  UserIcon
} from '@/components/icons';
import Button from '@/components/ui/Button';
import UserMenu from '@/components/layout/UserMenu';
import AppHeader from '@/components/layout/AppHeader';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onStartNewChat: () => void;
}

// 通用的操作按钮组件
const ActionButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
}> = ({ onClick, icon, label }) => (
  <Button 
    onClick={onClick} 
    className="w-full h-[38px] px-0 flex items-center justify-center"
    variant="primary"
  >
    {label ? (
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
    ) : (
      <div className="flex items-center justify-center">
        {icon}
      </div>
    )}
  </Button>
);

const Sidebar: React.FC<SidebarProps> = ({ onStartNewChat }) => {
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

  return (
    <div className="w-64 h-full flex flex-col relative">
      {/* AppHeader */}
      <div className="w-full ml-[18px]">
        <AppHeader />
      </div>

      {/* 开始新对话按钮 */}
      <div className="p-3">
        <Button 
          onClick={onStartNewChat}
          className="w-full h-[38px] px-0 flex items-center justify-center bg-white hover:bg-white/90 border-0"
          variant="outline"
        >
          <div className="flex items-center gap-2">
            <ChatIcon className="w-5 h-5 text-primary" />
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
      
      <div className="p-3">
        <div className="flex items-center justify-left" ref={menuPositionRef}>
          <button 
            className="flex items-center justify-center hover:bg-gray-200 rounded-md p-1"
            onClick={handleUserMenuClick}
          >
            <UserAvatar />
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