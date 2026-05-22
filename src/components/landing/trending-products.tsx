'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProductCard, type ProductCardData } from '@/components/marketplace/product-card';

const sample: ProductCardData[] = [
  { id: '1', slug: 'iphone-15-pro-max', title: 'آيفون 15 برو ماكس — 256 GB', price: 95000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800', verified: true },
  { id: '2', slug: 'toyota-land-cruiser', title: 'تويوتا لاند كروزر 2018', price: 4200000, city: 'نواذيبو', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', verified: true },
  { id: '3', slug: 'macbook-pro-m3', title: 'ماك بوك برو M3 — 14 إنش', price: 78000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800' },
  { id: '4', slug: 'living-room-set', title: 'طقم صالون عصري', price: 35000, city: 'روصو', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800' },
  { id: '5', slug: 'ps5-bundle', title: 'بلايستيشن 5 — حزمة كاملة', price: 28000, city: 'كيهيدي', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', verified: true },
  { id: '6', slug: 'apartment-3-rooms', title: 'شقة فاخرة 3 غرف', price: 850000, city: 'تفرغ زينة', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
  { id: '7', slug: 'sony-wh1000xm5', title: 'سماعات سوني WH-1000XM5', price: 12000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800' },
  { id: '8', slug: 'designer-watch', title: 'ساعة فاخرة', price: 8500, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800', verified: true },
];

export function TrendingProducts({ locale }: { locale: string }) {
  const t = useTranslations('Landing');

  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <Badge className="mb-2">
              <Flame className="h-3 w-3 me-1" /> ترند
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink">
              {t('trendingTitle')}
            </h2>
            <p className="text-sm text-brand-muted mt-1">{t('trendingSub')}</p>
          </div>
          <Link
            href={`/${locale}/marketplace`}
            className="hidden sm:inline-flex text-sm font-semibold text-brand-yellowDark hover:underline"
          >
            عرض الكل ←
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sample.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <ProductCard product={p} locale={locale} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
