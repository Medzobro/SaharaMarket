'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export function CtaBox({ locale }: { locale: string }) {
  const t = useTranslations('Landing');

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] p-10 md:p-16 text-center"
        >
          {/* Animated gradient bg */}
          <div className="absolute inset-0 bg-gradient-cyber opacity-20 animate-gradient-x [background-size:200%_200%]" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/30 via-brand-royal/20 to-brand-cyan/30" />

          <div className="relative">
            <Sparkles className="h-10 w-10 text-brand-cyan mx-auto mb-4 animate-pulse" />
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              {t('ctaBoxTitle')}
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              {t('ctaBoxBody')}
            </p>
            <Button asChild size="xl" variant="cyber" className="mt-8">
              <Link href={`/${locale}/auth/register?role=SELLER`}>
                {t('ctaBoxBtn')}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
