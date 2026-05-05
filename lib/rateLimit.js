// Simple in-memory rate limiter for Edge/Node runtime
// For production, replace with Redis/Upstash

const store = new Map()

const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 5 // per window per IP

export function rateLimit(ip) {
  const key = `rl_${ip}`
  const now = Date.now()

  const record = store.get(key)

  if (!record || now > record.resetTime) {
    store.set(key, { count: 1, resetTime: now + WINDOW_MS })
    return { success: true, remaining: MAX_REQUESTS - 1 }
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((record.resetTime - now) / 1000),
    }
  }

  record.count += 1
  store.set(key, record)

  return { success: true, remaining: MAX_REQUESTS - record.count }
}

// Cleanup old entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, value] of store.entries()) {
      if (now > value.resetTime) store.delete(key)
    }
  }, WINDOW_MS)
}

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}
