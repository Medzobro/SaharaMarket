import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default async function AuthErrorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-md text-center">
      <div className="bg-white rounded-2xl border border-brand-border shadow-card p-10">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-brand-ink">خطأ في المصادقة</h1>
        <p className="text-brand-muted mt-2 text-sm">حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.</p>
        <Button asChild className="mt-6">
          <Link href={`/${locale}/auth/login`}>العودة لتسجيل الدخول</Link>
        </Button>
      </div>
    </div>
  );
}
