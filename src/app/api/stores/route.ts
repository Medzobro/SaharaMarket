import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { storeSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') ?? undefined;
  const verified = url.searchParams.get('verified') === '1';
  const stores = await prisma.store.findMany({
    where: {
      isActive: true,
      ...(verified ? { isVerified: true } : {}),
      ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
    },
    orderBy: { rating: 'desc' },
    take: 50,
  });
  return NextResponse.json({ stores });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const existing = await prisma.store.findUnique({ where: { ownerId: session.user.id } });
  if (existing) return NextResponse.json({ error: 'Store already exists' }, { status: 409 });

  const body = await req.json();
  const parsed = storeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.flatten() }, { status: 400 });
  }

  const baseSlug = slugify(parsed.data.name).slice(0, 60);
  let slug = baseSlug;
  let n = 0;
  while (await prisma.store.findUnique({ where: { slug } })) {
    n += 1;
    slug = `${baseSlug}-${n}`;
  }

  const store = await prisma.store.create({
    data: {
      ...parsed.data,
      slug,
      ownerId: session.user.id,
    },
  });

  // promote user to seller if needed
  await prisma.user.update({
    where: { id: session.user.id },
    data: { role: 'SELLER' },
  });

  return NextResponse.json({ store }, { status: 201 });
}
