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
      toast.success('إذا كان البريد موجوداً، تم إرسال رابط الاستعادة');
    } catch {
      toast.error('خطأ في الشبكة');
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
      <div className="bg-white rounded-2xl border border-brand-border shadow-card p-8 sm:p-10">
        <div className="flex flex-col items-center mb-6">
          <div className="h-20 w-20 rounded-full bg-brand-green flex items-center justify-center shadow-soft">
            <KeyRound className="h-10 w-10 text-brand-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-brand-ink mt-3">استعادة كلمة المرور</h1>
          <p className="text-sm text-brand-muted mt-1 text-center">
            أدخل بريدك وسنرسل لك رابط إعادة التعيين
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-live/10 mb-3">
              <Mail className="h-7 w-7 text-brand-live" />
            </div>
            <p className="text-sm text-brand-muted">تحقق من صندوق الوارد</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-brand-ink block mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-muted" />
                <Input name="email" type="email" required className="ps-11" placeholder="example@mail.com" />
              </div>
            </div>
            <Button type="submit" disabled={loading} size="lg" className="w-full h-14 text-base">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'إرسال الرابط'}
            </Button>
          </form>
        )}

        <Link
          href={`/${locale}/auth/login`}
          className="mt-6 block text-center text-sm text-brand-yellowDark hover:underline"
        >
          ← العودة لتسجيل الدخول
        </Link>
      </div>
    </motion.div>
  );
}
