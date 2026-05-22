import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Store, Github, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Brand');
  return (
    <footer className="mt-32 bg-white border-t border-brand-border">
      <div className="container py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center">
              <Store className="h-5 w-5 text-brand-yellow" />
            </div>
            <span className="font-bold text-lg text-brand-ink">{t('name')}</span>
          </div>
          <p className="text-sm text-brand-muted max-w-xs leading-relaxed">{t('tagline')}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">السوق</h4>
          <ul className="space-y-2 text-sm text-brand-muted">
            <li><Link href="#" className="hover:text-brand-yellowDark">التصنيفات</Link></li>
            <li><Link href="#" className="hover:text-brand-yellowDark">المتاجر</Link></li>
            <li><Link href="#" className="hover:text-brand-yellowDark">الترند</Link></li>
            <li><Link href="#" className="hover:text-brand-yellowDark">إعلانات جديدة</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">الشركة</h4>
          <ul className="space-y-2 text-sm text-brand-muted">
            <li><Link href="#" className="hover:text-brand-yellowDark">من نحن</Link></li>
            <li><Link href="#" className="hover:text-brand-yellowDark">الوظائف</Link></li>
            <li><Link href="#" className="hover:text-brand-yellowDark">المدونة</Link></li>
            <li><Link href="#" className="hover:text-brand-yellowDark">اتصل بنا</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">قانوني</h4>
          <ul className="space-y-2 text-sm text-brand-muted">
            <li><Link href="#" className="hover:text-brand-yellowDark">الشروط</Link></li>
            <li><Link href="#" className="hover:text-brand-yellowDark">الخصوصية</Link></li>
            <li><Link href="#" className="hover:text-brand-yellowDark">الكوكيز</Link></li>
            <li><Link href="#" className="hover:text-brand-yellowDark">الأمان</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>© {new Date().getFullYear()} {t('name')}. كل الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter"><Twitter className="h-4 w-4 hover:text-brand-yellowDark" /></Link>
            <Link href="#" aria-label="Instagram"><Instagram className="h-4 w-4 hover:text-brand-yellowDark" /></Link>
            <Link href="#" aria-label="Facebook"><Facebook className="h-4 w-4 hover:text-brand-yellowDark" /></Link>
            <Link href="#" aria-label="GitHub"><Github className="h-4 w-4 hover:text-brand-yellowDark" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
