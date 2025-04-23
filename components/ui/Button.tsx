import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
  fullWidth = false,
  size = 'md',
  icon,
}) => {
  const baseStyle = 'flex items-center justify-center rounded font-medium transition-colors';
  
  const sizeStyle = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  const variantStyle = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-gray-800 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${sizeStyle[size]} ${variantStyle[variant]} ${widthStyle} ${disabledStyle} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button; 