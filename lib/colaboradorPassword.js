// Hash de contraseñas para la tabla `colaboradores` (acceso a /auditorias).
// Node-only (scrypt) — nunca se importa desde el middleware (Edge runtime).

import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

const KEYLEN = 64

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, KEYLEN).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password, stored) {
  if (!stored || !stored.includes(':')) return false
  const [salt, hash] = stored.split(':')
  const hashBuffer = Buffer.from(hash, 'hex')
  const testBuffer = scryptSync(password, salt, KEYLEN)
  return hashBuffer.length === testBuffer.length && timingSafeEqual(hashBuffer, testBuffer)
}
