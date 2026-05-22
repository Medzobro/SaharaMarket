/**
 * Socket.IO server bootstrap.
 *
 * Run alongside Next.js in production (e.g. on Render/Railway):
 *   tsx src/lib/socket-server.ts
 *
 * Or attach to a custom Next server. For Vercel deployments, use a
 * dedicated long-running Node host for the socket server (Vercel
 * functions are stateless and don't keep WebSocket connections alive).
 */
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { prisma } from './prisma';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: process.env.NEXT_PUBLIC_APP_URL ?? '*', credentials: true },
});

interface ChatPayload {
  conversationId: string;
  senderId: string;
  content: string;
  attachments?: string[];
}

io.on('connection', (socket) => {
  console.log('[socket] connected', socket.id);

  socket.on('join', (userId: string) => {
    socket.join(`user:${userId}`);
  });

  socket.on('join:conversation', (conversationId: string) => {
    socket.join(`conv:${conversationId}`);
  });

  socket.on('typing', ({ conversationId, userId }: { conversationId: string; userId: string }) => {
    socket.to(`conv:${conversationId}`).emit('typing', { userId });
  });

  socket.on('message:send', async (data: ChatPayload, ack?: (ok: boolean) => void) => {
    try {
      const message = await prisma.message.create({
        data: {
          conversationId: data.conversationId,
          senderId: data.senderId,
          content: data.content,
          attachments: data.attachments ?? [],
        },
        include: { sender: { select: { id: true, username: true, avatar: true } } },
      });

      await prisma.conversation.update({
        where: { id: data.conversationId },
        data: { lastMessageAt: new Date() },
      });

      io.to(`conv:${data.conversationId}`).emit('message:new', message);
      ack?.(true);
    } catch (err) {
      console.error('[socket message:send]', err);
      ack?.(false);
    }
  });

  socket.on('message:read', async ({ messageId }: { messageId: string }) => {
    await prisma.message.update({
      where: { id: messageId },
      data: { readAt: new Date() },
    });
  });

  socket.on('disconnect', () => {
    console.log('[socket] disconnected', socket.id);
  });
});

const PORT = Number(process.env.SOCKET_PORT ?? 3001);
httpServer.listen(PORT, () => {
  console.log(`[socket] listening on :${PORT}`);
});
