import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'SaharaMarket — Mauritania premium marketplace',
    template: '%s · SaharaMarket',
  },
  description:
    'Discover, shop and connect on Mauritania\'s most beautiful marketplace. Thousands of products, verified stores, real-time chat.',
  keywords: ['Mauritania', 'marketplace', 'Nouakchott', 'shopping', 'صحراء ماركت'],
  openGraph: {
    title: 'SaharaMarket',
    description: 'The premium marketplace for Mauritania',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#0B0F19',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
