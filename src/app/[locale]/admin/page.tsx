import { Users, Package, Store, MessageSquare } from 'lucide-react';
import { StatCard } from '@/components/admin/stat-card';
import { GrowthChart } from '@/components/admin/growth-chart';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getStats() {
  // In production: pull from prisma. For now use safe-defaults.
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
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total users" value={s.users.toLocaleString()} delta={12} icon={Users} color="cyan" />
        <StatCard label="Products" value={s.products.toLocaleString()} delta={8} icon={Package} color="purple" />
        <StatCard label="Stores" value={s.stores.toLocaleString()} delta={5} icon={Store} color="emerald" />
        <StatCard label="Messages" value={s.messages.toLocaleString()} delta={-2} icon={MessageSquare} color="royal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GrowthChart />
        </div>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display font-semibold mb-4">Recent activity</h3>
          <ul className="space-y-3 text-sm">
            {[
              { who: 'Aïcha M.', what: 'created a new listing', when: '2m' },
              { who: 'Mohamed Ould', what: 'verified their store', when: '14m' },
              { who: 'Fatima B.', what: 'reported a product', when: '1h' },
              { who: 'Ahmed S.', what: 'joined the platform', when: '3h' },
              { who: 'Sahara Electronics', what: 'opened a new shop', when: '5h' },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center text-xs font-semibold shrink-0">
                  {a.who[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate">
                    <span className="font-medium">{a.who}</span>{' '}
                    <span className="text-muted-foreground">{a.what}</span>
                  </p>
                  <span className="text-[10px] text-muted-foreground">{a.when} ago</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h3 className="font-display font-semibold">Latest products</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="text-start px-6 py-3">Title</th>
              <th className="text-start px-6 py-3">Seller</th>
              <th className="text-start px-6 py-3">City</th>
              <th className="text-start px-6 py-3">Price</th>
              <th className="text-start px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['iPhone 15 Pro Max', 'sahara_electronics', 'Nouakchott', '95,000 MRU', 'Active'],
              ['Toyota Land Cruiser', 'mauritania_motors', 'Nouadhibou', '4,200,000 MRU', 'Active'],
              ['MacBook Pro M3', 'tech_zone', 'Nouakchott', '78,000 MRU', 'Pending'],
              ['Sofa Italia', 'home_design', 'Rosso', '65,000 MRU', 'Active'],
            ].map((row, i) => (
              <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="px-6 py-3 font-medium">{row[0]}</td>
                <td className="px-6 py-3 text-muted-foreground">@{row[1]}</td>
                <td className="px-6 py-3 text-muted-foreground">{row[2]}</td>
                <td className="px-6 py-3 font-semibold text-brand-emerald">{row[3]}</td>
                <td className="px-6 py-3">
                  <span
                    className={
                      row[4] === 'Active'
                        ? 'inline-flex px-2 py-0.5 text-xs rounded-full bg-brand-emerald/15 text-brand-emerald'
                        : 'inline-flex px-2 py-0.5 text-xs rounded-full bg-amber-500/15 text-amber-400'
                    }
                  >
                    {row[4]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
