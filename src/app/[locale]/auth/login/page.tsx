'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const t = useTranslations('Auth');
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
      toast.error('Invalid email or password');
      return;
    }
    toast.success('Welcome back!');
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
      <div className="glass-card rounded-3xl p-8 sm:p-10 border-glow">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan via-brand-royal to-brand-purple shadow-glow mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold">{t('loginTitle')}</h1>
          <p className="text-muted-foreground mt-2 text-sm">{t('loginSubtitle')}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{t('email')}</label>
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="email" type="email" required className="ps-10" placeholder="you@example.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground">{t('password')}</label>
              <Link href={`/${locale}/auth/forgot-password`} className="text-xs text-brand-cyan hover:underline">
                {t('forgotPassword')}
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="password" type="password" required className="ps-10" placeholder="••••••••" />
            </div>
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('loginBtn')}
            {!loading && <ArrowRight className="h-4 w-4 rtl:rotate-180" />}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-muted-foreground">{t('or')}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="space-y-2">
          <Button variant="outline" size="lg" className="w-full" onClick={() => oauth('google')} disabled={oauthLoading !== null}>
            {oauthLoading === 'google' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            {t('google')}
          </Button>
          <Button variant="outline" size="lg" className="w-full" onClick={() => oauth('facebook')} disabled={oauthLoading !== null}>
            {oauthLoading === 'facebook' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FacebookIcon />
            )}
            {t('facebook')}
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t('noAccount')}{' '}
          <Link href={`/${locale}/auth/register`} className="text-brand-cyan font-medium hover:underline">
            {t('registerBtn')}
          </Link>
        </p>
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
