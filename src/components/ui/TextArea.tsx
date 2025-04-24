import React, { useRef, useEffect } from 'react';

interface TextAreaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  onPaste,
  disabled = false,
  className = '',
  required = false,
  id,
  name,
  rows = 3,
  minRows = 3,
  maxRows = 8,
  autoResize = false,
  error,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoResize && textareaRef.current) {
      // 重置高度以获取正确的scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // 计算新高度
      const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight);
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows * lineHeight;
      
      let newHeight = textareaRef.current.scrollHeight;
      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
      
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value, autoResize, minRows, maxRows]);

  const baseStyle = 'w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none';
  const disabledStyle = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';
  const errorStyle = error ? 'border-red-500' : 'border-gray-300';
  
  return (
    <div className="w-full">
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`${baseStyle} ${disabledStyle} ${errorStyle} ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea; 