import type { ReactNode } from 'react';
import clsx from 'clsx';
import { HelpCircle } from 'lucide-react';
import { Label } from './Label';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';

export interface FieldLabelProps {
  htmlFor?: string;
  children: ReactNode;
  helpText: string;
  required?: boolean;
  variant?: 'default' | 'section';
  className?: string;
}

export function FieldLabel({
  htmlFor,
  children,
  helpText,
  required = false,
  variant = 'default',
  className,
}: FieldLabelProps) {
  const labelContent = (
    <>
      {children}
      {required && (
        <span className="ml-0.5 text-[#EF4444]" aria-hidden="true">
          *
        </span>
      )}
    </>
  );

  return (
    <div className={clsx('inline-flex items-center gap-1.5', className)}>
      {variant === 'section' ? (
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#908fa0]">
          {labelContent}
        </span>
      ) : (
        <Label htmlFor={htmlFor}>{labelContent}</Label>
      )}

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full text-[#908fa0] transition-colors hover:text-[#6366F1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1117]"
            aria-label={`Help: ${typeof children === 'string' ? children : 'field info'}`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] leading-relaxed normal-case tracking-normal font-sans">
          {helpText}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default FieldLabel;
