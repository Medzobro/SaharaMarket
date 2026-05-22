import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand-royal/20 text-brand-cyan',
        cyber:
          'border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan shadow-[0_0_12px_-2px_rgba(34,211,238,0.6)]',
        emerald: 'border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald',
        purple: 'border-brand-purple/30 bg-brand-purple/10 text-brand-purple',
        outline: 'border-white/15 text-foreground bg-white/5',
        destructive: 'border-transparent bg-destructive/15 text-destructive',
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
