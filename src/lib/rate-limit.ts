/**
 * Lightweight in-memory rate limiter (per-process).
 * For production with multiple instances, swap the Map for Redis (ioredis).
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  limit = 60,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { success: false, remaining: 0, resetAt: bucket.resetAt };
  }
  return { success: true, remaining: limit - bucket.count, resetAt: bucket.resetAt };
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
