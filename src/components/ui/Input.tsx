import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
}

export const Input = ({ ref, className = '', ...props }: InputProps) => {
  const baseStyles =
    'bg-[#1A1D27] border border-[#2D3149] rounded-[6px] px-3 py-2 text-sm text-white placeholder-[#4B5563] outline-none transition-all duration-200 focus:border-[#6366F1] focus:ring-2 focus:ring-inset focus:ring-[#6366F1] w-full';
    
  return (
    <input
      ref={ref}
      className={`${baseStyles} ${className}`.trim()}
      {...props}
    />
  );
};

export default Input;