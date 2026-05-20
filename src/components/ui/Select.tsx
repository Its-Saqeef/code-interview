/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps extends SelectPrimitive.SelectTriggerProps {
  ref?: React.Ref<HTMLButtonElement>;
}

export const SelectTrigger = ({ className, children, ref, ...props }: SelectTriggerProps) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={clsx(
      "flex h-9 w-full items-center justify-between rounded-[6px] border border-[#2D3149] bg-[#1A1D27] px-3 py-2 text-sm text-[#e4e1ed] placeholder-[#4B5563] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 focus:ring-offset-[#0F1117] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

export interface SelectContentProps extends SelectPrimitive.SelectContentProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const SelectContent = ({ className, children, position = "popper", ref, ...props }: SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={clsx(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-[8px] border border-[#2D3149] bg-[#22263A] text-[#e4e1ed] shadow-[0_4px_12px_rgba(0,0,0,0.3)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={clsx(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

export interface SelectItemProps extends SelectPrimitive.SelectItemProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const SelectItem = ({ className, children, ref, ...props }: SelectItemProps) => (
  <SelectPrimitive.Item
    ref={ref}
    className={clsx(
      "relative flex w-full cursor-pointer select-none items-center rounded-[4px] py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-[#2D3149] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

export interface SelectSeparatorProps extends SelectPrimitive.SelectSeparatorProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const SelectSeparator = ({ className, ref, ...props }: SelectSeparatorProps) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={clsx("-mx-1 my-1 h-px bg-[#2D3149]", className)}
    {...props}
  />
);
