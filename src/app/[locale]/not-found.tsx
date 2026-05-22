import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-[120px] font-bold leading-none text-brand-yellowDark">404</div>
        <h1 className="text-2xl font-bold text-brand-ink mt-4">الصفحة غير موجودة</h1>
        <p className="text-brand-muted mt-2 max-w-md">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">العودة للرئيسية</Link>
        </Button>
      </div>
    </div>
  );
}
