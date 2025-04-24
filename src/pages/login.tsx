import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store';
import { LogoIcon } from '@/components/icons';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function Login() {
  const router = useRouter();
  const { isLoggedIn, login } = useUserStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 检查系统是否已初始化
  useEffect(() => {
    // 使用typeof window !== 'undefined'确保代码只在客户端执行
    if (typeof window !== 'undefined') {
      const isInitialized = localStorage.getItem('isInitialized');
      
      if (!isInitialized) {
        // 系统未初始化，跳转到初始化页面
        router.push('/initialize');
      }
    }
  }, [router]);

  // 如果已登录，跳转到首页
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  // 处理登录
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // 获取本地存储的管理员信息
      const adminUsername = localStorage.getItem('adminUsername');
      const adminPassword = localStorage.getItem('adminPassword');
      
      if (username === adminUsername && password === adminPassword) {
        login({
          id: '1',
          username: username
        });
        
        router.push('/');
      } else {
        setError('用户名或密码错误');
      }
    } catch (err) {
      setError('登录失败，请重试');
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
        <p className="text-center text-gray-600 mb-8">欢迎使用，请登录您的账号以继续！</p>
        
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                用户名
              </label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="请输入用户名"
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
              {isLoading ? '登录中...' : '登录'}
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