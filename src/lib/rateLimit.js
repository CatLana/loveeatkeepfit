/**
 * Rate Limiting — Upstash Redis
 * Uses sliding window algorithm for serverless-safe rate limiting.
 *
 * Requires env vars:
 *   UPSTASH_REDIS_REST_URL
 *   UPSTASH_REDIS_REST_TOKEN
 *
 * If the env vars are missing (local dev without Redis), all requests are allowed
 * so development is not blocked.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/** @type {Map<string, Ratelimit>} */
const limiters = new Map();

function getLimiter(requests, window) {
  const key = `${requests}:${window}`;
  if (!limiters.has(key)) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      // No Redis configured — return a no-op limiter for local dev
      limiters.set(key, null);
    } else {
      const redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
      limiters.set(key, new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(requests, window),
        analytics: false,
      }));
    }
  }
  return limiters.get(key);
}

/**
 * Enforce a rate limit on an API route.
 * Returns { limited: true } and sends a 429 response when the limit is exceeded.
 * Returns { limited: false } otherwise.
 *
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 * @param {{ requests: number, window: string }} options  e.g. { requests: 5, window: '10 m' }
 */
export async function rateLimit(req, res, { requests = 10, window = '15 m' } = {}) {
  const limiter = getLimiter(requests, window);

  // No limiter (dev env without Redis) — skip
  if (!limiter) return { limited: false };

  // Use the real IP if available (Vercel sets x-real-ip), fall back to remote address
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  const { success, limit, remaining, reset } = await limiter.limit(ip);

  if (!success) {
    res.setHeader('X-RateLimit-Limit', String(limit));
    res.setHeader('X-RateLimit-Remaining', '0');
    res.setHeader('X-RateLimit-Reset', String(Math.ceil((reset - Date.now()) / 1000)));
    res.setHeader('Retry-After', String(Math.ceil((reset - Date.now()) / 1000)));
    res.status(429).json({
      error: 'Too many requests. Please wait a moment and try again.',
    });
    return { limited: true };
  }

  res.setHeader('X-RateLimit-Limit', String(limit));
  res.setHeader('X-RateLimit-Remaining', String(remaining));
  return { limited: false };
}
