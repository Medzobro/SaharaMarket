'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  Smartphone,
  Car,
  Home,
  Shirt,
  Briefcase,
  Sofa,
  Baby,
  Dumbbell,
  Palette,
  Hammer,
} from 'lucide-react';

const categories = [
  { slug: 'phones', name: 'هواتف', icon: Smartphone },
  { slug: 'vehicles', name: 'سيارات', icon: Car },
  { slug: 'real-estate', name: 'عقارات', icon: Home },
  { slug: 'fashion', name: 'أزياء', icon: Shirt },
  { slug: 'jobs', name: 'وظائف', icon: Briefcase },
  { slug: 'furniture', name: 'أثاث', icon: Sofa },
  { slug: 'kids', name: 'أطفال', icon: Baby },
  { slug: 'sports', name: 'رياضة', icon: Dumbbell },
  { slug: 'art', name: 'فن', icon: Palette },
  { slug: 'tools', name: 'أدوات', icon: Hammer },
];

export function Categories({ locale }: { locale: string }) {
  const t = useTranslations('Landing');

  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink">{t('categoriesTitle')}</h2>
          <p className="text-sm text-brand-muted mt-1">تسوق حسب اهتماماتك</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/${locale}/marketplace?category=${cat.slug}`}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-brand-border shadow-soft hover:border-brand-yellow hover:shadow-card-hover hover:-translate-y-1 transition-all"
              >
                <div className="h-14 w-14 rounded-2xl bg-brand-yellow/15 group-hover:bg-brand-yellow flex items-center justify-center mb-3 transition-colors">
                  <cat.icon className="h-7 w-7 text-brand-yellowDark group-hover:text-brand-ink transition-colors" />
                </div>
                <div className="font-semibold text-sm text-brand-ink">{cat.name}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
