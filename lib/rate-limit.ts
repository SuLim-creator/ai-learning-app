const store = new Map<string, number[]>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

export function rateLimit(ip: string): {
  allowed: boolean;
  retryAfter?: number;
} {
  const now = Date.now();
  const timestamps = (store.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }

  timestamps.push(now);
  store.set(ip, timestamps);
  return { allowed: true };
}
