import { NextResponse } from 'next/server'
import { COTIZ_COOKIE, isValidToken } from '@/lib/cotizadorAuth'
import { AUDIT_COOKIE, isValidSession } from '@/lib/auditoriasAuth'

// Rutas protegidas por la contraseña única del cotizador.
const PROTECTED_COTIZADOR = ['/cotizador', '/cotizaciones']

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Las pantallas de login y sus APIs quedan siempre accesibles.
  if (pathname === '/cotizador/login' || pathname.startsWith('/api/cotizador-auth')) {
    return NextResponse.next()
  }
  if (pathname === '/auditorias/login') {
    return NextResponse.next()
  }

  const needsCotizAuth =
    PROTECTED_COTIZADOR.some((p) => pathname === p || pathname.startsWith(p + '/')) ||
    pathname.startsWith('/api/cotizaciones')

  if (needsCotizAuth) {
    const token = request.cookies.get(COTIZ_COOKIE)?.value
    if (await isValidToken(token)) return NextResponse.next()
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const loginUrl = new URL('/cotizador/login', request.url)
    loginUrl.searchParams.set('next', pathname + request.nextUrl.search)
    return NextResponse.redirect(loginUrl)
  }

  // Rutas protegidas por login individual de colaborador (/auditorias).
  const needsAuditAuth = pathname === '/auditorias' || pathname.startsWith('/auditorias/') || pathname.startsWith('/api/auditorias/')

  if (needsAuditAuth) {
    const token = request.cookies.get(AUDIT_COOKIE)?.value
    if (await isValidSession(token)) return NextResponse.next()
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    const loginUrl = new URL('/auditorias/login', request.url)
    loginUrl.searchParams.set('next', pathname + request.nextUrl.search)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/cotizador',
    '/cotizador/:path*',
    '/cotizaciones',
    '/cotizaciones/:path*',
    '/api/cotizaciones/:path*',
    '/auditorias',
    '/auditorias/:path*',
    '/api/auditorias/:path*',
  ],
}
