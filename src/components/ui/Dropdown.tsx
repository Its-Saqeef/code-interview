/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

export interface DropdownMenuContentProps extends DropdownMenuPrimitive.DropdownMenuContentProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const DropdownMenuContent = ({ className, sideOffset = 4, ref, ...props }: DropdownMenuContentProps) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={clsx(
        "z-50 min-w-[8rem] overflow-hidden rounded-[8px] border border-[#2D3149] bg-[#22263A] p-1 text-[#e4e1ed] shadow-[0_4px_12px_rgba(0,0,0,0.3)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
);

export interface DropdownMenuItemProps extends DropdownMenuPrimitive.DropdownMenuItemProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const DropdownMenuItem = ({ className, ref, ...props }: DropdownMenuItemProps) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={clsx(
      "relative flex cursor-pointer select-none items-center rounded-[4px] px-2.5 py-1.5 text-sm outline-none transition-colors focus:bg-[#2D3149] focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
);

export interface DropdownMenuSeparatorProps extends DropdownMenuPrimitive.DropdownMenuSeparatorProps {
  ref?: React.Ref<HTMLDivElement>;
}

export const DropdownMenuSeparator = ({ className, ref, ...props }: DropdownMenuSeparatorProps) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={clsx("-mx-1 my-1 h-px bg-[#2D3149]", className)}
    {...props}
  />
);

// Legacy wrapper for backwards compatibility
export interface LegacyDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Dropdown = ({ trigger, children, isOpen, onClose }: LegacyDropdownProps) => {
  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DropdownMenuTrigger asChild>
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;