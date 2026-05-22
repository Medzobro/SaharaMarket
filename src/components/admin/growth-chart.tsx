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
  { day: 'الأحد', users: 412, products: 280 },
  { day: 'الإثنين', users: 480, products: 320 },
  { day: 'الثلاثاء', users: 530, products: 410 },
  { day: 'الأربعاء', users: 610, products: 450 },
  { day: 'الخميس', users: 720, products: 510 },
  { day: 'الجمعة', users: 890, products: 640 },
  { day: 'السبت', users: 950, products: 720 },
];

export function GrowthChart() {
  return (
    <div className="rounded-2xl bg-white border border-brand-border shadow-soft p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-brand-ink">النمو الأسبوعي</h3>
          <p className="text-xs text-brand-muted">المستخدمون مقابل المنتجات الجديدة</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-yellow" /> مستخدمون
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-green" /> منتجات
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="yellow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFCC00" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#FFCC00" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E3A2F" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#1E3A2F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
          <YAxis stroke="#6B7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(16,24,40,0.08)',
            }}
          />
          <Area type="monotone" dataKey="users" stroke="#FFCC00" strokeWidth={2.5} fill="url(#yellow)" />
          <Area type="monotone" dataKey="products" stroke="#1E3A2F" strokeWidth={2.5} fill="url(#green)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
