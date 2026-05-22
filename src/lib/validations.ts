import { z } from 'zod';

// ─── Auth ────────────────────────────────────────────────────────────
export const registerSchema = z
  .object({
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string(),
    role: z.enum(['USER', 'SELLER']).default('USER'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z.string().min(8).max(100),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// ─── Products ────────────────────────────────────────────────────────
export const productSchema = z.object({
  title: z.string().min(3).max(140),
  description: z.string().min(10).max(5000),
  price: z.coerce.number().positive(),
  currency: z.string().default('MRU'),
  negotiable: z.boolean().default(true),
  condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'USED', 'REFURBISHED']),
  categoryId: z.string().min(1),
  city: z.string().min(2),
  region: z.string().optional(),
  images: z.array(z.string().url()).min(1).max(10),
  tags: z.array(z.string()).max(10).default([]),
});

// ─── Stores ──────────────────────────────────────────────────────────
export const storeSchema = z.object({
  name: z.string().min(3).max(60),
  description: z.string().max(1000).optional(),
  city: z.string().min(2).optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
});

// ─── Messages ────────────────────────────────────────────────────────
export const messageSchema = z.object({
  conversationId: z.string().min(1).optional(),
  recipientId: z.string().min(1).optional(),
  productId: z.string().min(1).optional(),
  content: z.string().min(1).max(5000),
  attachments: z.array(z.string().url()).max(5).default([]),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type StoreInput = z.infer<typeof storeSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
