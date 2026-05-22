import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="font-display text-[120px] font-bold leading-none text-gradient">404</div>
        <h1 className="font-display text-2xl font-bold mt-4">Page not found</h1>
        <p className="text-muted-foreground mt-2 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
