'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MapPin, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

export interface ProductCardData {
  id: string;
  slug: string;
  title: string;
  price: number;
  currency?: string;
  city: string;
  image: string;
  verified?: boolean;
  condition?: string;
}

export function ProductCard({ product, locale }: { product: ProductCardData; locale: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Link
        href={`/${locale}/products/${product.slug}`}
        className="group block rounded-2xl bg-white border border-brand-border shadow-soft hover:shadow-card-hover hover:border-brand-yellow/50 transition-all overflow-hidden"
      >
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.verified && (
            <Badge variant="verified" className="absolute top-3 start-3">
              <BadgeCheck className="h-3 w-3 me-0.5" /> موثق
            </Badge>
          )}
          <button
            className="absolute top-3 end-3 h-9 w-9 rounded-full bg-white shadow-card flex items-center justify-center hover:bg-brand-yellow transition-colors"
            onClick={(e) => e.preventDefault()}
            aria-label="Favorite"
          >
            <Heart className="h-4 w-4 text-brand-ink" />
          </button>
        </div>

        <div className="p-4">
          <div className="text-xs text-brand-muted flex items-center gap-1 mb-1.5">
            <MapPin className="h-3 w-3" />
            {product.city}
          </div>
          <div className="font-semibold text-sm text-brand-ink line-clamp-2 min-h-[2.5em]">
            {product.title}
          </div>
          <div className="mt-2 text-lg font-bold text-brand-live">
            {formatPrice(product.price, product.currency)}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
