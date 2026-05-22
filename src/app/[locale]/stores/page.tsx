import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { BadgeCheck, Star } from 'lucide-react';

const stores = [
  { slug: 'sahara-electronics', name: 'صحراء إلكترونيات', city: 'نواكشوط', rating: 4.9, products: 320, cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200', verified: true },
  { slug: 'mauritania-motors', name: 'موريتانيا موتورز', city: 'نواذيبو', rating: 4.8, products: 87, cover: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800', logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200', verified: true },
  { slug: 'desert-fashion', name: 'بيت أزياء الصحراء', city: 'نواكشوط', rating: 4.7, products: 540, cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', logo: 'https://images.unsplash.com/photo-1485518882345-15568b007407?w=200', verified: true },
  { slug: 'home-design', name: 'بيت التصميم', city: 'روصو', rating: 4.6, products: 210, cover: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', logo: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200', verified: false },
  { slug: 'tech-zone', name: 'منطقة التقنية', city: 'نواكشوط', rating: 4.5, products: 178, cover: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200', verified: true },
  { slug: 'atar-traditional', name: 'أطار للتراث', city: 'أطار', rating: 4.9, products: 95, cover: 'https://images.unsplash.com/photo-1528732263440-039bccdf9eb9?w=800', logo: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=200', verified: false },
];

export default async function StoresIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-brand-ink mb-2">المتاجر</h1>
      <p className="text-sm text-brand-muted mb-6">اكتشف البائعين الموثقين</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stores.map((s) => (
          <Link
            key={s.slug}
            href={`/${locale}/stores/${s.slug}`}
            className="group block rounded-2xl bg-white border border-brand-border shadow-soft hover:shadow-card-hover hover:border-brand-yellow/50 transition-all overflow-hidden"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={s.cover}
                alt={s.name}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
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
        ))}
      </div>
    </div>
  );
}
