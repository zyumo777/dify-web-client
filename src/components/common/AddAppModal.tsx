import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useAppStore } from '@/store';
import { fetchAppParameters } from '@/utils/api';
import { DifyApp } from '@/types';

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  appToEdit?: DifyApp;
}

const AddAppModal: React.FC<AddAppModalProps> = ({ isOpen, onClose, appToEdit }) => {
  const { addApp, updateApp } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<{
    id?: string;
    name: string;
    groupName: string;
    apiUrl: string;
    apiKey: string;
  }>({
    name: '',
    groupName: '',
    apiUrl: '',
    apiKey: '',
  });

  // 当appToEdit变化或模态框打开时，更新表单数据
  useEffect(() => {
    if (isOpen) {
      if (appToEdit) {
        setFormData({
          id: appToEdit.id,
          name: appToEdit.name || '',
          groupName: appToEdit.groupName || '',
          apiUrl: appToEdit.apiUrl || '',
          apiKey: appToEdit.apiKey || '',
        });
      } else {
        // 重置表单
        setFormData({
          name: '',
          groupName: '',
          apiUrl: '',
          apiKey: '',
        });
      }
      // 重置错误信息
      setError('');
    }
  }, [appToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 验证表单
    if (!formData.name || !formData.groupName || !formData.apiUrl || !formData.apiKey) {
      setError('请填写所有必填字段');
      return;
    }

    try {
      setIsLoading(true);
      
      // 组装应用数据
      const appData: DifyApp = {
        id: formData.id || Math.random().toString(36).substring(2, 9),
        name: formData.name,
        groupName: formData.groupName,
        apiUrl: formData.apiUrl.endsWith('/') ? formData.apiUrl.slice(0, -1) : formData.apiUrl,
        apiKey: formData.apiKey,
        visualEnabled: false
      };
      
      // 通过调用API检查应用配置是否有效
      const parameters = await fetchAppParameters(appData);
      
      // 检查是否支持视觉功能
      if (parameters.file_upload?.image?.enabled) {
        appData.visualEnabled = true;
      }
      
      // 更新或添加应用
      if (appToEdit) {
        updateApp(appData);
      } else {
        addApp(appData);
      }
      
      // 关闭模态框
      onClose();
    } catch (err) {
      console.error('添加应用失败:', err);
      setError('应用配置无效，请检查API URL和API Key');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={appToEdit ? '编辑应用' : '添加Dify应用'}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
              应用组
            </label>
            <Input
              id="groupName"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              placeholder="例如: DeepSeek"
              required
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              应用名称
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="例如: DeepSeek-R1"
              required
            />
          </div>

          <div>
            <label htmlFor="apiUrl" className="block text-sm font-medium text-gray-700 mb-1">
              后端服务 API
            </label>
            <Input
              id="apiUrl"
              name="apiUrl"
              value={formData.apiUrl}
              onChange={handleChange}
              placeholder="例如: https://dify.heyjiqing.cn/v1"
              required
            />
          </div>

          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <Input
              id="apiKey"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              placeholder="例如: app-xxxxxxx"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              取消
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '保存中...' : '保存'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddAppModal; 