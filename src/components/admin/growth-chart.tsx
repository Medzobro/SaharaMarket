'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { day: 'Mon', users: 412, products: 280 },
  { day: 'Tue', users: 480, products: 320 },
  { day: 'Wed', users: 530, products: 410 },
  { day: 'Thu', users: 610, products: 450 },
  { day: 'Fri', users: 720, products: 510 },
  { day: 'Sat', users: 890, products: 640 },
  { day: 'Sun', users: 950, products: 720 },
];

export function GrowthChart() {
  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold">Weekly growth</h3>
          <p className="text-xs text-muted-foreground">Users vs new products</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-cyan" /> Users
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-purple" /> Products
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="cyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="purple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: 'rgba(11,15,25,0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(12px)',
            }}
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#22D3EE"
            strokeWidth={2}
            fill="url(#cyan)"
          />
          <Area
            type="monotone"
            dataKey="products"
            stroke="#7C3AED"
            strokeWidth={2}
            fill="url(#purple)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
