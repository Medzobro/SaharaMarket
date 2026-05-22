'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Store, ArrowRight } from 'lucide-react';

export function CtaBox({ locale }: { locale: string }) {
  const t = useTranslations('Landing');

  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-brand-green p-10 md:p-16 text-center shadow-card"
        >
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, #FFCC00 0%, transparent 25%), radial-gradient(circle at 80% 70%, #FFCC00 0%, transparent 25%)',
            }}
          />

          <div className="relative">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow mb-4">
              <Store className="h-8 w-8 text-brand-green" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              {t('ctaBoxTitle')}
            </h2>
            <p className="mt-4 text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              {t('ctaBoxBody')}
            </p>
            <Button asChild size="xl" className="mt-8">
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
