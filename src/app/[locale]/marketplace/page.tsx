import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { FiltersSidebar } from '@/components/marketplace/filters-sidebar';
import { ProductCard, type ProductCardData } from '@/components/marketplace/product-card';

const mockProducts: ProductCardData[] = [
  { id: '1', slug: 'iphone-15-pro-max', title: 'iPhone 15 Pro Max — 256 GB', price: 95000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=800', verified: true },
  { id: '2', slug: 'toyota-land-cruiser', title: 'Toyota Land Cruiser 2018', price: 4200000, city: 'Nouadhibou', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800', verified: true },
  { id: '3', slug: 'macbook-pro-m3', title: 'MacBook Pro M3 — 14"', price: 78000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800' },
  { id: '4', slug: 'living-room-set', title: 'Modern Living Room Set', price: 35000, city: 'Rosso', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800' },
  { id: '5', slug: 'ps5-bundle', title: 'PlayStation 5 — Bundle', price: 28000, city: 'Kaédi', image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', verified: true },
  { id: '6', slug: 'apartment-3-rooms', title: 'Premium Apartment 3 rooms', price: 850000, city: 'Tevragh-Zeina', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800' },
  { id: '7', slug: 'sony-wh1000xm5', title: 'Sony WH-1000XM5', price: 12000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800' },
  { id: '8', slug: 'designer-watch', title: 'Designer Watch Collection', price: 8500, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800', verified: true },
  { id: '9', slug: 'leather-sofa', title: 'Italian Leather Sofa', price: 65000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800' },
  { id: '10', slug: 'mountain-bike', title: 'Trek Mountain Bike', price: 18000, city: 'Atar', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800' },
  { id: '11', slug: 'gaming-pc', title: 'Custom Gaming PC RTX 4080', price: 85000, city: 'Nouakchott', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800' },
  { id: '12', slug: 'office-desk', title: 'Premium Office Desk', price: 12500, city: 'Nouadhibou', image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800' },
];

export default async function MarketplacePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations('Marketplace');

  return (
    <div className="container py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {sp.q ? `Search: "${sp.q}"` : `${mockProducts.length} products`}
          </p>
        </div>
        <select className="h-10 px-4 rounded-2xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan/40">
          <option>{t('newest')}</option>
          <option>{t('priceLow')}</option>
          <option>{t('priceHigh')}</option>
          <option>{t('popular')}</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <FiltersSidebar />
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
            {mockProducts.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
