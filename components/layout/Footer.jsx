'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      background: '#021829',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: '2.5rem max(2.5rem, env(safe-area-inset-right))',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      fontFamily: "'Outfit', sans-serif",
      fontSize: '0.8125rem',
      color: 'rgba(255,255,255,0.38)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: 26, height: 26,
          background: '#0d5c91',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <span>TELOS · Ingeniería de Infraestructura Energética</span>
      </div>

      <nav aria-label="Links secundarios" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem 2rem' }}>
        <Link href="/nosotros" style={{ color: 'rgba(255,255,255,0.38)', transition: 'color 200ms' }}
          onMouseOver={e => e.target.style.color='rgba(255,255,255,0.7)'}
          onMouseOut={e => e.target.style.color='rgba(255,255,255,0.38)'}>
          Nosotros
        </Link>
        <Link href="/contacto" style={{ color: 'rgba(255,255,255,0.38)', transition: 'color 200ms' }}
          onMouseOver={e => e.target.style.color='rgba(255,255,255,0.7)'}
          onMouseOut={e => e.target.style.color='rgba(255,255,255,0.38)'}>
          Contacto
        </Link>
        <Link href="/privacidad" style={{ color: 'rgba(255,255,255,0.38)', transition: 'color 200ms' }}
          onMouseOver={e => e.target.style.color='rgba(255,255,255,0.7)'}
          onMouseOut={e => e.target.style.color='rgba(255,255,255,0.38)'}>
          Aviso de privacidad
        </Link>
      </nav>

      <p style={{ width: '100%', textAlign: 'center', margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)' }}>
        © 2017–2026 TELOS · México · Todos los derechos reservados
      </p>
    </footer>
  )
}
