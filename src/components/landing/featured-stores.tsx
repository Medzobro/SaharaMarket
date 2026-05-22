'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { BadgeCheck, Star } from 'lucide-react';

const stores = [
  {
    slug: 'sahara-electronics',
    name: 'صحراء إلكترونيات',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
    rating: 4.9,
    products: 320,
    city: 'نواكشوط',
    verified: true,
  },
  {
    slug: 'mauritania-motors',
    name: 'موريتانيا موتورز',
    cover: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
    rating: 4.8,
    products: 87,
    city: 'نواذيبو',
    verified: true,
  },
  {
    slug: 'desert-fashion',
    name: 'بيت أزياء الصحراء',
    cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    logo: 'https://images.unsplash.com/photo-1485518882345-15568b007407?w=200',
    rating: 4.7,
    products: 540,
    city: 'نواكشوط',
    verified: true,
  },
];

export function FeaturedStores({ locale }: { locale: string }) {
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
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-ink">{t('storesTitle')}</h2>
          <p className="text-sm text-brand-muted mt-1">{t('storesSub')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {stores.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/${locale}/stores/${s.slug}`}
                className="group block rounded-2xl bg-white border border-brand-border shadow-soft hover:shadow-card-hover hover:border-brand-yellow/50 transition-all overflow-hidden"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={s.cover}
                    alt={s.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="px-5 pb-5 -mt-10 relative">
                  <div className="flex items-end gap-3 mb-3">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-4 border-white shadow-card">
                      <Image src={s.logo} alt={s.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex items-center gap-1 ms-auto bg-brand-yellow rounded-full px-2.5 py-1 text-xs">
                      <Star className="h-3 w-3 text-brand-ink fill-brand-ink" />
                      <span className="font-bold text-brand-ink">{s.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-lg text-brand-ink">{s.name}</h3>
                    {s.verified && <BadgeCheck className="h-4 w-4 text-brand-verified" />}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-brand-muted">
                    <span>{s.city}</span>
                    <span>{s.products} منتج</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
