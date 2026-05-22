'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Sparkles, Search, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations('Landing');

  return (
    <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-strong mb-8 text-xs font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-cyan animate-pulse" />
            <span className="text-gradient">{t('heroBadge')}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            <span className="block">{t('heroTitle').split('.')[0]}.</span>
            <span className="block text-gradient">
              {t('heroTitle').split('.').slice(1).join('.').trim()}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {t('heroSubtitle')}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 max-w-2xl mx-auto"
          >
            <form
              action={`/${locale}/marketplace`}
              method="get"
              className="relative group"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-brand-cyan via-brand-royal to-brand-purple opacity-50 blur-xl group-focus-within:opacity-80 transition-opacity" />
              <div className="relative flex items-center gap-2 p-2 glass-strong rounded-3xl">
                <Search className="ms-3 h-5 w-5 text-muted-foreground" />
                <input
                  name="q"
                  type="search"
                  placeholder="iPhone, voiture, maison, شقة..."
                  className="flex-1 bg-transparent border-0 outline-none px-2 h-12 text-base placeholder:text-muted-foreground"
                />
                <Button type="submit" variant="cyber" size="lg" className="rounded-2xl">
                  <Search className="h-4 w-4 sm:hidden" />
                  <span className="hidden sm:inline">{t('ctaPrimary')}</span>
                </Button>
              </div>
            </form>

            {/* Quick suggestions */}
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs">
              <TrendingUp className="h-3.5 w-3.5 text-brand-cyan" />
              <span className="text-muted-foreground">Trending:</span>
              {['iPhone 15', 'Toyota', 'Nouakchott', 'Laptop'].map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/marketplace?q=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="lg" variant="default" className="min-w-[180px]">
              <Link href={`/${locale}/marketplace`}>
                {t('ctaPrimary')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-w-[180px]">
              <Link href={`/${locale}/auth/register?role=SELLER`}>{t('ctaSecondary')}</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { value: '50K+', label: 'users' },
              { value: '120K+', label: 'products' },
              { value: '8K+', label: 'stores' },
              { value: '15', label: 'cities' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl glass p-6 hover:border-brand-cyan/30 transition-colors"
              >
                <div className="font-display text-3xl font-bold text-gradient">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating ornaments */}
      <div className="pointer-events-none absolute top-20 -left-10 h-32 w-32 rounded-full bg-brand-cyan/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-40 -right-10 h-40 w-40 rounded-full bg-brand-purple/20 blur-3xl animate-float [animation-delay:2s]" />
    </section>
  );
}
