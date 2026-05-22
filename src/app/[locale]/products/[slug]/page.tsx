'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart,
  Share2,
  Flag,
  MapPin,
  Clock,
  BadgeCheck,
  MessageCircle,
  Phone,
  Shield,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatPrice } from '@/lib/utils';

const mock = {
  id: '1',
  slug: 'iphone-15-pro-max',
  title: 'iPhone 15 Pro Max — 256 GB Natural Titanium',
  description:
    'Brand new in box, sealed. Original Apple warranty included for 1 year. All accessories present (Type-C cable, documentation). Ships from Nouakchott — meet in person available.',
  price: 95000,
  currency: 'MRU',
  negotiable: true,
  city: 'Nouakchott',
  region: 'Tevragh-Zeina',
  condition: 'NEW',
  posted: '2 days ago',
  views: 1247,
  images: [
    'https://images.unsplash.com/photo-1592286927505-1def25115558?w=1600',
    'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1600',
    'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=1600',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1600',
  ],
  seller: {
    username: 'sahara_electronics',
    name: 'Sahara Electronics',
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
    verified: true,
    memberSince: '2022',
    rating: 4.9,
    listings: 320,
  },
  tags: ['Apple', 'Smartphone', 'Premium', 'Sealed'],
};

const similar = [
  { id: '3', slug: 'macbook-pro-m3', title: 'MacBook Pro M3', price: 78000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600' },
  { id: '7', slug: 'sony-wh1000xm5', title: 'Sony WH-1000XM5', price: 12000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600' },
  { id: '11', slug: 'gaming-pc', title: 'Gaming PC RTX 4080', price: 85000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600' },
];

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = use(params);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="container py-8">
      <Link
        href={`/${locale}/marketplace`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        ← Back to marketplace
      </Link>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square rounded-3xl overflow-hidden glass-card"
          >
            <Image
              src={mock.images[activeImg]!}
              alt={mock.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-4 start-4 flex gap-2">
              {mock.condition === 'NEW' && <Badge variant="emerald">NEW</Badge>}
              {mock.negotiable && <Badge variant="cyber">Negotiable</Badge>}
            </div>
          </motion.div>

          <div className="grid grid-cols-4 gap-3 mt-4">
            {mock.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative aspect-square rounded-2xl overflow-hidden transition-all ${
                  activeImg === i
                    ? 'ring-2 ring-brand-cyan shadow-glow'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <MapPin className="h-3 w-3" /> {mock.city}, {mock.region}
              <span>·</span>
              <Clock className="h-3 w-3" /> {mock.posted}
              <span>·</span>
              <span>{mock.views} views</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight">
              {mock.title}
            </h1>
            <div className="mt-4 font-display text-4xl font-bold text-gradient-emerald">
              {formatPrice(mock.price, mock.currency)}
            </div>
            {mock.negotiable && (
              <span className="text-xs text-muted-foreground">Negotiable</span>
            )}
          </div>

          {/* Seller */}
          <div className="glass-card rounded-3xl p-5">
            <Link
              href={`/${locale}/stores/${mock.seller.username}`}
              className="flex items-center gap-3"
            >
              <Avatar className="h-14 w-14 ring-2 ring-brand-cyan/40">
                <AvatarImage src={mock.seller.avatar} />
                <AvatarFallback>{mock.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">{mock.seller.name}</span>
                  {mock.seller.verified && (
                    <BadgeCheck className="h-4 w-4 text-brand-cyan" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  ⭐ {mock.seller.rating} · {mock.seller.listings} listings · since{' '}
                  {mock.seller.memberSince}
                </div>
              </div>
            </Link>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="cyber" size="lg">
                <MessageCircle className="h-4 w-4" /> Message
              </Button>
              <Button variant="outline" size="lg">
                <Phone className="h-4 w-4" /> Call
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="flex-1">
              <Heart className="h-4 w-4" /> Save
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              <Flag className="h-4 w-4" /> Report
            </Button>
          </div>

          {/* Trust */}
          <div className="glass rounded-2xl p-4 flex items-start gap-3 text-xs">
            <Shield className="h-5 w-5 text-brand-emerald mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold mb-0.5">Stay safe on SaharaMarket</p>
              <p className="text-muted-foreground">
                Always meet in public, inspect before paying, never wire money.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="font-display text-xl font-bold mb-3">Details</h2>
          <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
            {mock.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {mock.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                <Tag className="h-3 w-3 me-1" /> {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-bold mb-3">Specs</h2>
          {[
            ['Condition', mock.condition],
            ['Location', `${mock.city}, ${mock.region}`],
            ['Posted', mock.posted],
            ['Views', mock.views.toString()],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between py-2 border-b border-white/5 text-sm"
            >
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Similar */}
      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold mb-6">Similar products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {similar.map((p) => (
            <Link
              key={p.id}
              href={`/${locale}/products/${p.slug}`}
              className="group block rounded-3xl overflow-hidden glass-card"
            >
              <div className="relative aspect-square">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-muted-foreground mb-0.5">{p.city}</div>
                <div className="font-semibold text-sm mb-1 line-clamp-1">{p.title}</div>
                <div className="font-display text-lg font-bold text-gradient-emerald">
                  {formatPrice(p.price)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
