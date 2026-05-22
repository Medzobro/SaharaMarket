'use client';

import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const categories = [
  { slug: 'phones', name: 'هواتف', count: 1240 },
  { slug: 'vehicles', name: 'سيارات', count: 540 },
  { slug: 'real-estate', name: 'عقارات', count: 320 },
  { slug: 'fashion', name: 'أزياء', count: 2100 },
  { slug: 'furniture', name: 'أثاث', count: 670 },
  { slug: 'sports', name: 'رياضة', count: 280 },
];

const cities = ['نواكشوط', 'نواذيبو', 'روصو', 'كيهيدي', 'أطار', 'ازويرات'];
const conditions = [
  { value: 'NEW', label: 'جديد' },
  { value: 'LIKE_NEW', label: 'كالجديد' },
  { value: 'GOOD', label: 'جيد' },
  { value: 'USED', label: 'مستعمل' },
];

export function FiltersSidebar() {
  const [openCat, setOpenCat] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openCity, setOpenCity] = useState(true);
  const [openCond, setOpenCond] = useState(false);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-3">
      <div className="flex items-center gap-2 px-1">
        <SlidersHorizontal className="h-4 w-4 text-brand-yellowDark" />
        <span className="font-bold text-sm text-brand-ink">الفلاتر</span>
      </div>

      <FilterGroup title="التصنيف" open={openCat} onToggle={() => setOpenCat((s) => !s)}>
        <div className="space-y-1">
          {categories.map((c) => (
            <label
              key={c.slug}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-brand-yellow/10 cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded accent-brand-yellow" />
                <span className="text-brand-ink">{c.name}</span>
              </div>
              <span className="text-xs text-brand-muted">{c.count}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="السعر (MRU)" open={openPrice} onToggle={() => setOpenPrice((s) => !s)}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="من"
            className="w-full h-10 px-3 rounded-lg bg-white border border-brand-border text-sm focus:outline-none focus:border-brand-yellow"
          />
          <span className="text-brand-muted">—</span>
          <input
            type="number"
            placeholder="إلى"
            className="w-full h-10 px-3 rounded-lg bg-white border border-brand-border text-sm focus:outline-none focus:border-brand-yellow"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="المدينة" open={openCity} onToggle={() => setOpenCity((s) => !s)}>
        <div className="flex flex-wrap gap-1.5">
          {cities.map((c) => (
            <Badge
              key={c}
              variant="outline"
              className="cursor-pointer hover:bg-brand-yellow/10 hover:border-brand-yellow"
            >
              {c}
            </Badge>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="الحالة" open={openCond} onToggle={() => setOpenCond((s) => !s)}>
        <div className="space-y-1">
          {conditions.map((c) => (
            <label
              key={c.value}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-brand-yellow/10 cursor-pointer text-sm"
            >
              <input type="checkbox" className="h-4 w-4 rounded accent-brand-yellow" />
              <span className="text-brand-ink">{c.label}</span>
            </label>
          ))}
        </div>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white border border-brand-border shadow-soft overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-brand-ink hover:bg-brand-yellow/5"
      >
        {title}
        <ChevronDown className={cn('h-4 w-4 text-brand-muted transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="p-3 pt-0">{children}</div>}
    </div>
  );
}
