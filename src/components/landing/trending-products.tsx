'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, BadgeCheck, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

const sample = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max — 256 GB',
    price: 95000,
    city: 'Nouakchott',
    image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800',
    verified: true,
    hot: true,
  },
  {
    id: '2',
    title: 'Toyota Land Cruiser 2018',
    price: 4200000,
    city: 'Nouadhibou',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800',
    verified: true,
  },
  {
    id: '3',
    title: 'MacBook Pro M3 — 14"',
    price: 78000,
    city: 'Nouakchott',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    hot: true,
  },
  {
    id: '4',
    title: 'Modern Living Room Set',
    price: 35000,
    city: 'Rosso',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
  },
  {
    id: '5',
    title: 'PlayStation 5 — Bundle',
    price: 28000,
    city: 'Kaédi',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800',
    verified: true,
  },
  {
    id: '6',
    title: 'Premium Apartment 3 rooms',
    price: 850000,
    city: 'Tevragh-Zeina',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    hot: true,
  },
  {
    id: '7',
    title: 'Sony WH-1000XM5',
    price: 12000,
    city: 'Nouakchott',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
  },
  {
    id: '8',
    title: 'Designer Watch Collection',
    price: 8500,
    city: 'Nouakchott',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800',
    verified: true,
  },
];

export function TrendingProducts({ locale }: { locale: string }) {
  const t = useTranslations('Landing');

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <Badge variant="cyber" className="mb-3">
              <Flame className="h-3 w-3 me-1" /> Hot
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              {t('trendingTitle')}
            </h2>
            <p className="text-muted-foreground mt-2">{t('trendingSub')}</p>
          </div>
          <Link
            href={`/${locale}/marketplace`}
            className="hidden sm:inline-flex text-sm text-brand-cyan hover:underline"
          >
            View all →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sample.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/${locale}/products/${p.id}`} className="group block">
                <div className="relative aspect-square rounded-3xl overflow-hidden glass-card hover:border-brand-cyan/40 transition-all">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-3 start-3 flex flex-col gap-1.5">
                    {p.hot && (
                      <Badge variant="cyber" className="text-[10px]">
                        <Flame className="h-2.5 w-2.5 me-0.5" /> Hot
                      </Badge>
                    )}
                    {p.verified && (
                      <Badge variant="emerald" className="text-[10px]">
                        <BadgeCheck className="h-2.5 w-2.5 me-0.5" /> Verified
                      </Badge>
                    )}
                  </div>

                  {/* Heart button */}
                  <button
                    className="absolute top-3 end-3 h-9 w-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-brand-purple/40 transition-colors"
                    onClick={(e) => e.preventDefault()}
                    aria-label="Favorite"
                  >
                    <Heart className="h-4 w-4" />
                  </button>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" />
                      {p.city}
                    </div>
                    <div className="font-semibold text-sm line-clamp-1 mb-1">{p.title}</div>
                    <div className="font-display text-lg font-bold text-gradient-emerald">
                      {formatPrice(p.price)}
                    </div>
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
