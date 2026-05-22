'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { Search, Heart, MessageSquare, Menu, ShoppingBag, Plus } from 'lucide-react';
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
      className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center gap-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0">
          <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-brand-cyan via-brand-royal to-brand-purple p-[1.5px] shadow-glow">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
              <ShoppingBag className="h-4 w-4 text-brand-cyan" />
            </div>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-base font-bold text-gradient">
              {tBrand('name')}
            </span>
            <span className="text-[10px] text-muted-foreground -mt-0.5">
              {tBrand('tagline')}
            </span>
          </div>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full group">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder={t('search')}
              className="w-full h-10 ps-10 pe-4 rounded-2xl bg-white/5 border border-white/10 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-brand-cyan/40 focus:bg-white/[0.07] transition-all"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity ring-2 ring-brand-cyan/20 ring-offset-0" />
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          <Link
            href={`/${locale}/marketplace`}
            className="px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            {t('marketplace')}
          </Link>
          <Link
            href={`/${locale}/stores`}
            className="px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          >
            {t('stores')}
          </Link>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <LocaleSwitcher current={locale} />

          {session ? (
            <>
              <Button asChild variant="cyber" size="sm" className="hidden sm:inline-flex">
                <Link href={`/${locale}/sell`}>
                  <Plus className="h-4 w-4" />
                  {t('sell')}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href={`/${locale}/messages`}>
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
                <Link href={`/${locale}/favorites`}>
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
              <button
                onClick={() => signOut({ callbackUrl: `/${locale}` })}
                className="ms-1"
                aria-label="Profile"
              >
                <Avatar className="h-9 w-9 ring-2 ring-brand-cyan/30 hover:ring-brand-cyan/60 transition">
                  <AvatarImage src={session.user.image ?? undefined} />
                  <AvatarFallback>
                    {session.user.name?.[0]?.toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
              </button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/${locale}/auth/login`}>{t('login')}</Link>
              </Button>
              <Button asChild size="sm" variant="cyber">
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
