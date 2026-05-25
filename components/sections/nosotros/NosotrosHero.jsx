'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Marquee row 1 — tech capabilities
const TECH_ITEMS = [
  { label: 'Sistemas Fotovoltaicos', num: '01', dot: '#22c55e' },
  { label: 'BESS · Almacenamiento',  num: '02', dot: '#22c55e' },
  { label: 'Calderas Condensación',  num: '03', dot: '#f97316' },
  { label: 'Heat Pumps',            num: '04', dot: '#f97316' },
  { label: 'Ósmosis Inversa',        num: '05', dot: '#3b82f6' },
  { label: 'Captación Pluvial',      num: '06', dot: '#3b82f6' },
  { label: 'VFDs · Variadores',      num: '07', dot: '#22c55e' },
  { label: 'Compensación Reactiva',  num: '08', dot: '#22c55e' },
  { label: 'Tratamiento de Agua',    num: '09', dot: '#3b82f6' },
  { label: 'SCADA · Monitoreo',      num: '10', dot: '#2b8fd4' },
]

// Marquee row 2 — sectors
const SECTOR_ITEMS = [
  { label: 'Hotelería',         dot: '#8b5cf6' },
  { label: 'Industrial',        dot: '#f97316' },
  { label: 'Corporativos',      dot: '#2b8fd4' },
  { label: 'Logística · CEDIS', dot: '#22c55e' },
  { label: 'Clubes Deportivos', dot: '#ec4899' },
  { label: 'Manufactura',       dot: '#f97316' },
  { label: 'Condominios',       dot: '#6366f1' },
  { label: 'Hospitales',        dot: '#14b8a6' },
  { label: 'Centros Comerciales', dot: '#ef4444' },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
// LCP fix: el h1 es el Largest Contentful Paint — no puede empezar invisible.
// Solo anima posición (no opacity) para que Google y el browser lo pinten de inmediato.
const itemH1 = {
  hidden: { opacity: 1, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function NosotrosHero() {
  return (
    <section className="relative overflow-hidden inner-hero-bg" style={{ minHeight: '100dvh' }}>

      {/* Dot pattern — igual que Inicio */}
      <div className="hero-dots" />

      {/* Ambient glows — same pattern as home hero */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 100% 55% at 72% 12%, rgba(13,92,145,0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 70% at 6% 88%, rgba(43,143,212,0.06) 0%, transparent 50%)',
      }} />

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, #021829 100%)',
        zIndex: 2,
      }} />

      <div className="v2-hero-inner" style={{ flex: 1 }}>
        <div className="v2-hero-grid">

          {/* ── LEFT: Copy ─────────────────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Pill badge */}
            <motion.div variants={item} style={{ marginBottom: '1.875rem' }}>
              <span className="pill-badge">
                Firma de ingeniería energética &nbsp;·&nbsp; Desde 2017
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div variants={item} className="v2-eyebrow">
              <span className="v2-eyebrow-num">01</span>
              <span className="v2-eyebrow-line" />
              <span className="v2-eyebrow-label">Sobre TELOS</span>
            </motion.div>

            {/* Headline — LCP: usa itemH1 (opacity siempre 1, solo anima y) */}
            <motion.h1 variants={itemH1} className="v2-h1">
              Desarrollamos activos
              <br className="hidden sm:block" /> energéticos.
              <br />
              <span className="accent">No vendemos equipos.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={item} className="hero-sub" style={{ marginBottom: '2.25rem' }}>
              Ingeniería aplicada a la rentabilidad: transformamos el gasto ineficiente
              en utilidad neta mediante la optimización de activos críticos.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
              <Link href="/contacto" className="btn-primary">
                Solicitar análisis estratégico
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/ustedes" className="btn-secondary">
                Ver proyectos ejecutados
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Stats card ───────────────────────────────── */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stats-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.375rem' }}>
                <span className="live-label">Patrimonio Energético Optimizado</span>
                <div className="en-vivo-badge" style={{ borderColor: 'rgba(43,143,212,0.35)', background: 'rgba(43,143,212,0.10)', color: 'var(--blue-light)' }}>
                  <span className="en-vivo-dot" style={{ background: 'var(--blue-light)', boxShadow: '0 0 6px rgba(43,143,212,0.7)' }} />
                  Activo
                </div>
              </div>

              <div style={{ marginBottom: '0.5rem' }}>
                <div className="co2-value" style={{ color: 'var(--blue-light)', fontSize: 'clamp(2.2rem, 3.5vw, 3rem)' }}>
                  +$450M
                </div>
                <div className="co2-unit">MXN en ahorro operativo generado para clientes</div>
              </div>

              <div className="card-divider" />

              <div className="metrics-grid">
                <div>
                  <div className="metric-value">+150</div>
                  <div className="metric-label">Proyectos<br/>ejecutados</div>
                </div>
                <div>
                  <div className="metric-value">2017</div>
                  <div className="metric-label">Fundación<br/>firma</div>
                </div>
                <div>
                  <div className="metric-value">≤36m</div>
                  <div className="metric-label">Payback<br/>garantizado</div>
                </div>
              </div>

              <div className="card-divider" />

              <Link href="/ustedes" className="card-link">
                <span>Ver impacto del portafolio</span>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </motion.div>

        </div>

        {/* ── Marquee strips ─────────────────────────────────────── */}
        <motion.div
          className="marquee-strips-wrapper"
          style={{ marginTop: '3.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <div className="strip-header marquee-strip-label">
            <div className="strip-line" />
            <span className="strip-label">Capacidades técnicas</span>
            <div className="strip-line" />
          </div>

          <div className="marquee-row" style={{ marginBottom: '0.625rem' }}>
            <div className="marquee-track marquee-track--left">
              {[...TECH_ITEMS, ...TECH_ITEMS].map((c, i) => (
                <div key={i} className="mq-text-card" aria-hidden={i >= TECH_ITEMS.length}>
                  <span className="mq-text-card-dot" style={{ background: c.dot }} />
                  <span className="mq-text-card-label">{c.label}</span>
                  <span className="mq-text-card-num">{c.num}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="strip-header marquee-strip-label" style={{ marginTop: '1.25rem' }}>
            <div className="strip-line" />
            <span className="strip-label">Sectores que operamos</span>
            <div className="strip-line" />
          </div>

          <div className="marquee-row">
            <div className="marquee-track marquee-track--right">
              {[...SECTOR_ITEMS, ...SECTOR_ITEMS].map((c, i) => (
                <div key={i} className="mq-text-card" aria-hidden={i >= SECTOR_ITEMS.length}>
                  <span className="mq-text-card-dot" style={{ background: c.dot }} />
                  <span className="mq-text-card-label">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
