import React from 'react';
import clsx from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const Card = ({ className, ref, ...props }: CardProps) => (
  <div
    ref={ref}
    className={clsx(
      "rounded-[8px] border border-[#2D3149] bg-[#1A1D27] text-[#e4e1ed] p-6 shadow-sm",
      className
    )}
    {...props}
  />
);

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const CardHeader = ({ className, ref, ...props }: CardHeaderProps) => (
  <div
    ref={ref}
    className={clsx("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
);

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  ref?: React.Ref<HTMLHeadingElement>;
}

export const CardTitle = ({ className, ref, ...props }: CardTitleProps) => (
  <h3
    ref={ref}
    className={clsx("font-semibold leading-none tracking-tight text-white text-lg", className)}
    {...props}
  />
);

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  ref?: React.Ref<HTMLParagraphElement>;
}

export const CardDescription = ({ className, ref, ...props }: CardDescriptionProps) => (
  <p
    ref={ref}
    className={clsx("text-sm text-[#908fa0]", className)}
    {...props}
  />
);

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const CardContent = ({ className, ref, ...props }: CardContentProps) => (
  <div ref={ref} className={clsx("", className)} {...props} />
);

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
}

export const CardFooter = ({ className, ref, ...props }: CardFooterProps) => (
  <div
    ref={ref}
    className={clsx("flex items-center pt-4 border-t border-[#2D3149] mt-4", className)}
    {...props}
  />
);

export default Card;
