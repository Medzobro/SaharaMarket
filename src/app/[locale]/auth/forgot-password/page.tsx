'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { Mail, Loader2, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'ar';
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fd.get('email') }),
      });
      setSent(true);
      toast.success('If the email exists, a reset link has been sent');
    } catch {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="glass-card rounded-3xl p-8 sm:p-10 border-glow">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple to-brand-royal shadow-glow-purple mb-4">
            <KeyRound className="h-6 w-6 text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold">Reset password</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-emerald/20 mb-4">
              <Mail className="h-6 w-6 text-brand-emerald" />
            </div>
            <p className="text-sm text-muted-foreground">
              Check your inbox for further instructions.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="email" type="email" required className="ps-10" placeholder="you@example.com" />
            </div>
            <Button type="submit" disabled={loading} size="lg" className="w-full">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send reset link'}
            </Button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href={`/${locale}/auth/login`} className="text-brand-cyan font-medium hover:underline">
            ← Back to sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
