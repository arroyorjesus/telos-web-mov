import { NextResponse } from 'next/server'
import { getColaboradorByEmail } from '@/lib/db'
import { verifyPassword } from '@/lib/colaboradorPassword'
import { AUDIT_COOKIE, createSessionToken } from '@/lib/auditoriasAuth'

export const runtime = 'nodejs'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Formato inválido' }, { status: 400 })
  }

  const email = (body.email || '').toString().trim().toLowerCase()
  const password = (body.password || '').toString()
  if (!email || !password) {
    return NextResponse.json({ error: 'Falta correo o contraseña' }, { status: 400 })
  }

  const { data: colaborador, error } = await getColaboradorByEmail(email)
  if (error || !colaborador || !verifyPassword(password, colaborador.password_hash)) {
    return NextResponse.json({ error: 'Correo o contraseña incorrectos' }, { status: 401 })
  }

  const token = await createSessionToken(colaborador.id)
  const res = NextResponse.json({ ok: true, next: body.next || '/auditorias' })
  res.cookies.set(AUDIT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(AUDIT_COOKIE, '', { path: '/', maxAge: 0 })
  return res
}
