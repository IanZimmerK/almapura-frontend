// src/components/ui/Button.tsx
import React from 'react';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({
  type = 'button',
  className = '',
  disabled = false,
  children,
  onClick
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md transition-colors ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;