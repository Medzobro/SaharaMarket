'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, Store, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Role = 'USER' | 'SELLER';

export default function RegisterPage() {
  const t = useTranslations('Auth');
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
      confirmPassword: fd.get('confirmPassword'),
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
        toast.error(data.error ?? 'Registration failed');
        setLoading(false);
        return;
      }

      // Auto sign-in
      await signIn('credentials', {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });
      toast.success('Account created!');
      router.push(`/${locale}`);
      router.refresh();
    } catch {
      toast.error('Network error');
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
      <div className="glass-card rounded-3xl p-8 sm:p-10 border-glow">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-emerald via-brand-cyan to-brand-royal shadow-glow mb-4">
            <UserIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold">{t('registerTitle')}</h1>
          <p className="text-muted-foreground mt-2 text-sm">{t('registerSubtitle')}</p>
        </div>

        {/* Role picker */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-2xl bg-white/5 border border-white/10">
          {(['USER', 'SELLER'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={cn(
                'flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all',
                role === r
                  ? 'bg-gradient-to-r from-brand-royal to-brand-purple text-white shadow-glow'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {r === 'USER' ? <ShoppingBag className="h-4 w-4" /> : <Store className="h-4 w-4" />}
              {r === 'USER' ? t('buyerRole') : t('sellerRole')}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{t('username')}</label>
            <div className="relative">
              <UserIcon className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="username" required minLength={3} className="ps-10" placeholder="username" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{t('email')}</label>
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="email" type="email" required className="ps-10" placeholder="you@example.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{t('password')}</label>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="password" type="password" required minLength={8} className="ps-10" placeholder="At least 8 characters" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">{t('confirmPassword')}</label>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="confirmPassword" type="password" required minLength={8} className="ps-10" placeholder="••••••••" />
            </div>
          </div>

          <Button type="submit" disabled={loading} size="lg" className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('registerBtn')}
            {!loading && <ArrowRight className="h-4 w-4 rtl:rotate-180" />}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t('hasAccount')}{' '}
          <Link href={`/${locale}/auth/login`} className="text-brand-cyan font-medium hover:underline">
            {t('loginBtn')}
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
