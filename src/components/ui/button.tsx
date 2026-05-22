'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        // Yellow primary (Mauritanian flag)
        default:
          'bg-brand-yellow text-brand-ink hover:bg-brand-yellowDark shadow-soft',
        // Deep green secondary
        green:
          'bg-brand-green text-brand-yellow hover:bg-brand-greenSoft shadow-soft',
        outline:
          'border border-brand-border bg-white text-brand-ink hover:border-brand-yellow hover:bg-brand-yellow/5',
        ghost: 'text-brand-ink hover:bg-brand-yellow/10',
        // Black icon button (matches Flutter chat button)
        dark:
          'bg-brand-ink text-white hover:bg-brand-green',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        link: 'text-brand-yellowDark underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { buttonVariants };
