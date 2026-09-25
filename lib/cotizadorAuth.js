// Auth compartida para el cotizador (contraseña única).
// Funciona tanto en el runtime edge (middleware) como en Node (route handlers)
// usando Web Crypto, disponible en ambos.

export const COTIZ_COOKIE = 'cotiz_auth'
const SALT = 'telos-cotizador-v1'

// Contraseña por defecto solo para desarrollo local. En producción SIEMPRE
// definir COTIZADOR_PASSWORD en las variables de entorno (Vercel).
const DEFAULT_DEV_PASSWORD = 'telos-solar-2026'

export function getCotizadorPassword() {
  return process.env.COTIZADOR_PASSWORD || DEFAULT_DEV_PASSWORD
}

// Token determinístico derivado de la contraseña. El navegador nunca ve la
// contraseña; solo guarda este hash en una cookie httpOnly.
export async function deriveToken(password) {
  const data = new TextEncoder().encode(`${password}:${SALT}`)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function expectedToken() {
  return deriveToken(getCotizadorPassword())
}

// Interruptor para desactivar la contraseña por completo (uso personal/local).
// Si COTIZADOR_NO_AUTH=true, /cotizador y /cotizaciones quedan abiertos.
// En Vercel NO se define esta variable, así que en producción la auth sigue activa.
export function isAuthDisabled() {
  return process.env.COTIZADOR_NO_AUTH === 'true'
}

// Comparación en tiempo constante para evitar timing attacks sobre el token.
export function timingSafeEqualHex(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function isValidToken(cookieValue) {
  if (isAuthDisabled()) return true
  if (!cookieValue) return false
  return timingSafeEqualHex(cookieValue, await expectedToken())
}

// Solo permite redirigir a rutas internas (evita open-redirect vía ?next=//evil.com).
export function safeNextPath(next, fallback) {
  if (typeof next === 'string' && next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/\\')) {
    return next
  }
  return fallback
}
