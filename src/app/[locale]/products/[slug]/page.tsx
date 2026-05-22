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
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatPrice } from '@/lib/utils';
import { ProductCard, type ProductCardData } from '@/components/marketplace/product-card';

const mock = {
  id: '1',
  slug: 'iphone-15-pro-max',
  title: 'آيفون 15 برو ماكس — 256 GB',
  description:
    'جديد بالكرتون مغلق. ضمان أبل لمدة سنة. جميع الإكسسوارات موجودة (كابل Type-C، التوثيق). نوع التيتانيوم الطبيعي. تسليم في نواكشوط — يمكن التسليم باليد.',
  price: 95000,
  currency: 'MRU',
  negotiable: true,
  city: 'نواكشوط',
  region: 'تفرغ زينة',
  condition: 'جديد',
  posted: 'منذ يومين',
  views: 1247,
  images: [
    'https://images.unsplash.com/photo-1592286927505-1def25115558?w=1600',
    'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1600',
    'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=1600',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1600',
  ],
  seller: {
    username: 'sahara_electronics',
    name: 'سعود البائع',
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
    verified: true,
    memberSince: '2022',
    rating: 4.9,
    listings: 320,
  },
};

const similar: ProductCardData[] = [
  { id: '3', slug: 'macbook-pro-m3', title: 'ماك بوك برو M3', price: 78000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600' },
  { id: '7', slug: 'sony-wh1000xm5', title: 'سماعات سوني WH-1000XM5', price: 12000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600' },
  { id: '11', slug: 'gaming-pc', title: 'كمبيوتر ألعاب RTX 4080', price: 85000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600' },
];

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = use(params);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="container py-6">
      <Link
        href={`/${locale}/marketplace`}
        className="inline-flex items-center text-sm text-brand-muted hover:text-brand-ink mb-4"
      >
        ← العودة للسوق
      </Link>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-brand-border shadow-card"
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
              {mock.condition === 'جديد' && <Badge variant="live">جديد</Badge>}
              {mock.negotiable && <Badge>قابل للتفاوض</Badge>}
            </div>
          </motion.div>

          <div className="grid grid-cols-4 gap-3 mt-4">
            {mock.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all ${
                  activeImg === i
                    ? 'ring-2 ring-brand-yellow shadow-glow'
                    : 'opacity-60 hover:opacity-100 border border-brand-border'
                }`}
              >
                <Image src={img} alt="" fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-muted mb-2">
              <MapPin className="h-3 w-3" /> {mock.city}، {mock.region}
              <span>·</span>
              <Clock className="h-3 w-3" /> {mock.posted}
              <span>·</span>
              <span>{mock.views} مشاهدة</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-brand-ink leading-tight">
              {mock.title}
            </h1>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-brand-live">
                {formatPrice(mock.price, mock.currency)}
              </span>
              {mock.negotiable && (
                <span className="text-xs text-brand-muted">قابل للتفاوض</span>
              )}
            </div>
          </div>

          {/* Seller card (matches Flutter design) */}
          <div className="rounded-2xl bg-white border border-brand-border shadow-soft p-4">
            <Link
              href={`/${locale}/stores/${mock.seller.username}`}
              className="flex items-center gap-3"
            >
              <Avatar className="h-14 w-14 ring-2 ring-brand-yellow">
                <AvatarImage src={mock.seller.avatar} />
                <AvatarFallback>{mock.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-brand-ink">{mock.seller.name}</span>
                  {mock.seller.verified && (
                    <BadgeCheck className="h-4 w-4 text-brand-verified" />
                  )}
                </div>
                <div className="text-xs text-brand-verified font-medium">بائع موثق</div>
                <div className="text-xs text-brand-muted mt-0.5">
                  ⭐ {mock.seller.rating} · {mock.seller.listings} منتج · منذ {mock.seller.memberSince}
                </div>
              </div>
            </Link>
          </div>

          {/* Action buttons (yellow + black icon, matches Flutter) */}
          <div className="flex gap-2">
            <Button size="lg" className="flex-1 h-14">
              <ShoppingBag className="h-5 w-5" />
              أضف إلى السلة
            </Button>
            <Button size="lg" variant="dark" className="h-14 w-14 p-0">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 w-14 p-0">
              <Phone className="h-5 w-5" />
            </Button>
          </div>

          {/* Secondary actions */}
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="flex-1">
              <Heart className="h-4 w-4" /> حفظ
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              <Share2 className="h-4 w-4" /> مشاركة
            </Button>
            <Button variant="ghost" size="sm" className="flex-1">
              <Flag className="h-4 w-4" /> إبلاغ
            </Button>
          </div>

          {/* Trust */}
          <div className="rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 p-4 flex items-start gap-3 text-xs">
            <ShieldCheck className="h-5 w-5 text-brand-yellowDark mt-0.5 shrink-0" />
            <div>
              <p className="font-bold mb-0.5 text-brand-ink">احرص على سلامتك</p>
              <p className="text-brand-muted">
                التقِ في مكان عام، تفقّد المنتج قبل الدفع، ولا ترسل أموالاً إلكترونياً لأشخاص لا تعرفهم.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-brand-ink mb-3">الوصف</h2>
          <p className="text-brand-muted whitespace-pre-line leading-relaxed">
            {mock.description}
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-brand-ink mb-3">المواصفات</h2>
          <div className="rounded-2xl bg-white border border-brand-border overflow-hidden">
            {[
              ['الحالة', mock.condition],
              ['الموقع', `${mock.city}، ${mock.region}`],
              ['تاريخ النشر', mock.posted],
              ['المشاهدات', mock.views.toString()],
            ].map(([k, v], idx, arr) => (
              <div
                key={k}
                className={`flex items-center justify-between p-3 text-sm ${
                  idx < arr.length - 1 ? 'border-b border-brand-border' : ''
                }`}
              >
                <span className="text-brand-muted">{k}</span>
                <span className="font-semibold text-brand-ink">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar */}
      <div className="mt-16">
        <h2 className="text-xl font-bold text-brand-ink mb-6">منتجات مشابهة</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {similar.map((p) => (
            <ProductCard key={p.id} product={p} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
