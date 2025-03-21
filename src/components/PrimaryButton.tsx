
import React from 'react';
import { cn } from '../lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const PrimaryButton = ({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className, 
  ...props 
}: PrimaryButtonProps) => {
  const baseStyles = "rounded-md font-medium transition-all duration-300 focus:outline-none";
  
  const variantStyles = {
    primary: "bg-chatsector-orange text-white hover:bg-chatsector-orange/90 shadow-sm hover:shadow-md focus:ring-2 focus:ring-chatsector-orange focus:ring-opacity-50",
    secondary: "bg-white text-chatsector-black border border-chatsector-black/10 hover:bg-chatsector-light-gray focus:ring-2 focus:ring-chatsector-black focus:ring-opacity-10",
  };
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
