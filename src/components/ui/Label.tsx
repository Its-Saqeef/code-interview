import React from 'react';
import clsx from 'clsx';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  ref?: React.Ref<HTMLLabelElement>;
}

export const Label = ({ className, ref, ...props }: LabelProps) => {
  return (
    <label
      ref={ref}
      className={clsx(
        "font-mono text-[12px] font-medium leading-4 tracking-[0.05em] text-[#908fa0] uppercase select-none",
        className
      )}
      {...props}
    />
  );
};

export default Label;
