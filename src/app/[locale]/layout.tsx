import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Plus_Jakarta_Sans, Cairo } from 'next/font/google';
import { locales, rtlLocales, type Locale } from '@/i18n/config';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});
const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-dynamic';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = rtlLocales.includes(locale as Locale);

  return (
    <html
      lang={locale}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${jakarta.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header locale={locale as Locale} />
            <main className="relative">{children}</main>
            <Footer />
            <Toaster
              position={isRtl ? 'top-left' : 'top-right'}
              richColors
              closeButton
            />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
