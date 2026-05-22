import Link from 'next/link';
import { ShoppingBag, Github, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5">
      <div className="container py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-cyan via-brand-royal to-brand-purple p-[1.5px]">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
                <ShoppingBag className="h-4 w-4 text-brand-cyan" />
              </div>
            </div>
            <span className="font-display text-lg font-bold text-gradient">SaharaMarket</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            The premium marketplace for Mauritania. Built with passion in Nouakchott.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Marketplace</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-brand-cyan">Categories</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan">Stores</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan">Trending</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan">New listings</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-brand-cyan">About</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan">Careers</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan">Press</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-brand-cyan">Terms</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan">Privacy</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan">Cookies</Link></li>
            <li><Link href="#" className="hover:text-brand-cyan">Security</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SaharaMarket. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter"><Twitter className="h-4 w-4 hover:text-brand-cyan" /></Link>
            <Link href="#" aria-label="Instagram"><Instagram className="h-4 w-4 hover:text-brand-cyan" /></Link>
            <Link href="#" aria-label="Facebook"><Facebook className="h-4 w-4 hover:text-brand-cyan" /></Link>
            <Link href="#" aria-label="GitHub"><Github className="h-4 w-4 hover:text-brand-cyan" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
