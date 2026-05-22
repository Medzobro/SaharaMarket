import { Users, Package, Store, MessageSquare } from 'lucide-react';
import { StatCard } from '@/components/admin/stat-card';
import { GrowthChart } from '@/components/admin/growth-chart';
import { Badge } from '@/components/ui/badge';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const [users, products, stores, messages] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.store.count(),
      prisma.message.count(),
    ]);
    return { users, products, stores, messages };
  } catch {
    return { users: 12480, products: 38201, stores: 2104, messages: 158930 };
  }
}

export default async function AdminDashboardPage() {
  const s = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-ink">لوحة التحكم</h1>
        <p className="text-brand-muted text-sm mt-1">أهلاً بعودتك، إليك ملخص اليوم.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="إجمالي المستخدمين" value={s.users.toLocaleString()} delta={12} icon={Users} color="yellow" />
        <StatCard label="المنتجات" value={s.products.toLocaleString()} delta={8} icon={Package} color="green" />
        <StatCard label="المتاجر" value={s.stores.toLocaleString()} delta={5} icon={Store} color="live" />
        <StatCard label="الرسائل" value={s.messages.toLocaleString()} delta={-2} icon={MessageSquare} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <GrowthChart />
        </div>
        <div className="rounded-2xl bg-white border border-brand-border shadow-soft p-5">
          <h3 className="font-bold text-brand-ink mb-4">النشاط الأخير</h3>
          <ul className="space-y-3 text-sm">
            {[
              { who: 'عائشة م.', what: 'أنشأت إعلاناً جديداً', when: 'منذ دقيقتين' },
              { who: 'محمد ولد', what: 'وثّق متجره', when: 'منذ 14 دقيقة' },
              { who: 'فاطمة ب.', what: 'أبلغت عن منتج', when: 'منذ ساعة' },
              { who: 'أحمد س.', what: 'انضم إلى المنصة', when: 'منذ 3 ساعات' },
              { who: 'صحراء إلكترونيات', what: 'فتحت متجراً جديداً', when: 'منذ 5 ساعات' },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-brand-yellow text-brand-ink flex items-center justify-center text-xs font-bold shrink-0">
                  {a.who[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate">
                    <span className="font-bold text-brand-ink">{a.who}</span>{' '}
                    <span className="text-brand-muted">{a.what}</span>
                  </p>
                  <span className="text-[10px] text-brand-muted">{a.when}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* "إدارة متجري" style table — matches Flutter mockup */}
      <div className="rounded-2xl bg-white border border-brand-border shadow-soft overflow-hidden">
        <div className="p-5 border-b border-brand-border flex items-center justify-between">
          <h3 className="font-bold text-brand-ink">أحدث المنتجات</h3>
          <Badge variant="outline">آخر 24 ساعة</Badge>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-brand-bg text-xs uppercase tracking-wider text-brand-muted">
            <tr>
              <th className="text-start px-5 py-3 font-semibold">المنتج</th>
              <th className="text-start px-5 py-3 font-semibold">البائع</th>
              <th className="text-start px-5 py-3 font-semibold">المدينة</th>
              <th className="text-start px-5 py-3 font-semibold">السعر</th>
              <th className="text-start px-5 py-3 font-semibold">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'سيارة بي إم دبليو الفئة الخامسة', seller: 'mauritania_motors', city: 'نواكشوط', price: '3,300,000', status: 'live' as const, statusText: 'نشط (Live)' },
              { name: 'سيارة مرسيدس C200', seller: 'mauritania_motors', city: 'نواكشوط', price: '2,850,000', status: 'draft' as const, statusText: 'مسودة (Draft)' },
              { name: 'آيفون 15 برو ماكس', seller: 'sahara_electronics', city: 'نواكشوط', price: '95,000', status: 'live' as const, statusText: 'نشط' },
              { name: 'ماك بوك برو M3', seller: 'tech_zone', city: 'نواكشوط', price: '78,000', status: 'live' as const, statusText: 'نشط' },
            ].map((row, i) => (
              <tr key={i} className="border-t border-brand-border hover:bg-brand-yellow/5">
                <td className="px-5 py-3 font-semibold text-brand-ink">{row.name}</td>
                <td className="px-5 py-3 text-brand-muted">@{row.seller}</td>
                <td className="px-5 py-3 text-brand-muted">{row.city}</td>
                <td className="px-5 py-3 font-bold text-brand-live">{row.price} MRU</td>
                <td className="px-5 py-3">
                  <Badge variant={row.status}>{row.statusText}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
