// Limitador de intentos muy simple, en memoria, por IP.
// Nota: en Vercel (serverless) cada instancia tiene su propio conteo — no es
// una defensa perfecta contra un atacante distribuido, pero sí frena el caso
// común de un script tocando el mismo endpoint repetidamente.

const buckets = new Map()

export function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for') || ''
  return fwd.split(',')[0].trim() || 'unknown'
}

export function rateLimit(key, { max = 10, windowMs = 5 * 60 * 1000 } = {}) {
  const now = Date.now()

  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (now > v.resetAt) buckets.delete(k)
    }
  }

  const entry = buckets.get(key)
  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  entry.count += 1
  if (entry.count > max) {
    return { allowed: false, retryAfterMs: entry.resetAt - now }
  }
  return { allowed: true }
}
