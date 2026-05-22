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
  ShoppingBag,
} from 'lucide-react';

const nav = [
  { href: '', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/users', label: 'Users', icon: Users },
  { href: '/stores', label: 'Stores', icon: Store },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/reports', label: 'Reports', icon: Flag },
  { href: '/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/settings', label: 'Settings', icon: Settings },
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
          <div className="glass-card rounded-3xl p-4">
            <div className="flex items-center gap-2.5 px-2 py-2 mb-4">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center shadow-glow">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-sm">Admin</div>
                <div className="text-[10px] text-muted-foreground">SaharaMarket</div>
              </div>
            </div>
            <nav className="space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}/admin${item.href}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
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
