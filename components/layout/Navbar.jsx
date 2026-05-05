'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MobileMenu from './MobileMenu'
import { SITE } from '@/data/site'

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Ustedes', href: '/ustedes' },
  { label: 'Ellos', href: '/ellos' },
  { label: 'Contacto', href: '/contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > lastY && y > 80)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80'
            : 'bg-transparent'
        }`}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* Logo */}
            <Link href="/" className="flex items-center group" aria-label="TELOS inicio">
              <Image
                src="/logo-azul.png"
                alt="TELOS"
                width={104}
                height={104}
                priority
                className="object-contain group-hover:opacity-85 transition-opacity duration-300"
                style={{ width: 104, height: 104 }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none ${
                      isActive
                        ? 'text-[#0d5c91] bg-[#0d5c91]/[0.07] border border-[#0d5c91]/20'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* CTA + Mobile trigger */}
            <div className="flex items-center gap-3">
              <Link
                href="/contacto"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0d5c91] text-white font-semibold text-sm hover:bg-[#0a4d7a] transition-all duration-200 shadow-[0_0_16px_rgba(13,92,145,0.25)] hover:shadow-[0_0_28px_rgba(13,92,145,0.4)]"
              >
                Calcula tu ahorro
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-lg transition-colors hover:bg-slate-100"
                aria-label="Abrir menú"
              >
                <span className="w-5 h-[1.5px] rounded-full bg-slate-700" />
                <span className="w-5 h-[1.5px] rounded-full bg-slate-700" />
                <span className="w-3 h-[1.5px] rounded-full self-start ml-1 bg-slate-700" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        pathname={pathname}
      />
    </>
  )
}
