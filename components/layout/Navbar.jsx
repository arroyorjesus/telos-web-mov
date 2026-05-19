'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && menuOpen) closeMenu() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  function toggleMenu() {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <Link href="/" className="nav-logo">
          <div className="nav-logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#fff"/>
            </svg>
          </div>
          <span className="nav-logo-text">TELOS</span>
        </Link>

        <div className="nav-links">
          <Link href="/" className="nav-link">Inicio</Link>
          <Link href="/nosotros" className="nav-link">Nosotros</Link>
          <Link href="/#soluciones" className="nav-link">Capacidades</Link>
          <Link href="/#resultados" className="nav-link">Proyectos</Link>
          <Link href="/contacto" className="nav-link">Contacto</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <Link href="/contacto" className="btn-nav">
            Análisis estratégico
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span className="ham-line"></span>
            <span className="ham-line"></span>
            <span className="ham-line"></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <Link href="/" className="mobile-nav-link" onClick={closeMenu}>Inicio</Link>
        <Link href="/nosotros" className="mobile-nav-link" onClick={closeMenu}>Nosotros</Link>
        <Link href="/#soluciones" className="mobile-nav-link" onClick={closeMenu}>Capacidades</Link>
        <Link href="/#resultados" className="mobile-nav-link" onClick={closeMenu}>Proyectos</Link>
        <Link href="/contacto" className="mobile-nav-link" onClick={closeMenu}>Contacto</Link>
        <Link href="/contacto" className="btn-primary" style={{ marginTop: '0.5rem' }} onClick={closeMenu}>
          Análisis estratégico
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </>
  )
}
