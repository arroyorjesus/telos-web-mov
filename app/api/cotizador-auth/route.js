import { NextResponse } from 'next/server'
import { COTIZ_COOKIE, getCotizadorPassword, deriveToken } from '@/lib/cotizadorAuth'

export async function POST(request) {
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
  if (!next.startsWith('/')) next = '/cotizador'

  if (password !== getCotizadorPassword()) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const token = await deriveToken(password)
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
