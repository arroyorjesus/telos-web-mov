'use client'

import Link from 'next/link'

const NAV = [
  { label: 'Inicio',    href: '/' },
  { label: 'Nosotros',  href: '/nosotros' },
  { label: 'Ustedes',   href: '/ustedes' },
  { label: 'Ellos',     href: '/ellos' },
  { label: 'Contacto',  href: '/contacto' },
]

const VERTICALES = [
  { label: 'Estrategia hídrica',      href: '/ustedes#agua' },
  { label: 'Ingeniería térmica',      href: '/ustedes#gas' },
  { label: 'Optimización eléctrica',  href: '/ustedes#electricidad' },
  { label: 'Diagnóstico gratuito',    href: '/contacto' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#021829] overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(13,92,145,0.10)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1.4fr] gap-10 lg:gap-16 py-14 md:py-16">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-7 h-7 rounded-lg bg-[#0d5c91] flex items-center justify-center shrink-0 group-hover:bg-[#1a7abf] transition-colors duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#fff"/>
                </svg>
              </div>
              <span className="font-grotesk font-bold text-white text-lg tracking-tight">TELOS</span>
            </Link>

            <p className="text-white/45 text-sm leading-relaxed max-w-[24ch] mb-5">
              Ingeniería de infraestructura energética para operaciones que no pueden fallar.
            </p>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d802a] shrink-0" />
                <span className="font-mono text-[0.65rem] text-white/35 tracking-widest uppercase">
                  Disponible L–V, 9–18 h
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d5c91] shrink-0" />
                <span className="font-mono text-[0.65rem] text-white/35 tracking-widest uppercase">
                  Firma especializada desde 2017
                </span>
              </div>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="font-mono text-[0.6rem] font-bold tracking-[0.22em] text-white/30 uppercase mb-5">
              Navegación
            </p>
            <ul className="flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verticales */}
          <div>
            <p className="font-mono text-[0.6rem] font-bold tracking-[0.22em] text-white/30 uppercase mb-5">
              Verticales
            </p>
            <ul className="flex flex-col gap-3">
              {VERTICALES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="font-mono text-[0.6rem] font-bold tracking-[0.22em] text-white/30 uppercase mb-5">
              Contacto
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:contacto@telos.com.mx"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  contacto@telos.com.mx
                </a>
              </li>
              <li>
                <a
                  href="tel:+525544517101"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  +52 (55) 4451 7101
                </a>
              </li>
              <li>
                <p className="text-sm text-white/35 leading-snug">
                  Pedregal 44, PH.<br />
                  Lomas de Chapultepec,<br />
                  CDMX, 11000
                </p>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/525544517101?text=Hola%2C%20quiero%20solicitar%20un%20an%C3%A1lisis%20estrat%C3%A9gico%20de%20infraestructura%20energ%C3%A9tica."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/12 bg-white/[0.05] text-white/65 text-xs font-semibold hover:bg-white/[0.09] hover:text-white active:scale-[0.98] transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className="border-t border-white/[0.07] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[0.65rem] text-white/25 tracking-wide">
            © {year} <span className="text-white/40 font-bold">TELOS</span> · Eficiencia Energética Integral · México
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacidad"
              className="font-mono text-[0.65rem] text-white/25 hover:text-white/50 tracking-wide transition-colors duration-200"
            >
              Aviso de privacidad
            </Link>
            <span className="font-mono text-[0.65rem] text-white/20">·</span>
            <span className="font-mono text-[0.65rem] text-white/25 tracking-wide">
              Operamos en toda la República Mexicana
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}
