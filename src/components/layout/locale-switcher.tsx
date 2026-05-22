'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, localeFlags, localeNames, type Locale } from '@/i18n/config';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LocaleSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  function switchTo(locale: Locale) {
    const segments = pathname.split('/');
    segments[1] = locale;
    router.push(segments.join('/') || `/${locale}`);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white border border-brand-border hover:border-brand-yellow hover:bg-brand-yellow/5 text-sm transition-colors"
      >
        <Globe className="h-4 w-4 text-brand-muted" />
        <span className="text-xs font-semibold uppercase">{current}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 top-full mt-2 w-44 rounded-xl bg-white border border-brand-border shadow-card overflow-hidden"
          >
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => switchTo(l)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-brand-yellow/10 transition-colors ${
                  l === current ? 'bg-brand-yellow/15 text-brand-ink font-semibold' : 'text-brand-ink'
                }`}
              >
                <span className="text-base">{localeFlags[l]}</span>
                <span>{localeNames[l]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
