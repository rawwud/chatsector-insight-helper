
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <img 
      src="/lovable-uploads/8715b6ae-6e34-45bb-ac9e-736be14b3981.png" 
      alt="Chatsector Logo" 
      className={className}
    />
  );
};

export default Logo;
