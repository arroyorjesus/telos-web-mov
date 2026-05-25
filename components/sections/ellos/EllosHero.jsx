'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
// LCP fix: h1 es el Largest Contentful Paint — siempre visible, solo anima posición
const itemH1 = {
  hidden: { opacity: 1, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function EllosHero() {
  return (
    <section className="relative overflow-hidden inner-hero-bg">

      {/* Dot pattern — igual que Inicio, Nosotros y Ustedes */}
      <div className="hero-dots" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 100% 55% at 72% 12%, rgba(13,92,145,0.22) 0%, transparent 55%), radial-gradient(ellipse 50% 70% at 6% 88%, rgba(43,143,212,0.06) 0%, transparent 50%)',
      }} />

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, #021829 100%)',
        zIndex: 2,
      }} />

      <div className="v2-hero-inner">
        <div className="v2-hero-grid">

          {/* ── LEFT: Copy ─────────────────────────────────────── */}
          <motion.div variants={container} initial="hidden" animate="visible">

            {/* Eyebrow */}
            <motion.div variants={item} className="v2-eyebrow" style={{ marginBottom: '1.5rem' }}>
              <span className="v2-eyebrow-num">01</span>
              <span className="v2-eyebrow-line" />
              <span className="v2-eyebrow-label">Comparativa de mercado</span>
            </motion.div>

            {/* Headline — LCP: usa itemH1 (opacity siempre 1, solo anima y) */}
            <motion.h1 variants={itemH1} className="v2-h1">
              El mercado tiene muchas opciones.
              <br />
              <span className="accent">Pocas resuelven el problema completo.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={item} className="hero-sub">
              Antes de decidir con quién trabajar, conviene entender qué hace cada quien
              y qué no hace. Sin nombres. Con hechos. Para que decidas con información.
            </motion.p>

          </motion.div>

          {/* ── RIGHT: Market snapshot card ─────────────────────── */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="stats-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.375rem' }}>
                <span className="live-label">Análisis del mercado energético</span>
                <div className="en-vivo-badge" style={{ borderColor: 'rgba(43,143,212,0.35)', background: 'rgba(43,143,212,0.10)', color: 'var(--blue-light)' }}>
                  <span className="en-vivo-dot" style={{ background: 'var(--blue-light)', boxShadow: '0 0 6px rgba(43,143,212,0.7)' }} />
                  4 modelos
                </div>
              </div>

              <div style={{ marginBottom: '0.5rem' }}>
                <div className="co2-value" style={{ color: 'var(--blue-light)', fontSize: 'clamp(2.2rem, 3.5vw, 3rem)' }}>
                  1 de 4
                </div>
                <div className="co2-unit">modelos del mercado resuelve agua, gas y electricidad de forma integral</div>
              </div>

              <div className="card-divider" />

              <div className="metrics-grid">
                <div>
                  <div className="metric-value">3</div>
                  <div className="metric-label">Vectores<br/>integrados</div>
                </div>
                <div>
                  <div className="metric-value">≤36m</div>
                  <div className="metric-label">Payback<br/>garantizado</div>
                </div>
                <div>
                  <div className="metric-value">+150</div>
                  <div className="metric-label">Proyectos<br/>ejecutados</div>
                </div>
              </div>

              <div className="card-divider" />

              <a href="#comparativa" className="card-link">
                <span>Ver comparativa completa</span>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
