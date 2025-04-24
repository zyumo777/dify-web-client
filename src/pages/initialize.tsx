import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store';
import { LogoIcon } from '@/components/icons';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function Initialize() {
  const router = useRouter();
  const { login } = useUserStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 处理管理员账户设置
  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // 在实际应用中，这里应该调用API保存管理员信息
      // 这里仅做模拟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 保存管理员信息到本地存储
      localStorage.setItem('adminUsername', username);
      localStorage.setItem('adminPassword', password);
      
      // 标记系统已初始化
      localStorage.setItem('isInitialized', 'true');
      
      // 自动登录
      login({
        id: '1',
        username: username
      });
      
      router.push('/');
    } catch (err) {
      setError('设置失败，请重试');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <LogoIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">嗨！近来可好</h1>
        <p className="text-center text-gray-600 mb-8">欢迎使用，请设置您的管理员账号以继续！</p>
        
        <form onSubmit={handleInitialize}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                用户名
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入管理员用户名"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                密码
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                确认密码
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                required
              />
            </div>
            
            {error && (
              <div className="py-2 px-3 bg-red-50 text-red-600 text-sm rounded">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              fullWidth 
              disabled={isLoading}
            >
              {isLoading ? '设置中...' : '设置管理员账户'}
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-4 text-xs text-gray-500">
          V1.0.0 @HeyJiqing
        </div>
      </div>
    </div>
  );
} 