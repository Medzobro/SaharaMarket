import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { messageSchema } from '@/lib/validations';

/**
 * Send a message. If `conversationId` is omitted but `recipientId` is set,
 * an existing direct conversation between the two users is reused or created.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input', issues: parsed.error.flatten() }, { status: 400 });
  }

  let { conversationId } = parsed.data;
  const { recipientId, productId, content, attachments } = parsed.data;

  if (!conversationId) {
    if (!recipientId) {
      return NextResponse.json({ error: 'recipientId or conversationId required' }, { status: 400 });
    }
    // Find existing direct conversation
    const existing = await prisma.conversation.findFirst({
      where: {
        type: 'DIRECT',
        participants: {
          every: { userId: { in: [session.user.id, recipientId] } },
        },
      },
      include: { participants: true },
    });

    if (existing && existing.participants.length === 2) {
      conversationId = existing.id;
    } else {
      const created = await prisma.conversation.create({
        data: {
          type: productId ? 'PRODUCT_INQUIRY' : 'DIRECT',
          productId,
          participants: {
            create: [{ userId: session.user.id }, { userId: recipientId }],
          },
        },
      });
      conversationId = created.id;
    }
  }

  const message = await prisma.message.create({
    data: {
      conversationId: conversationId!,
      senderId: session.user.id,
      content,
      attachments,
    },
    include: { sender: { select: { id: true, username: true, avatar: true } } },
  });

  await prisma.conversation.update({
    where: { id: conversationId! },
    data: { lastMessageAt: new Date() },
  });

  await prisma.participant.updateMany({
    where: { conversationId: conversationId!, NOT: { userId: session.user.id } },
    data: { unreadCount: { increment: 1 } },
  });

  return NextResponse.json({ message, conversationId }, { status: 201 });
}

/**
 * GET conversations list for the current user.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const conversations = await prisma.conversation.findMany({
    where: { participants: { some: { userId: session.user.id } } },
    orderBy: { lastMessageAt: 'desc' },
    include: {
      participants: {
        include: { user: { select: { id: true, username: true, avatar: true } } },
      },
      messages: { take: 1, orderBy: { createdAt: 'desc' } },
      product: { select: { id: true, slug: true, title: true, images: true } },
    },
    take: 50,
  });

  return NextResponse.json({ conversations });
}
