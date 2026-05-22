'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  color = 'yellow',
}: {
  label: string;
  value: string | number;
  delta?: number;
  icon: LucideIcon;
  color?: 'yellow' | 'green' | 'live' | 'blue';
}) {
  const colorMap = {
    yellow: 'bg-brand-yellow/15 text-brand-yellowDark',
    green: 'bg-brand-green/10 text-brand-green',
    live: 'bg-brand-live/10 text-brand-live',
    blue: 'bg-brand-verified/10 text-brand-verified',
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white border border-brand-border shadow-soft p-5 hover:shadow-card transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-brand-muted uppercase tracking-wider font-medium">
            {label}
          </div>
          <div className="text-2xl font-bold text-brand-ink mt-1.5">{value}</div>
          {delta !== undefined && (
            <div
              className={cn(
                'mt-2 inline-flex items-center gap-1 text-xs font-semibold',
                delta >= 0 ? 'text-brand-live' : 'text-destructive'
              )}
            >
              {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {delta >= 0 ? '+' : ''}
              {delta}% هذا الأسبوع
            </div>
          )}
        </div>
        <div
          className={cn(
            'h-12 w-12 rounded-xl flex items-center justify-center',
            colorMap[color]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
