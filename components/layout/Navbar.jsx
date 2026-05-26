'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navHidden, setNavHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setScrolled(current > 48)

      if (!menuOpen) {
        if (current < 80) {
          setNavHidden(false)
        } else if (current - lastScrollY.current > 4) {
          setNavHidden(true)   // scrolling down
        } else if (lastScrollY.current - current > 4) {
          setNavHidden(false)  // scrolling up
        }
      }
      lastScrollY.current = current
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [menuOpen])

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
      <nav id="nav" className={[scrolled ? 'scrolled' : '', navHidden ? 'nav-hidden' : ''].filter(Boolean).join(' ')}>
        <Link href="/" className="nav-logo">
          <Image
            src="/logos/logo-blanco.png"
            alt="TELOS"
            width={400}
            height={400}
            priority
            quality={100}
            style={{ objectFit: 'contain', height: '120px', width: '120px' }}
          />
        </Link>

        <div className="nav-links">
          <Link href="/" className="nav-link">Inicio</Link>
          <Link href="/nosotros" className="nav-link">Nosotros</Link>
          <Link href="/ustedes" className="nav-link">Ustedes</Link>
          <Link href="/ellos" className="nav-link">Ellos</Link>
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
        <Link href="/ustedes" className="mobile-nav-link" onClick={closeMenu}>Ustedes</Link>
        <Link href="/ellos" className="mobile-nav-link" onClick={closeMenu}>Ellos</Link>
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
