import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const since = new Date();
  since.setDate(since.getDate() - 7);

  const [totalUsers, newUsers, totalProducts, newProducts, totalStores, totalMessages] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { createdAt: { gte: since } } }),
      prisma.product.count(),
      prisma.product.count({ where: { createdAt: { gte: since } } }),
      prisma.store.count(),
      prisma.message.count(),
    ]);

  return NextResponse.json({
    totalUsers,
    newUsers,
    totalProducts,
    newProducts,
    totalStores,
    totalMessages,
  });
}
