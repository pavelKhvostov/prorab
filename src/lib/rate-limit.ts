// Простой in-memory rate-limit по ключу (IP). Для v1 достаточно: лендинг
// на одном инстансе. В v2/edge заменяется на distributed-стор без смены контракта.

type Bucket = { count: number; resetAt: number };

const WINDOW_MS = 60 * 60 * 1000; // 1 час
const MAX_PER_WINDOW = 5; // 5 заявок с IP в час (спека §04, анти-спам)

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string): { ok: boolean } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    return { ok: false };
  }

  bucket.count += 1;
  return { ok: true };
}
