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
  name: 'Sahara Electronics',
  description:
    'Premium electronics retailer based in Nouakchott. Authorized reseller of Apple, Samsung, Sony. 5+ years of trust in Mauritania.',
  cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600',
  logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400',
  verified: true,
  rating: 4.9,
  reviewCount: 348,
  followers: 4200,
  city: 'Nouakchott',
  memberSince: '2020',
  phone: '+222 22 22 22 22',
  website: 'https://sahara-electronics.mr',
  instagram: '@saharaelectronics',
};

const products: ProductCardData[] = [
  { id: '1', slug: 'iphone-15-pro-max', title: 'iPhone 15 Pro Max — 256 GB', price: 95000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800', verified: true },
  { id: '3', slug: 'macbook-pro-m3', title: 'MacBook Pro M3', price: 78000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800' },
  { id: '5', slug: 'ps5-bundle', title: 'PlayStation 5 — Bundle', price: 28000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', verified: true },
  { id: '7', slug: 'sony-wh1000xm5', title: 'Sony WH-1000XM5', price: 12000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800' },
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
      {/* Cover */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <Image src={store.cover} alt={store.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container -mt-24 relative">
        {/* Header card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-3xl overflow-hidden border-2 border-background ring-2 ring-brand-cyan/40 shrink-0">
            <Image src={store.logo} alt={store.name} fill sizes="128px" className="object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-3xl sm:text-4xl font-bold">{store.name}</h1>
              {store.verified && (
                <Badge variant="cyber">
                  <BadgeCheck className="h-3 w-3 me-1" /> Verified
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground mt-2 max-w-2xl">{store.description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <strong className="text-foreground">{store.rating}</strong>
                ({store.reviewCount} reviews)
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {store.city}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> Since {store.memberSince}
              </span>
              <span>{store.followers.toLocaleString()} followers</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:flex-col">
            <Button variant="cyber" size="lg">
              <MessageCircle className="h-4 w-4" /> Message
            </Button>
            <Button variant="outline" size="lg">
              + Follow
            </Button>
          </div>
        </div>

        {/* Contacts */}
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Phone className="h-5 w-5 text-brand-cyan" />
            <div>
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="text-sm font-medium">{store.phone}</div>
            </div>
          </div>
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Globe className="h-5 w-5 text-brand-purple" />
            <div>
              <div className="text-xs text-muted-foreground">Website</div>
              <div className="text-sm font-medium truncate">{store.website}</div>
            </div>
          </div>
          <div className="glass rounded-2xl p-4 flex items-center gap-3">
            <Instagram className="h-5 w-5 text-brand-emerald" />
            <div>
              <div className="text-xs text-muted-foreground">Instagram</div>
              <div className="text-sm font-medium">{store.instagram}</div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">All products</h2>
            <Link
              href={`/${locale}/marketplace?store=${store.slug}`}
              className="text-sm text-brand-cyan hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
