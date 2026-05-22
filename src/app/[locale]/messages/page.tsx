'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  product?: { title: string; image: string };
};

const conversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Sahara Electronics',
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
    lastMessage: 'Yes, still available. When can you come?',
    time: '2m',
    unread: 2,
    online: true,
    product: {
      title: 'iPhone 15 Pro Max',
      image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=200',
    },
  },
  {
    id: 'c2',
    name: 'Mauritania Motors',
    avatar: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
    lastMessage: 'Price is negotiable for a serious buyer.',
    time: '1h',
    unread: 0,
    online: false,
  },
  {
    id: 'c3',
    name: 'Aïcha M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    lastMessage: 'Merci beaucoup !',
    time: '3h',
    unread: 0,
    online: true,
  },
];

type Msg = { id: string; from: 'me' | 'them'; text: string; time: string; read?: boolean };

const initialMessages: Msg[] = [
  { id: 'm1', from: 'them', text: 'Hi, is this still available?', time: '10:24' },
  { id: 'm2', from: 'me', text: 'Yes, of course! It\'s sealed in original box.', time: '10:25', read: true },
  { id: 'm3', from: 'them', text: 'Great. Is the price negotiable?', time: '10:26' },
  { id: 'm4', from: 'me', text: 'A little. What did you have in mind?', time: '10:26', read: true },
  { id: 'm5', from: 'them', text: 'Yes, still available. When can you come?', time: '10:27' },
];

export default function MessagesPage() {
  const [active, setActive] = useState(conversations[0]!);
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState('');

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg: Msg = {
      id: `m${Date.now()}`,
      from: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setMessages((m) => [...m, newMsg]);
    setInput('');
  }

  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-4 h-[calc(100vh-7rem)] glass-card rounded-3xl overflow-hidden">
        {/* Sidebar */}
        <div className="border-e border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5">
            <h2 className="font-display text-xl font-bold mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search conversations..."
                className="w-full h-10 ps-10 pe-3 rounded-2xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan/40"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={cn(
                  'w-full flex items-start gap-3 p-3 hover:bg-white/5 transition text-start',
                  active.id === c.id && 'bg-white/5 border-s-2 border-brand-cyan'
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={c.avatar} />
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>
                  {c.online && (
                    <span className="absolute bottom-0 end-0 h-3 w-3 rounded-full bg-brand-emerald ring-2 ring-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {c.lastMessage}
                  </p>
                </div>
                {c.unread > 0 && (
                  <Badge variant="cyber" className="text-[10px] px-2 py-0">
                    {c.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 p-4 border-b border-white/5">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={active.avatar} />
                <AvatarFallback>{active.name[0]}</AvatarFallback>
              </Avatar>
              {active.online && (
                <span className="absolute bottom-0 end-0 h-2.5 w-2.5 rounded-full bg-brand-emerald ring-2 ring-background" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{active.name}</div>
              <div className="text-xs text-brand-emerald">{active.online ? 'Online' : 'Offline'}</div>
            </div>
            <button className="h-9 w-9 rounded-xl hover:bg-white/5 flex items-center justify-center">
              <Phone className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 rounded-xl hover:bg-white/5 flex items-center justify-center">
              <Video className="h-4 w-4" />
            </button>
            <button className="h-9 w-9 rounded-xl hover:bg-white/5 flex items-center justify-center">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          {active.product && (
            <div className="px-4 py-3 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-white/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.product.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-muted-foreground">Discussing</div>
                <div className="text-sm font-medium truncate">{active.product.title}</div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-2 text-sm',
                    m.from === 'me'
                      ? 'bg-gradient-to-r from-brand-royal to-brand-purple text-white rounded-br-sm'
                      : 'glass rounded-bl-sm'
                  )}
                >
                  <p>{m.text}</p>
                  <div className="flex items-center gap-1 justify-end mt-1 text-[10px] opacity-70">
                    <span>{m.time}</span>
                    {m.from === 'me' && (
                      <CheckCheck className={cn('h-3 w-3', m.read && 'text-brand-cyan')} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <form onSubmit={send} className="p-3 border-t border-white/5 flex items-center gap-2">
            <button type="button" className="h-10 w-10 rounded-xl hover:bg-white/5 flex items-center justify-center">
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-cyan/40"
            />
            <button type="button" className="h-10 w-10 rounded-xl hover:bg-white/5 flex items-center justify-center">
              <Smile className="h-4 w-4" />
            </button>
            <button
              type="submit"
              className="h-11 w-11 rounded-2xl bg-gradient-to-r from-brand-royal to-brand-purple text-white shadow-glow flex items-center justify-center hover:brightness-110"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
