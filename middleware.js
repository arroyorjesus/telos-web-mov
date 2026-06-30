import { NextResponse } from 'next/server'
import { COTIZ_COOKIE, isValidToken } from '@/lib/cotizadorAuth'

// Rutas protegidas por la contraseña del cotizador.
const PROTECTED = ['/cotizador', '/cotizaciones']

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // La pantalla de login y su API quedan siempre accesibles.
  if (pathname === '/cotizador/login' || pathname.startsWith('/api/cotizador-auth')) {
    return NextResponse.next()
  }

  const needsAuth = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  ) || pathname.startsWith('/api/cotizaciones')

  if (!needsAuth) return NextResponse.next()

  const token = request.cookies.get(COTIZ_COOKIE)?.value
  if (await isValidToken(token)) {
    return NextResponse.next()
  }

  // APIs responden 401; las páginas redirigen al login.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const loginUrl = new URL('/cotizador/login', request.url)
  loginUrl.searchParams.set('next', pathname + request.nextUrl.search)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    '/cotizador',
    '/cotizador/:path*',
    '/cotizaciones',
    '/cotizaciones/:path*',
    '/api/cotizaciones/:path*',
  ],
}
