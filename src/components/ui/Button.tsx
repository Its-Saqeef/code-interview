import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  ref?: React.Ref<HTMLButtonElement>;
}

export const Button = ({ className = '', variant = 'primary', size = 'md', children, ref, ...props }: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 focus:ring-offset-[#0F1117] rounded-[6px]';
  
  const variants = {
    primary: 'bg-[#6366F1] text-white hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]',
    secondary: 'bg-transparent border border-[#2D3149] text-white hover:bg-[#2D3149]/50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      ref={ref}
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;