import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand-yellow/20 text-brand-ink',
        live: 'border-transparent bg-brand-live/10 text-brand-live',
        draft: 'border-transparent bg-gray-100 text-gray-600',
        verified: 'border-transparent bg-brand-verified/10 text-brand-verified',
        green: 'border-transparent bg-brand-green/10 text-brand-green',
        outline: 'border-brand-border text-brand-ink bg-white',
        destructive: 'border-transparent bg-destructive/10 text-destructive',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
