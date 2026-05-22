# 🌟 SaharaMarket

> The premium marketplace platform for Mauritania — a luxury, cyber-modern, full-stack
> application built with the same craft as world-class unicorn startups.

<p align="center">
  <strong>Discover · Shop · Connect</strong><br/>
  <em>صحراء ماركت — السوق الأنيق لموريتانيا</em>
</p>

---

## ✨ Features

- 🎨 **Cyber-modern + luxury minimal design** — glassmorphism, neon glow, smooth Framer Motion animations
- 🌍 **Full i18n** — Arabic (RTL), French, English with instant switching
- 🔐 **Auth** — Credentials, Google, Facebook (NextAuth v5 + JWT) + email verification + password reset
- 🛒 **Marketplace** — products, categories, smart filters, search, infinite scroll-ready
- 🏪 **Stores** — verified sellers, store profiles, ratings, reviews
- 💬 **Real-time chat** — Socket.IO, online presence, read receipts, typing indicators
- 🔔 **Notifications** — in-app + ready for push/email
- 👑 **Admin Dashboard** — analytics, charts, user/store/product management, moderation
- 📊 **Analytics** — daily growth, active users, revenue tracking
- 🛡️ **Security** — rate limiting, Zod validation, secure headers, CSRF-safe, hashed passwords (bcrypt)
- 🚀 **Production-ready** — Vercel-friendly, scalable Postgres + Redis architecture

---

## 🛠️ Tech Stack

| Layer        | Stack                                                              |
| ------------ | ------------------------------------------------------------------ |
| Frontend     | **Next.js 15** (App Router) · React 19 · TypeScript · Tailwind CSS |
| UI           | ShadCN-style primitives · Framer Motion · Lucide icons             |
| State / data | Zustand · TanStack Query                                           |
| Backend      | Next.js Route Handlers · Node.js                                   |
| Database     | PostgreSQL · Prisma ORM                                            |
| Cache        | Redis (ioredis)                                                    |
| Auth         | NextAuth v5 (Auth.js) — Credentials, Google, Facebook              |
| Realtime     | Socket.IO                                                          |
| Validation   | Zod                                                                |
| i18n         | next-intl (ar / fr / en)                                           |
| Charts       | Recharts                                                           |

---

## 🎨 Design System

| Token             | Value     |
| ----------------- | --------- |
| Deep Black        | `#0B0F19` |
| Royal Blue        | `#2563EB` |
| Neon Cyan         | `#22D3EE` |
| Emerald Green     | `#10B981` |
| Premium Purple    | `#7C3AED` |
| Soft Gray         | `#F1F5F9` |

Style notes: **Glassmorphism**, **Neumorphism (subtle)**, **Rounded 2XL** (`1rem` radius),
glow shadows, gradient borders, Cairo (Arabic) + Plus Jakarta Sans + Inter fonts.

---

## 🚀 Getting Started

### 1. Install
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Fill in `DATABASE_URL`, `AUTH_SECRET`, OAuth credentials. Generate `AUTH_SECRET` with:
```bash
openssl rand -base64 32
```

### 3. Database
```bash
npm run db:push      # creates tables
npm run db:seed      # demo data + admin user
```

### 4. Develop
```bash
npm run dev
```
Open <http://localhost:3000> — you'll be redirected to `/ar` (default locale).

### 5. Realtime (separate process)
```bash
npx tsx src/lib/socket-server.ts
```

---

## 🔑 Demo Credentials (after seeding)

| Role       | Email                         | Password      |
| ---------- | ----------------------------- | ------------- |
| Super-admin| `admin@saharamarket.mr`       | `Admin@12345` |
| Seller     | `demo@saharamarket.mr`        | `Seller@123`  |

---

## 📁 Project Structure

```
SaharaMarket/
├── prisma/
│   ├── schema.prisma          # Full DB schema (Users, Stores, Products, Chat, …)
│   └── seed.ts                # Demo data seeder
├── messages/                  # i18n translations (ar, fr, en)
├── public/
└── src/
    ├── app/
    │   ├── [locale]/          # Localized routes
    │   │   ├── page.tsx       # Landing
    │   │   ├── auth/          # login, register, forgot-password, error
    │   │   ├── marketplace/   # Listing grid + filters
    │   │   ├── products/[slug]
    │   │   ├── stores/[slug]
    │   │   ├── messages/      # Real-time chat UI
    │   │   ├── sell/
    │   │   └── admin/         # Admin dashboard
    │   ├── api/               # Route handlers
    │   └── layout.tsx
    ├── components/
    │   ├── ui/                # Button, Input, Card, Avatar, Badge, …
    │   ├── layout/            # Header, Footer, LocaleSwitcher
    │   ├── landing/           # Hero, Categories, TrendingProducts, …
    │   ├── marketplace/       # FiltersSidebar, ProductCard
    │   └── admin/             # StatCard, GrowthChart
    ├── hooks/                 # use-socket, etc.
    ├── i18n/                  # config + request loader
    ├── lib/                   # prisma, redis, utils, validations, rate-limit
    ├── types/                 # next-auth augmentation
    ├── auth.ts                # NextAuth config
    └── middleware.ts          # i18n middleware
```

---

## 🌐 Deployment

### Vercel (Frontend + API)
1. Push to GitHub.
2. Import on Vercel.
3. Set environment variables (`.env.example`).
4. The included `vercel.json` runs `prisma generate && next build` automatically.

### Database (any of)
- **Supabase** (recommended — free tier with pooled connections)
- **Neon** — serverless Postgres
- **Railway** — Postgres + Redis side-by-side

### Realtime (Socket.IO)
WebSockets require a long-running host. **Vercel functions don't support persistent
sockets**, so deploy `src/lib/socket-server.ts` separately on:
- **Render** / **Railway** / **Fly.io** / a small VPS

Then point `NEXT_PUBLIC_SOCKET_URL` at the public URL.

### Redis (optional but recommended)
- **Upstash** — serverless Redis on a generous free tier.
- Used for: rate-limit cluster sync, caching hot product lists, session store.

---

## 🔒 Security

- 🔐 Passwords hashed with **bcrypt** (12 rounds)
- 🛡️ **Rate limiting** on register, login, password-reset, product creation
- ✅ Strict **Zod** validation on every API route
- 🍪 JWT sessions via NextAuth, secure cookies
- 🚫 No email enumeration on forgot-password
- 🪪 Role-based access (`USER`, `SELLER`, `ADMIN`, `SUPER_ADMIN`)
- 🌐 Security headers (`X-Frame-Options`, `Permissions-Policy`, …)

---

## 🗺️ Roadmap

- [ ] Image uploads (UploadThing or Cloudinary)
- [ ] Email transport for verification + reset (Resend recommended)
- [ ] Stripe / Sedad payment integration for promoted listings
- [ ] PWA + push notifications
- [ ] Mobile app (React Native + shared design tokens)
- [ ] Search powered by Meilisearch / Typesense
- [ ] AI-powered listing assistant (auto-titles, auto-translation)

---

## 📜 License

MIT © SaharaMarket — built with ❤️ in Nouakchott.
