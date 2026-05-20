import React from 'react';
import clsx from 'clsx';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>;
}

export const Textarea = ({ className, ref, ...props }: TextareaProps) => {
  return (
    <textarea
      ref={ref}
      className={clsx(
        "flex min-h-[80px] w-full rounded-[6px] border border-[#2D3149] bg-[#1A1D27] px-3 py-2 text-sm text-white placeholder-[#4B5563] outline-none transition-all duration-200 focus:border-[#6366F1] focus:ring-2 focus:ring-inset focus:ring-[#6366F1] disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className
      )}
      {...props}
    />
  );
};

export default Textarea;
