import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Camera } from 'lucide-react';

export default async function SellPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) redirect(`/${locale}/auth/login?callbackUrl=/${locale}/sell`);

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-brand-ink mb-1">إعلان منتج جديد</h1>
      <p className="text-sm text-brand-muted mb-6">
        أكمل البيانات. الإعلانات الجيدة تباع أسرع.
      </p>

      <form
        className="space-y-5 rounded-2xl bg-white border border-brand-border shadow-soft p-6 sm:p-8"
        action="/api/products"
        method="post"
      >
        <div>
          <label className="text-sm font-bold text-brand-ink block mb-2">العنوان</label>
          <Input name="title" required placeholder="مثال: آيفون 15 برو ماكس — 256 GB" />
        </div>
        <div>
          <label className="text-sm font-bold text-brand-ink block mb-2">الوصف</label>
          <textarea
            name="description"
            required
            rows={5}
            placeholder="اكتب وصفاً تفصيلياً للمنتج..."
            className="w-full rounded-xl bg-white border border-brand-border p-3 text-sm focus:outline-none focus:border-brand-yellow"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-brand-ink block mb-2">السعر (MRU)</label>
            <Input name="price" type="number" required min={1} />
          </div>
          <div>
            <label className="text-sm font-bold text-brand-ink block mb-2">المدينة</label>
            <Input name="city" required placeholder="نواكشوط" />
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-brand-ink block mb-2">الصور</label>
          <div className="border-2 border-dashed border-brand-border rounded-xl p-8 text-center hover:border-brand-yellow transition-colors cursor-pointer">
            <Camera className="h-8 w-8 text-brand-muted mx-auto mb-2" />
            <p className="text-sm text-brand-muted">اسحب الصور هنا أو اضغط لاختيارها</p>
            <p className="text-xs text-brand-muted mt-1">حتى 10 صور (JPG, PNG)</p>
          </div>
        </div>
        <Button size="lg" className="w-full h-14" type="submit">
          <Plus className="h-4 w-4" /> نشر الإعلان
        </Button>
      </form>
    </div>
  );
}
