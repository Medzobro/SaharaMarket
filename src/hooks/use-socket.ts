'use client';

import { useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';

let cachedSocket: Socket | null = null;

export function useSocket(userId?: string) {
  const ref = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    if (!cachedSocket) {
      cachedSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:3001', {
        autoConnect: true,
        transports: ['websocket', 'polling'],
      });
    }

    ref.current = cachedSocket;
    cachedSocket.emit('join', userId);

    return () => {
      // keep the cached socket alive across remounts
    };
  }, [userId]);

  return ref.current;
}
