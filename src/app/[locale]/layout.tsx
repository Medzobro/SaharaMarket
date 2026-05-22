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
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-arabic', display: 'swap' });

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
      className={`${inter.variable} ${jakarta.variable} ${cairo.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {/* Background ornaments */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[1100px] rounded-full bg-brand-purple/15 blur-[140px]" />
              <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-brand-cyan/10 blur-[120px]" />
              <div className="absolute inset-0 grid-bg opacity-30" />
            </div>

            <Header locale={locale as Locale} />
            <main className="relative">{children}</main>
            <Footer />
            <Toaster
              theme="dark"
              position={isRtl ? 'top-left' : 'top-right'}
              toastOptions={{
                className:
                  'bg-card/80 backdrop-blur-xl border border-white/10 text-foreground',
              }}
            />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
