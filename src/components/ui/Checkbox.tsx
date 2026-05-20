import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import clsx from 'clsx';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  ref?: React.Ref<HTMLButtonElement>;
}

export const Checkbox = ({ className, ref, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={clsx(
      "peer h-4 w-4 shrink-0 rounded-[4px] border border-[#2D3149] bg-[#1A1D27] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 focus:ring-offset-[#0F1117] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#6366F1] data-[state=checked]:border-[#6366F1] text-white flex items-center justify-center transition-colors duration-200",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3 w-3 stroke-[3]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export default Checkbox;
