import { NextResponse } from 'next/server'
import { COTIZ_COOKIE, deriveToken, expectedToken, safeNextPath, timingSafeEqualHex } from '@/lib/cotizadorAuth'
import { clientIp, rateLimit } from '@/lib/rateLimit'

export async function POST(request) {
  const { allowed } = rateLimit(`cotiz-auth:${clientIp(request)}`, { max: 10, windowMs: 5 * 60 * 1000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Demasiados intentos. Espera unos minutos.' }, { status: 429 })
  }

  let password = ''
  let next = '/cotizador'

  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    const body = await request.json().catch(() => ({}))
    password = body.password || ''
    if (body.next) next = body.next
  } else {
    const form = await request.formData()
    password = form.get('password')?.toString() || ''
    if (form.get('next')) next = form.get('next').toString()
  }

  // Solo se permiten destinos internos.
  next = safeNextPath(next, '/cotizador')

  const token = await deriveToken(password)
  if (!timingSafeEqualHex(token, await expectedToken())) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true, next })
  res.cookies.set(COTIZ_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 días
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COTIZ_COOKIE)
  return res
}
