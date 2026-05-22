import Image from 'next/image';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { BadgeCheck, Star } from 'lucide-react';

const stores = [
  { slug: 'sahara-electronics', name: 'Sahara Electronics', city: 'Nouakchott', rating: 4.9, products: 320, cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200', verified: true },
  { slug: 'mauritania-motors', name: 'Mauritania Motors', city: 'Nouadhibou', rating: 4.8, products: 87, cover: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800', logo: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200', verified: true },
  { slug: 'desert-fashion', name: 'Desert Fashion', city: 'Nouakchott', rating: 4.7, products: 540, cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800', logo: 'https://images.unsplash.com/photo-1485518882345-15568b007407?w=200', verified: true },
  { slug: 'home-design', name: 'Home Design Mauritanie', city: 'Rosso', rating: 4.6, products: 210, cover: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', logo: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200', verified: false },
  { slug: 'tech-zone', name: 'Tech Zone Nouakchott', city: 'Nouakchott', rating: 4.5, products: 178, cover: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200', verified: true },
  { slug: 'atar-traditional', name: 'Atar Traditional', city: 'Atar', rating: 4.9, products: 95, cover: 'https://images.unsplash.com/photo-1528732263440-039bccdf9eb9?w=800', logo: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=200', verified: false },
];

export default async function StoresIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container py-10">
      <h1 className="font-display text-4xl font-bold mb-2">Stores</h1>
      <p className="text-muted-foreground mb-8">Discover verified Mauritanian sellers</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((s) => (
          <Link
            key={s.slug}
            href={`/${locale}/stores/${s.slug}`}
            className="group block rounded-3xl overflow-hidden glass-card hover:border-brand-cyan/40 transition-all"
          >
            <div className="relative aspect-[16/9]">
              <Image src={s.cover} alt={s.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            </div>
            <div className="px-5 pb-5 -mt-10 relative">
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
                {s.verified && <BadgeCheck className="h-4 w-4 text-brand-cyan" />}
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>{s.city}</span>
                <span>{s.products} products</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
