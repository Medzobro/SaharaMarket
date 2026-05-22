'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, ArrowRight, ShieldCheck, Store, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations('Landing');

  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 mb-6 text-xs font-semibold text-brand-yellowDark"
          >
            <span className="h-2 w-2 rounded-full bg-brand-yellow animate-pulse" />
            {t('heroBadge')}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-brand-ink"
          >
            {t('heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-base sm:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed"
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
            <form action={`/${locale}/marketplace`} method="get" className="relative">
              <div className="flex items-center gap-2 p-2 bg-white rounded-2xl border-2 border-brand-yellow shadow-glow">
                <Search className="ms-3 h-5 w-5 text-brand-muted" />
                <input
                  name="q"
                  type="search"
                  placeholder="ابحث عن سيارة، هاتف، شقة..."
                  className="flex-1 bg-transparent border-0 outline-none px-2 h-12 text-base text-brand-ink placeholder:text-brand-muted"
                />
                <Button type="submit" size="lg" className="h-12">
                  بحث
                </Button>
              </div>
            </form>

            {/* Quick suggestions */}
            <div className="mt-5 flex items-center justify-center gap-2 flex-wrap text-xs">
              <span className="text-brand-muted">شائع:</span>
              {['آيفون', 'تويوتا', 'نواكشوط', 'لابتوب'].map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/marketplace?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-full bg-white border border-brand-border hover:border-brand-yellow hover:bg-brand-yellow/10 text-brand-muted hover:text-brand-ink transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button asChild size="lg" className="min-w-[180px]">
              <Link href={`/${locale}/marketplace`}>
                {t('ctaPrimary')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="green" className="min-w-[180px]">
              <Link href={`/${locale}/auth/register?role=SELLER`}>{t('ctaSecondary')}</Link>
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto"
          >
            {[
              { icon: Users, value: '50K+', label: 'مستخدم' },
              { icon: Store, value: '8K+', label: 'متجر' },
              { icon: ShieldCheck, value: '100%', label: 'حماية' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white border border-brand-border p-4 sm:p-5 shadow-soft hover:shadow-card transition-shadow"
              >
                <stat.icon className="h-5 w-5 text-brand-yellowDark mx-auto mb-2" />
                <div className="text-xl sm:text-2xl font-bold text-brand-ink">{stat.value}</div>
                <div className="text-xs text-brand-muted mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Soft ornaments */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[300px] bg-gradient-to-b from-brand-yellow/8 to-transparent -z-10" />
    </section>
  );
}
