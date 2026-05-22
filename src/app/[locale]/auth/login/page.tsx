'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Mail, Lock, Loader2, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const t = useTranslations('Auth');
  const tBrand = useTranslations('Brand');
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) ?? 'ar';
  const callbackUrl = searchParams.get('callbackUrl') ?? `/${locale}`;

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await signIn('credentials', {
      email: fd.get('email'),
      password: fd.get('password'),
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      toast.error('بيانات الدخول غير صحيحة');
      return;
    }
    toast.success('أهلاً بك من جديد!');
    router.push(callbackUrl);
    router.refresh();
  }

  async function oauth(provider: 'google' | 'facebook') {
    setOauthLoading(provider);
    await signIn(provider, { callbackUrl });
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
          <Link
            href={`/${locale}/auth/register`}
            className="pb-2 px-2 text-base font-medium text-brand-muted hover:text-brand-ink transition-colors"
          >
            {t('registerBtn')}
          </Link>
          <button
            type="button"
            className={cn(
              'pb-2 px-2 text-base font-bold transition-colors relative',
              'text-brand-yellowDark'
            )}
          >
            {t('loginBtn')}
            <span className="absolute bottom-0 inset-x-0 h-[3px] bg-brand-yellow rounded-full" />
          </button>
        </div>
        <div className="border-b border-brand-border mb-6" />

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
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
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-brand-ink">{t('password')}</label>
              <Link
                href={`/${locale}/auth/forgot-password`}
                className="text-xs text-brand-yellowDark hover:underline"
              >
                {t('forgotPassword')}
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
              <Input name="password" type="password" required className="ps-11" placeholder="••••••••" />
            </div>
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full h-14 text-base">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('loginBtn')}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-brand-border" />
          <span className="text-xs text-brand-muted">{t('or')}</span>
          <div className="flex-1 h-px bg-brand-border" />
        </div>

        <div className="space-y-2">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => oauth('google')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'google' ? <Loader2 className="h-4 w-4 animate-spin" /> : <GoogleIcon />}
            {t('google')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => oauth('facebook')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'facebook' ? <Loader2 className="h-4 w-4 animate-spin" /> : <FacebookIcon />}
            {t('facebook')}
          </Button>
        </div>

        <button
          onClick={() => router.push(`/${locale}`)}
          className="mt-6 w-full text-center text-sm text-brand-muted hover:text-brand-ink underline underline-offset-4"
        >
          تسجيل الدخول كضيف
        </button>
      </div>
    </motion.div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
