'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { Search, Heart, MessageSquare, Menu, Plus, Bell, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LocaleSwitcher } from './locale-switcher';
import type { Locale } from '@/i18n/config';
import { motion } from 'framer-motion';

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('Nav');
  const tBrand = useTranslations('Brand');
  const { data: session } = useSession();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-brand-border"
    >
      <div className="container flex h-16 items-center gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0">
          <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center shadow-soft">
            <Store className="h-5 w-5 text-brand-yellow" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-bold text-base text-brand-ink">{tBrand('name')}</span>
            <span className="text-[10px] text-brand-muted -mt-0.5">{tBrand('tagline')}</span>
          </div>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
            <input
              type="search"
              placeholder={t('search')}
              className="w-full h-11 ps-10 pe-4 rounded-xl bg-white border border-brand-border text-sm placeholder:text-brand-muted focus:outline-none focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/30 transition-all"
            />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <Link
            href={`/${locale}/marketplace`}
            className="px-3 py-2 rounded-lg text-brand-muted hover:text-brand-ink hover:bg-brand-yellow/10 transition-colors"
          >
            {t('marketplace')}
          </Link>
          <Link
            href={`/${locale}/stores`}
            className="px-3 py-2 rounded-lg text-brand-muted hover:text-brand-ink hover:bg-brand-yellow/10 transition-colors"
          >
            {t('stores')}
          </Link>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <LocaleSwitcher current={locale} />

          {session ? (
            <>
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link href={`/${locale}/sell`}>
                  <Plus className="h-4 w-4" />
                  {t('sell')}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="relative">
                <Link href={`/${locale}/messages`}>
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-brand-red" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
                <Link href={`/${locale}/notifications`}>
                  <Bell className="h-5 w-5" />
                </Link>
              </Button>
              <button
                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                className="ms-1"
                aria-label="Profile"
              >
                <Avatar className="h-9 w-9 ring-2 ring-brand-yellow hover:ring-brand-green transition">
                  <AvatarImage src={session.user.image ?? undefined} />
                  <AvatarFallback>{session.user.name?.[0]?.toUpperCase() ?? 'U'}</AvatarFallback>
                </Avatar>
              </button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/${locale}/auth/login`}>{t('login')}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={`/${locale}/auth/register`}>{t('register')}</Link>
              </Button>
            </>
          )}

          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
