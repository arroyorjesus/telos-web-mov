// Sesión de colaborador para el panel /auditorias.
// La verificación de contraseña (scrypt) ocurre solo en /api/auditorias-auth
// (runtime Node). Este módulo solo firma/valida la cookie de sesión y corre
// también en el middleware (Edge), por eso usa únicamente Web Crypto.

export const AUDIT_COOKIE = 'auditorias_session'
const SALT = 'telos-auditorias-session-v1'
const DURATION_MS = 1000 * 60 * 60 * 24 * 14 // 14 días

// Preferimos un secreto dedicado (AUDITORIAS_SESSION_SECRET) para no atar la
// firma de sesión al service role key de Supabase. Si no está definido, cae
// en el comportamiento anterior para no romper despliegues existentes.
function signingSecret() {
  return process.env.AUDITORIAS_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || 'dev-secret'
}

async function hmac(payload) {
  const keyMaterial = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${signingSecret()}:${SALT}`))
  const key = await crypto.subtle.importKey('raw', keyMaterial, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

// Comparación en tiempo constante para evitar timing attacks sobre la firma.
function timingSafeEqualHex(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createSessionToken(colaboradorId) {
  const exp = Date.now() + DURATION_MS
  const payload = `${colaboradorId}:${exp}`
  const sig = await hmac(payload)
  return `${payload}:${sig}`
}

export async function isValidSession(token) {
  if (!token) return false
  const parts = token.split(':')
  if (parts.length !== 3) return false
  const [id, expStr, sig] = parts
  const exp = Number(expStr)
  if (!id || !Number.isFinite(exp) || exp < Date.now()) return false
  const expected = await hmac(`${id}:${expStr}`)
  return timingSafeEqualHex(expected, sig)
}
