'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { BadgeCheck, Star } from 'lucide-react';

const stores = [
  {
    slug: 'sahara-electronics',
    name: 'Sahara Electronics',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
    rating: 4.9,
    products: 320,
    city: 'Nouakchott',
  },
  {
    slug: 'mauritania-motors',
    name: 'Mauritania Motors',
    cover: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
    rating: 4.8,
    products: 87,
    city: 'Nouadhibou',
  },
  {
    slug: 'desert-fashion',
    name: 'Desert Fashion House',
    cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800',
    logo: 'https://images.unsplash.com/photo-1485518882345-15568b007407?w=200',
    rating: 4.7,
    products: 540,
    city: 'Nouakchott',
  },
];

export function FeaturedStores({ locale }: { locale: string }) {
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
            {t('storesTitle')}
          </h2>
          <p className="text-muted-foreground mt-2">{t('storesSub')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
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
                className="group block rounded-3xl overflow-hidden glass-card hover:border-brand-cyan/40 transition-all"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={s.cover}
                    alt={s.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                </div>
                <div className="relative px-5 pb-5 -mt-10">
                  <div className="flex items-end gap-3 mb-3">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden border-2 border-background ring-2 ring-brand-cyan/40">
                      <Image src={s.logo} alt={s.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex items-center gap-1 ms-auto bg-black/50 backdrop-blur-md rounded-full px-2.5 py-1 text-xs">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span className="font-semibold">{s.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-lg">{s.name}</h3>
                    <BadgeCheck className="h-4 w-4 text-brand-cyan" />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>{s.city}</span>
                    <span>{s.products} products</span>
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
