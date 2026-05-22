import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

export default async function SellPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) redirect(`/${locale}/auth/login?callbackUrl=/${locale}/sell`);

  return (
    <div className="container py-12 max-w-2xl">
      <h1 className="font-display text-4xl font-bold mb-2">List a new product</h1>
      <p className="text-muted-foreground mb-8 text-sm">
        Fill in the details. Quality listings sell faster.
      </p>

      <form className="space-y-5 glass-card rounded-3xl p-6 sm:p-8" action="/api/products" method="post">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Title</label>
          <Input name="title" required placeholder="e.g. iPhone 15 Pro Max — 256 GB" className="mt-1.5" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Description</label>
          <textarea
            name="description"
            required
            rows={5}
            placeholder="Describe your product…"
            className="mt-1.5 w-full rounded-2xl bg-white/5 border border-white/10 p-3 text-sm focus:outline-none focus:border-brand-cyan/40"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Price (MRU)</label>
            <Input name="price" type="number" required min={1} className="mt-1.5" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">City</label>
            <Input name="city" required placeholder="Nouakchott" className="mt-1.5" />
          </div>
        </div>
        <Button size="lg" className="w-full" type="submit">
          <Plus className="h-4 w-4" /> Publish listing
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Image upload &amp; category picker coming next — wire to Cloudinary or UploadThing.
        </p>
      </form>
    </div>
  );
}
