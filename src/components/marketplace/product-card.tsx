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
      <Link href={`/${locale}/products/${product.slug}`} className="group block">
        <div className="relative aspect-square rounded-3xl overflow-hidden glass-card hover:border-brand-cyan/40 transition-all">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

          {product.verified && (
            <Badge variant="emerald" className="absolute top-3 start-3 text-[10px]">
              <BadgeCheck className="h-2.5 w-2.5 me-0.5" /> Verified
            </Badge>
          )}

          <button
            className="absolute top-3 end-3 h-9 w-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-brand-purple/40 transition"
            onClick={(e) => e.preventDefault()}
            aria-label="Favorite"
          >
            <Heart className="h-4 w-4" />
          </button>

          <div className="absolute bottom-0 inset-x-0 p-4">
            <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
              <MapPin className="h-3 w-3" />
              {product.city}
            </div>
            <div className="font-semibold text-sm line-clamp-1 mb-1">{product.title}</div>
            <div className="font-display text-lg font-bold text-gradient-emerald">
              {formatPrice(product.price, product.currency)}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
