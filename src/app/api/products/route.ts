import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { productSchema } from '@/lib/validations';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { slugify } from '@/lib/utils';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') ?? undefined;
  const category = url.searchParams.get('category') ?? undefined;
  const city = url.searchParams.get('city') ?? undefined;
  const minPrice = url.searchParams.get('minPrice');
  const maxPrice = url.searchParams.get('maxPrice');
  const sort = url.searchParams.get('sort') ?? 'newest';
  const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
  const perPage = Math.min(48, Number(url.searchParams.get('perPage') ?? 20));

  const where: Record<string, unknown> = { status: 'ACTIVE' };
  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } },
    ];
  }
  if (category) where.category = { slug: category };
  if (city) where.city = city;
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) (where.price as Record<string, unknown>).gte = Number(minPrice);
    if (maxPrice) (where.price as Record<string, unknown>).lte = Number(maxPrice);
  }

  const orderBy =
    sort === 'price_asc'
      ? { price: 'asc' as const }
      : sort === 'price_desc'
        ? { price: 'desc' as const }
        : sort === 'popular'
          ? { views: 'desc' as const }
          : { createdAt: 'desc' as const };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        seller: { select: { id: true, username: true, avatar: true } },
        store: { select: { id: true, slug: true, name: true, isVerified: true } },
      },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, perPage });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ip = getClientIp(req);
  const rl = rateLimit(`product:create:${session.user.id}:${ip}`, 10, 60_000);
  if (!rl.success) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const baseSlug = slugify(data.title).slice(0, 80);
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  const store = await prisma.store.findUnique({ where: { ownerId: session.user.id } });

  const product = await prisma.product.create({
    data: {
      ...data,
      slug,
      sellerId: session.user.id,
      storeId: store?.id ?? null,
      price: data.price,
    },
  });
  return NextResponse.json({ product }, { status: 201 });
}
