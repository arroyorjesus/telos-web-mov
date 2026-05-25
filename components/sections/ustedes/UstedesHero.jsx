'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Marquee row 1 — industries
const INDUSTRY_ITEMS = [
  { label: 'Hotelería',           dot: '#8b5cf6' },
  { label: 'Logística · CEDIS',   dot: '#2d802a' },
  { label: 'Industrial',          dot: '#f97316' },
  { label: 'Corporativos',        dot: '#2b8fd4' },
  { label: 'Clubes Deportivos',   dot: '#ec4899' },
  { label: 'Manufactura',         dot: '#f97316' },
  { label: 'Condominios',         dot: '#6366f1' },
  { label: 'Centros Comerciales', dot: '#ef4444' },
  { label: 'Hospitales',          dot: '#14b8a6' },
]

// Marquee row 2 — real project metrics
const METRIC_ITEMS = [
  { label: '$3.9M MXN / año · CEDIS Puebla',          num: 'OPEX', dot: '#2d802a' },
  { label: 'Blindaje energético · 340 kWp',            num: 'ELEC', dot: '#2d802a' },
  { label: 'Autonomía total · Hotel Los Cabos',        num: 'H₂O',  dot: '#0d5c91' },
  { label: '−50% factura gas · Centro Deportivo',      num: 'GAS',  dot: '#f97316' },
  { label: '$3.4M MXN / año · Amozoc',                 num: 'OPEX', dot: '#2d802a' },
  { label: '−3 pipas/mes eliminadas · Hotel CDMX',     num: 'H₂O',  dot: '#0d5c91' },
  { label: '−3,300t CO₂ · Modernización BCS',          num: 'GAS',  dot: '#f97316' },
  { label: 'Inversión neta cero · 297 kWp instalados', num: 'ELEC', dot: '#2d802a' },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
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

export default function UstedesHero() {
  return (
    <section className="relative overflow-hidden inner-hero-bg" style={{ minHeight: '100dvh' }}>

      {/* Dot pattern — igual que Inicio */}
      <div className="hero-dots" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 100% 55% at 78% 12%, rgba(13,92,145,0.22) 0%, transparent 55%), radial-gradient(ellipse 55% 70% at 6% 90%, rgba(34,197,94,0.05) 0%, transparent 50%)',
      }} />

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, #021829 100%)',
        zIndex: 2,
      }} />

      <div className="v2-hero-inner">
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
                Portafolio de proyectos &nbsp;·&nbsp; Casos reales con métricas
              </span>
            </motion.div>

            {/* Eyebrow */}
            <motion.div variants={item} className="v2-eyebrow">
              <span className="v2-eyebrow-num">01</span>
              <span className="v2-eyebrow-line" />
              <span className="v2-eyebrow-label">Portafolio · Casos reales</span>
            </motion.div>

            {/* Headline — LCP: usa itemH1 (opacity siempre 1, solo anima y) */}
            <motion.h1 variants={itemH1} className="v2-h1">
              Resultados reales.
              <br />
              <span className="accent">Sin nombres. Con números.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={item} className="hero-sub" style={{ marginBottom: '2.25rem' }}>
              Agua, gas y electricidad optimizados en empresas, hoteles, centros
              deportivos e industrias a lo largo del país. Medidos y documentados.
            </motion.p>

            {/* Vertical legend + CTAs */}
            <motion.div variants={item} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Vertical dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                {[
                  { color: '#2d802a', label: 'Optimización eléctrica' },
                  { color: '#0d5c91', label: 'Estrategia hídrica' },
                  { color: '#f97316', label: 'Ingeniería térmica' },
                ].map((d) => (
                  <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: d.color, flexShrink: 0, display: 'block' }} />
                    <span className="v2-mono-label">{d.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
                <Link href="/contacto" className="btn-primary">
                  Solicitar análisis estratégico
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="#electricidad" className="btn-secondary">
                  Ver proyectos
                </Link>
              </div>
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
                <span className="live-label">Impacto acumulado · Portafolio activo</span>
                <div className="en-vivo-badge">
                  <span className="en-vivo-dot" />
                  En vivo
                </div>
              </div>

              <div style={{ marginBottom: '0.5rem' }}>
                <div className="co2-value">$23.5M</div>
                <div className="co2-unit">MXN en OPEX optimizado / año</div>
              </div>

              <div className="card-divider" />

              <div className="metrics-grid">
                <div>
                  <div className="metric-value">9+</div>
                  <div className="metric-label">Proyectos<br/>documentados</div>
                </div>
                <div>
                  <div className="metric-value">3</div>
                  <div className="metric-label">Verticales<br/>activos</div>
                </div>
                <div>
                  <div className="metric-value">−2,195t</div>
                  <div className="metric-label">CO₂<br/>reducidas</div>
                </div>
              </div>

              <div className="card-divider" />

              <Link href="/contacto" className="card-link">
                <span>Analizar mi operación</span>
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
            <span className="strip-label">Industrias que operamos</span>
            <div className="strip-line" />
          </div>

          <div className="marquee-row" style={{ marginBottom: '0.625rem' }}>
            <div className="marquee-track marquee-track--left">
              {[...INDUSTRY_ITEMS, ...INDUSTRY_ITEMS].map((c, i) => (
                <div key={i} className="mq-text-card" aria-hidden={i >= INDUSTRY_ITEMS.length}>
                  <span className="mq-text-card-dot" style={{ background: c.dot }} />
                  <span className="mq-text-card-label">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="strip-header marquee-strip-label" style={{ marginTop: '1.25rem' }}>
            <div className="strip-line" />
            <span className="strip-label">Proyectos ejecutados · Métricas reales</span>
            <div className="strip-line" />
          </div>

          <div className="marquee-row">
            <div className="marquee-track marquee-track--right">
              {[...METRIC_ITEMS, ...METRIC_ITEMS].map((c, i) => (
                <div key={i} className="mq-text-card" aria-hidden={i >= METRIC_ITEMS.length}>
                  <span className="mq-text-card-dot" style={{ background: c.dot }} />
                  <span className="mq-text-card-label">{c.label}</span>
                  <span className="mq-text-card-num">{c.num}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
