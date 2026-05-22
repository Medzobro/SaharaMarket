import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { forgotPasswordSchema } from '@/lib/validations';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit(`forgot:${ip}`, 5, 5 * 60_000);
  if (!rl.success) return NextResponse.json({ ok: true });

  try {
    const body = await req.json();
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ ok: true });

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h
      await prisma.passwordReset.create({ data: { userId: user.id, token, expires } });
      // TODO: send email with link `${APP_URL}/auth/reset-password?token=${token}`
      console.log('[forgot-password] reset link:', token);
    }
    // Always 200 to avoid email enumeration
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
