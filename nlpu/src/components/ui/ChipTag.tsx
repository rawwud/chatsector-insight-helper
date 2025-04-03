
import React from 'react';
import { cn } from '@/lib/utils';

interface ChipTagProps {
  children: React.ReactNode;
  variant?: 'default' | 'orange' | 'muted' | 'outline';
  className?: string;
}

const ChipTag = ({ children, variant = 'default', className }: ChipTagProps) => {
  return (
    <div
      className={cn(
        'chip transition-all duration-300',
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'bg-orange-50 text-orange-600 border border-orange-200': variant === 'orange',
          'bg-gray-50 text-gray-500 border border-gray-100': variant === 'muted',
          'bg-transparent border border-gray-200 text-gray-700': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default ChipTag;
