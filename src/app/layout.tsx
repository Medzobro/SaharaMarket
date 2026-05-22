import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'سوق موريتانيا — Souq Mauritania',
    template: '%s · سوق موريتانيا',
  },
  description:
    'منصة التسوق الأولى في موريتانيا. آلاف المنتجات، متاجر موثقة، دردشة فورية.',
  keywords: ['Mauritania', 'marketplace', 'Nouakchott', 'سوق موريتانيا', 'صحراء ماركت'],
  openGraph: {
    title: 'سوق موريتانيا',
    description: 'منصة التسوق الأولى في موريتانيا',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#FFCC00',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
