import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  MessageSquare,
  Flag,
  TrendingUp,
  Settings,
} from 'lucide-react';

const nav = [
  { href: '', label: 'لوحة التحكم', icon: LayoutDashboard },
  { href: '/users', label: 'المستخدمون', icon: Users },
  { href: '/stores', label: 'المتاجر', icon: Store },
  { href: '/products', label: 'المنتجات', icon: Package },
  { href: '/messages', label: 'الرسائل', icon: MessageSquare },
  { href: '/reports', label: 'البلاغات', icon: Flag },
  { href: '/analytics', label: 'الإحصائيات', icon: TrendingUp },
  { href: '/settings', label: 'الإعدادات', icon: Settings },
];

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) redirect(`/${locale}/auth/login?callbackUrl=/${locale}/admin`);
  if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
    redirect(`/${locale}`);
  }

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
          <div className="rounded-2xl bg-white border border-brand-border shadow-soft p-4">
            <div className="flex items-center gap-2.5 px-2 py-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center">
                <Store className="h-5 w-5 text-brand-yellow" />
              </div>
              <div>
                <div className="font-bold text-sm text-brand-ink">لوحة الإدارة</div>
                <div className="text-[10px] text-brand-muted">سوق موريتانيا</div>
              </div>
            </div>
            <nav className="space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}/admin${item.href}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-brand-ink hover:bg-brand-yellow/10 hover:text-brand-yellowDark transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
