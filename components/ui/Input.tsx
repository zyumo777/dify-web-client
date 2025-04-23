import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
  icon?: React.ReactNode;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onKeyDown,
  disabled = false,
  className = '',
  required = false,
  id,
  name,
  icon,
  error,
}) => {
  const baseStyle = 'w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all';
  const disabledStyle = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';
  const errorStyle = error ? 'border-red-500' : 'border-gray-300';
  
  return (
    <div className="w-full">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${baseStyle} ${disabledStyle} ${errorStyle} ${icon ? 'pl-10' : ''} ${className}`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input; 