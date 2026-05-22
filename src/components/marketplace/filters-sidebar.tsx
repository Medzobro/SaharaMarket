'use client';

import { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const categories = [
  { slug: 'phones', name: 'Phones', count: 1240 },
  { slug: 'vehicles', name: 'Vehicles', count: 540 },
  { slug: 'real-estate', name: 'Real Estate', count: 320 },
  { slug: 'fashion', name: 'Fashion', count: 2100 },
  { slug: 'furniture', name: 'Furniture', count: 670 },
  { slug: 'sports', name: 'Sports', count: 280 },
];

const cities = ['Nouakchott', 'Nouadhibou', 'Rosso', 'Kaédi', 'Atar', 'Zouérat'];
const conditions = ['NEW', 'LIKE_NEW', 'GOOD', 'USED', 'REFURBISHED'];

export function FiltersSidebar() {
  const [openCat, setOpenCat] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openCity, setOpenCity] = useState(true);
  const [openCond, setOpenCond] = useState(false);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      <div className="flex items-center gap-2 px-1">
        <SlidersHorizontal className="h-4 w-4 text-brand-cyan" />
        <span className="font-semibold text-sm">Filters</span>
      </div>

      <FilterGroup title="Category" open={openCat} onToggle={() => setOpenCat((s) => !s)}>
        <div className="space-y-1">
          {categories.map((c) => (
            <label
              key={c.slug}
              className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 cursor-pointer text-sm"
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" className="accent-brand-cyan" />
                <span>{c.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{c.count}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price (MRU)" open={openPrice} onToggle={() => setOpenPrice((s) => !s)}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan/40"
          />
          <span className="text-muted-foreground">—</span>
          <input
            type="number"
            placeholder="Max"
            className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan/40"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="City" open={openCity} onToggle={() => setOpenCity((s) => !s)}>
        <div className="flex flex-wrap gap-1.5">
          {cities.map((c) => (
            <Badge key={c} variant="outline" className="cursor-pointer hover:bg-white/10">
              {c}
            </Badge>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Condition" open={openCond} onToggle={() => setOpenCond((s) => !s)}>
        <div className="space-y-1">
          {conditions.map((c) => (
            <label
              key={c}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 cursor-pointer text-sm"
            >
              <input type="checkbox" className="accent-brand-cyan" />
              <span>{c.replace('_', ' ').toLowerCase()}</span>
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
    <div className="rounded-2xl glass-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-white/5"
      >
        {title}
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="p-3 pt-0">{children}</div>}
    </div>
  );
}
