import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validations';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit(`register:${ip}`, 5, 60_000);
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { username, email, password, role } = parsed.data;

    const exists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (exists) {
      return NextResponse.json(
        { error: exists.email === email ? 'Email already in use' : 'Username taken' },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { username, email, password: hash, role },
      select: { id: true, username: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error('[register]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
