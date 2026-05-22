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
    name: 'صحراء إلكترونيات',
    avatar: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200',
    lastMessage: 'نعم، لا يزال متوفراً. متى يمكنك الحضور؟',
    time: 'الآن',
    unread: 2,
    online: true,
    product: {
      title: 'آيفون 15 برو ماكس',
      image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=200',
    },
  },
  {
    id: 'c2',
    name: 'موريتانيا موتورز',
    avatar: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200',
    lastMessage: 'السعر قابل للتفاوض للمشتري الجاد.',
    time: 'منذ ساعة',
    unread: 0,
    online: false,
  },
  {
    id: 'c3',
    name: 'عائشة محمد',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    lastMessage: 'شكراً جزيلاً!',
    time: 'منذ 3 ساعات',
    unread: 0,
    online: true,
  },
];

type Msg = { id: string; from: 'me' | 'them'; text: string; time: string; read?: boolean };

const initialMessages: Msg[] = [
  { id: 'm1', from: 'them', text: 'السلام عليكم، هل المنتج لا يزال متاحاً؟', time: '10:24' },
  { id: 'm2', from: 'me', text: 'وعليكم السلام، نعم متاح ومغلق في علبته الأصلية.', time: '10:25', read: true },
  { id: 'm3', from: 'them', text: 'تمام، هل السعر قابل للتفاوض؟', time: '10:26' },
  { id: 'm4', from: 'me', text: 'قليلاً، ما المبلغ الذي تفكر فيه؟', time: '10:26', read: true },
  { id: 'm5', from: 'them', text: 'نعم، لا يزال متوفراً. متى يمكنك الحضور؟', time: '10:27' },
];

export default function MessagesPage() {
  const [active, setActive] = useState(conversations[0]!);
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState('');

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: `m${Date.now()}`,
        from: 'me',
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      },
    ]);
    setInput('');
  }

  return (
    <div className="container py-4">
      <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-0 h-[calc(100vh-7rem)] bg-white border border-brand-border rounded-2xl overflow-hidden shadow-card">
        {/* Sidebar */}
        <div className="border-e border-brand-border flex flex-col">
          <div className="p-4 border-b border-brand-border bg-brand-yellow/5">
            <h2 className="text-xl font-bold text-brand-ink mb-3">الرسائل</h2>
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
              <input
                placeholder="بحث في المحادثات..."
                className="w-full h-10 ps-10 pe-3 rounded-xl bg-white border border-brand-border text-sm focus:outline-none focus:border-brand-yellow"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={cn(
                  'w-full flex items-start gap-3 p-3 hover:bg-brand-yellow/5 transition text-start border-b border-brand-border',
                  active.id === c.id && 'bg-brand-yellow/10 border-s-4 border-s-brand-yellow'
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={c.avatar} />
                    <AvatarFallback>{c.name[0]}</AvatarFallback>
                  </Avatar>
                  {c.online && (
                    <span className="absolute bottom-0 end-0 h-3 w-3 rounded-full bg-brand-live ring-2 ring-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-brand-ink truncate">{c.name}</span>
                    <span className="text-[10px] text-brand-muted">{c.time}</span>
                  </div>
                  <p className="text-xs text-brand-muted truncate mt-0.5">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && (
                  <Badge className="text-[10px] px-2 py-0">{c.unread}</Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex flex-col bg-brand-bg">
          <div className="flex items-center gap-3 p-4 border-b border-brand-border bg-white">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={active.avatar} />
                <AvatarFallback>{active.name[0]}</AvatarFallback>
              </Avatar>
              {active.online && (
                <span className="absolute bottom-0 end-0 h-2.5 w-2.5 rounded-full bg-brand-live ring-2 ring-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm text-brand-ink">{active.name}</div>
              <div className="text-xs text-brand-live">{active.online ? 'متصل الآن' : 'غير متصل'}</div>
            </div>
            <button className="h-9 w-9 rounded-lg hover:bg-brand-yellow/10 flex items-center justify-center">
              <Phone className="h-4 w-4 text-brand-ink" />
            </button>
            <button className="h-9 w-9 rounded-lg hover:bg-brand-yellow/10 flex items-center justify-center">
              <Video className="h-4 w-4 text-brand-ink" />
            </button>
            <button className="h-9 w-9 rounded-lg hover:bg-brand-yellow/10 flex items-center justify-center">
              <MoreVertical className="h-4 w-4 text-brand-ink" />
            </button>
          </div>

          {active.product && (
            <div className="px-4 py-3 border-b border-brand-border bg-brand-yellow/10 flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.product.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-brand-muted">بخصوص</div>
                <div className="text-sm font-bold text-brand-ink truncate">{active.product.title}</div>
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
                    'max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-soft',
                    m.from === 'me'
                      ? 'bg-brand-yellow text-brand-ink rounded-br-sm'
                      : 'bg-white border border-brand-border text-brand-ink rounded-bl-sm'
                  )}
                >
                  <p>{m.text}</p>
                  <div className="flex items-center gap-1 justify-end mt-1 text-[10px] opacity-70">
                    <span>{m.time}</span>
                    {m.from === 'me' && (
                      <CheckCheck className={cn('h-3 w-3', m.read && 'text-brand-verified')} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <form onSubmit={send} className="p-3 border-t border-brand-border bg-white flex items-center gap-2">
            <button type="button" className="h-10 w-10 rounded-lg hover:bg-brand-yellow/10 flex items-center justify-center">
              <Paperclip className="h-4 w-4 text-brand-muted" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب رسالة..."
              className="flex-1 h-11 px-4 rounded-xl bg-white border border-brand-border text-sm focus:outline-none focus:border-brand-yellow"
            />
            <button type="button" className="h-10 w-10 rounded-lg hover:bg-brand-yellow/10 flex items-center justify-center">
              <Smile className="h-4 w-4 text-brand-muted" />
            </button>
            <button
              type="submit"
              className="h-11 w-11 rounded-xl bg-brand-yellow hover:bg-brand-yellowDark text-brand-ink flex items-center justify-center transition-colors shadow-soft"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
