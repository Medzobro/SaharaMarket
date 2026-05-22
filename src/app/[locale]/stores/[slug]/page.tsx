import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import {
  BadgeCheck,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  Globe,
  Instagram,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard, type ProductCardData } from '@/components/marketplace/product-card';

const store = {
  slug: 'sahara-electronics',
  name: 'صحراء إلكترونيات',
  description:
    'تاجر تجزئة متميز للإلكترونيات في نواكشوط. وكيل معتمد لـ Apple وSamsung وSony. أكثر من 5 سنوات من الثقة في موريتانيا.',
  cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600',
  logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
  verified: true,
  rating: 4.9,
  reviewCount: 348,
  followers: 4200,
  city: 'نواكشوط',
  memberSince: '2020',
  phone: '+222 22 22 22 22',
  website: 'https://sahara-electronics.mr',
  instagram: '@saharaelectronics',
};

const products: ProductCardData[] = [
  { id: '1', slug: 'iphone-15-pro-max', title: 'آيفون 15 برو ماكس — 256 GB', price: 95000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800', verified: true },
  { id: '3', slug: 'macbook-pro-m3', title: 'ماك بوك برو M3', price: 78000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800' },
  { id: '5', slug: 'ps5-bundle', title: 'بلايستيشن 5 — حزمة', price: 28000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', verified: true },
  { id: '7', slug: 'sony-wh1000xm5', title: 'سماعات سوني WH-1000XM5', price: 12000, city: 'نواكشوط', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800' },
];

export default async function StorePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <Image src={store.cover} alt={store.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="container -mt-24 relative">
        <div className="rounded-2xl bg-white border border-brand-border shadow-card p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl overflow-hidden border-4 border-white shadow-card shrink-0">
            <Image src={store.logo} alt={store.name} fill sizes="128px" className="object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-3xl font-bold text-brand-ink">{store.name}</h1>
              {store.verified && (
                <Badge variant="verified">
                  <BadgeCheck className="h-3 w-3 me-1" /> موثق
                </Badge>
              )}
            </div>

            <p className="text-brand-muted mt-2 max-w-2xl text-sm leading-relaxed">{store.description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-brand-muted">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-brand-yellow fill-brand-yellow" />
                <strong className="text-brand-ink">{store.rating}</strong>
                ({store.reviewCount} تقييم)
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {store.city}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> منذ {store.memberSince}
              </span>
              <span>{store.followers.toLocaleString()} متابع</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-col">
            <Button size="lg">
              <MessageCircle className="h-4 w-4" /> راسل
            </Button>
            <Button size="lg" variant="outline">+ تابع</Button>
          </div>
        </div>

        {/* Contacts */}
        <div className="mt-5 grid sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-white border border-brand-border p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-brand-yellow/15 flex items-center justify-center">
              <Phone className="h-5 w-5 text-brand-yellowDark" />
            </div>
            <div>
              <div className="text-xs text-brand-muted">الهاتف</div>
              <div className="text-sm font-bold text-brand-ink">{store.phone}</div>
            </div>
          </div>
          <div className="rounded-xl bg-white border border-brand-border p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-brand-green/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-brand-green" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-brand-muted">الموقع</div>
              <div className="text-sm font-bold text-brand-ink truncate">{store.website}</div>
            </div>
          </div>
          <div className="rounded-xl bg-white border border-brand-border p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-pink-100 flex items-center justify-center">
              <Instagram className="h-5 w-5 text-pink-600" />
            </div>
            <div>
              <div className="text-xs text-brand-muted">إنستجرام</div>
              <div className="text-sm font-bold text-brand-ink">{store.instagram}</div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brand-ink">جميع المنتجات</h2>
            <Link
              href={`/${locale}/marketplace?store=${store.slug}`}
              className="text-sm font-semibold text-brand-yellowDark hover:underline"
            >
              عرض الكل ←
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
