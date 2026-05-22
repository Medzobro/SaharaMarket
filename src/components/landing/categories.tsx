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
  { slug: 'phones', name: 'Phones', icon: Smartphone, color: 'from-brand-cyan to-brand-royal' },
  { slug: 'vehicles', name: 'Vehicles', icon: Car, color: 'from-brand-royal to-brand-purple' },
  { slug: 'real-estate', name: 'Real Estate', icon: Home, color: 'from-brand-purple to-pink-500' },
  { slug: 'fashion', name: 'Fashion', icon: Shirt, color: 'from-pink-500 to-rose-500' },
  { slug: 'jobs', name: 'Jobs', icon: Briefcase, color: 'from-amber-500 to-orange-500' },
  { slug: 'furniture', name: 'Furniture', icon: Sofa, color: 'from-emerald-500 to-teal-500' },
  { slug: 'kids', name: 'Kids', icon: Baby, color: 'from-rose-400 to-pink-400' },
  { slug: 'sports', name: 'Sports', icon: Dumbbell, color: 'from-brand-emerald to-brand-cyan' },
  { slug: 'art', name: 'Art', icon: Palette, color: 'from-brand-purple to-brand-cyan' },
  { slug: 'tools', name: 'Tools', icon: Hammer, color: 'from-slate-400 to-slate-600' },
];

export function Categories({ locale }: { locale: string }) {
  const t = useTranslations('Landing');

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold">
            {t('categoriesTitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
                className="group block relative overflow-hidden rounded-3xl glass p-6 hover:border-brand-cyan/40 transition-all hover:-translate-y-1"
              >
                <div
                  className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${cat.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`}
                />
                <div
                  className={`relative inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br ${cat.color} shadow-glow mb-4`}
                >
                  <cat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="relative font-semibold text-sm">{cat.name}</div>
                <div className="relative text-xs text-muted-foreground mt-0.5">
                  Explore →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
