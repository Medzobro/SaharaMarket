'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  color = 'cyan',
}: {
  label: string;
  value: string | number;
  delta?: number;
  icon: LucideIcon;
  color?: 'cyan' | 'purple' | 'emerald' | 'royal';
}) {
  const colorMap = {
    cyan: 'from-brand-cyan to-brand-royal',
    purple: 'from-brand-purple to-pink-500',
    emerald: 'from-brand-emerald to-brand-cyan',
    royal: 'from-brand-royal to-brand-purple',
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:border-brand-cyan/30 transition-colors"
    >
      <div
        className={cn(
          'absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl group-hover:opacity-40 transition-opacity',
          colorMap[color]
        )}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
          <div className="font-display text-3xl font-bold mt-2">{value}</div>
          {delta !== undefined && (
            <div
              className={cn(
                'mt-2 inline-flex items-center gap-1 text-xs font-medium',
                delta >= 0 ? 'text-brand-emerald' : 'text-destructive'
              )}
            >
              {delta >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {delta >= 0 ? '+' : ''}
              {delta}% this week
            </div>
          )}
        </div>
        <div
          className={cn(
            'h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-glow',
            colorMap[color]
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
