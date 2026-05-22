import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default async function AuthErrorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <div className="w-full max-w-md text-center">
      <div className="glass-card rounded-3xl p-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/20 mb-4">
          <AlertTriangle className="h-6 w-6 text-destructive" />
        </div>
        <h1 className="font-display text-2xl font-bold">Authentication error</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Something went wrong while signing you in. Please try again.
        </p>
        <Button asChild className="mt-6">
          <Link href={`/${locale}/auth/login`}>Back to sign in</Link>
        </Button>
      </div>
    </div>
  );
}
