import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/landing/hero';
import { Categories } from '@/components/landing/categories';
import { TrendingProducts } from '@/components/landing/trending-products';
import { FeaturedStores } from '@/components/landing/featured-stores';
import { CtaBox } from '@/components/landing/cta-box';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <Categories locale={locale} />
      <TrendingProducts locale={locale} />
      <FeaturedStores locale={locale} />
      <CtaBox locale={locale} />
    </>
  );
}
