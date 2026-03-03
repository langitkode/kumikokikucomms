type RateLimitStore = {
  [key: string]: {
    count: number;
    resetTime: number;
  };
};

const store: RateLimitStore = {};

/**
 * Lightweight in-memory rate limiter.
 * Note: In distributed serverless environments, this is per-instance.
 * For a portfolio, this is a sufficient initial layer of protection.
 */
export function checkRateLimit(
  ip: string,
  limit: number,
  windowMs: number,
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const userData = store[ip];

  // If no record or window expired, reset
  if (!userData || now > userData.resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true, remaining: limit - 1, reset: store[ip].resetTime };
  }

  userData.count++;

  if (userData.count > limit) {
    return { success: false, remaining: 0, reset: userData.resetTime };
  }

  return {
    success: true,
    remaining: Math.max(0, limit - userData.count),
    reset: userData.resetTime,
  };
}
