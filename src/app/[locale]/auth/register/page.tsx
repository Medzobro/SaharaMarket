'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { User as UserIcon, Phone, Loader2, Mail, Lock, Store, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Role = 'USER' | 'SELLER';

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const tBrand = useTranslations('Brand');
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) ?? 'ar';
  const initialRole = (searchParams.get('role') as Role) ?? 'USER';

  const [role, setRole] = useState<Role>(initialRole);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      username: fd.get('username'),
      email: fd.get('email'),
      password: fd.get('password'),
      confirmPassword: fd.get('password'), // single password field for simplicity
      role,
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? 'فشل التسجيل');
        setLoading(false);
        return;
      }

      await signIn('credentials', {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });
      toast.success('تم إنشاء الحساب بنجاح!');
      router.push(`/${locale}`);
      router.refresh();
    } catch {
      toast.error('خطأ في الشبكة');
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="bg-white rounded-2xl border border-brand-border shadow-card p-8 sm:p-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-24 w-24 rounded-full bg-brand-green flex items-center justify-center shadow-soft">
            <Store className="h-12 w-12 text-brand-yellow" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-brand-ink mt-3">{tBrand('name')}</h1>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-around mb-2 mt-6">
          <button
            type="button"
            className={cn(
              'pb-2 px-2 text-base font-bold transition-colors relative',
              'text-brand-yellowDark'
            )}
          >
            {t('registerBtn')}
            <span className="absolute bottom-0 inset-x-0 h-[3px] bg-brand-yellow rounded-full" />
          </button>
          <Link
            href={`/${locale}/auth/login`}
            className="pb-2 px-2 text-base font-medium text-brand-muted hover:text-brand-ink transition-colors"
          >
            {t('loginBtn')}
          </Link>
        </div>
        <div className="border-b border-brand-border mb-6" />

        {/* Role picker */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-xl bg-brand-bg">
          {(['USER', 'SELLER'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                'rounded-lg py-2 text-sm font-semibold transition-all',
                role === r
                  ? 'bg-brand-yellow text-brand-ink shadow-soft'
                  : 'text-brand-muted hover:text-brand-ink'
              )}
            >
              {r === 'USER' ? t('buyerRole') : t('sellerRole')}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-brand-ink block mb-2">
              {t('username')}
            </label>
            <div className="relative">
              <UserIcon className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
              <Input name="username" required minLength={3} className="ps-11" placeholder="أدخل اسم المستخدم" />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-brand-ink block mb-2">
              {t('email')}
            </label>
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
              <Input name="email" type="email" required className="ps-11" placeholder="example@mail.com" />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-brand-ink block mb-2">رقم الهاتف</label>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-1 px-3 h-12 rounded-xl bg-white border border-brand-border text-sm shrink-0"
              >
                <span>🇲🇷</span>
                <span className="font-semibold text-brand-ink">MRU</span>
                <ChevronDown className="h-4 w-4 text-brand-muted" />
              </button>
              <div className="relative flex-1">
                <Phone className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
                <Input name="phone" type="tel" className="ps-11" placeholder="رقم الهاتف" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-brand-ink block mb-2">
              {t('password')}
            </label>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
              <Input name="password" type="password" required minLength={8} className="ps-11" placeholder="8 أحرف على الأقل" />
            </div>
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full h-14 text-base">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('registerBtn')}
          </Button>
        </form>

        <button
          onClick={() => router.push(`/${locale}`)}
          className="mt-5 w-full text-center text-sm text-brand-muted hover:text-brand-ink underline underline-offset-4"
        >
          تسجيل الدخول كضيف
        </button>
      </div>
    </motion.div>
  );
}
