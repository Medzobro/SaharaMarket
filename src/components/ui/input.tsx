import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-12 w-full rounded-xl border border-brand-border bg-white px-4 py-2 text-sm text-brand-ink',
          'transition-all',
          'placeholder:text-brand-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/40 focus-visible:border-brand-yellow',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
