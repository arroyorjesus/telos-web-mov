'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const CO2_BASE  = 2195.26
const CO2_EPOCH = new Date('2026-05-05T06:00:00Z').getTime()
const CO2_RATE  = 2.444 / (24 * 60 * 60 * 1000)

function calcCO2() {
  return CO2_BASE + CO2_RATE * (Date.now() - CO2_EPOCH)
}

const SPEC_CARDS = [
  { tag: 'Estrategia hídrica',    num: '01', tint: 'rgba(6,182,212,0.38)',   img: '/images/sectores/hidrica.jpg' },
  { tag: 'Ingeniería térmica',    num: '02', tint: 'rgba(249,115,22,0.38)',  img: '/images/sectores/termica.jpg' },
  { tag: 'Optimización eléctrica',num: '03', tint: 'rgba(13,92,145,0.42)',   img: '/images/sectores/electrica.jpg' },
  { tag: 'Infraestructura integral',num:'04', tint: 'rgba(45,128,42,0.35)',  img: '/images/sectores/infraestructura.jpg' },
  { tag: 'Gestión de demanda',    num: '05', tint: 'rgba(99,102,241,0.38)',  img: '/images/sectores/demanda.jpg' },
  { tag: 'Huella de carbono',     num: '06', tint: 'rgba(34,197,94,0.32)',   img: '/images/sectores/carbono.jpg' },
]

const IND_CARDS = [
  { tag: 'Hotelería',          tint: 'rgba(139,92,246,0.40)',  img: '/images/industrias/hoteleria.jpg' },
  { tag: 'Corporativos',       tint: 'rgba(13,92,145,0.45)',   img: '/images/industrias/corporativos.jpg' },
  { tag: 'Industrial',         tint: 'rgba(249,115,22,0.45)',  img: '/images/industrias/industrial.jpg' },
  { tag: 'Clubes deportivos',  tint: 'rgba(34,197,94,0.42)',   img: '/images/industrias/clubes.jpg' },
  { tag: 'Condominios',        tint: 'rgba(99,102,241,0.42)',  img: '/images/industrias/condominios.jpg' },
  { tag: 'Hospitales',         tint: 'rgba(14,165,233,0.42)',  img: '/images/industrias/hospitales.jpg' },
  { tag: 'Residencial',        tint: 'rgba(236,72,153,0.40)',  img: '/images/industrias/residencial.jpg' },
  { tag: 'Centros comerciales', tint: 'rgba(239,68,68,0.40)',  img: '/images/industrias/comercial.jpg' },
]

function MarqueeCard({ card, type }) {
  const cls = type === 'spec' ? 'mq-spec-card' : 'mq-ind-card'
  return (
    <div className={cls}>
      <img className="mq-card-img" src={card.img} alt={card.tag} loading="lazy"/>
      <div className="mq-card-tint" style={{ background: card.tint }}></div>
      <div className="mq-card-gradient"></div>
      <div className="mq-card-label">
        <span className="mq-card-tag">{card.tag}</span>
        {card.num && <span className="mq-card-num">{card.num}</span>}
      </div>
    </div>
  )
}

export default function HeroSection() {
  const [co2, setCo2] = useState(calcCO2)

  useEffect(() => {
    const id = setInterval(() => setCo2(calcCO2()), 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('#hero .reveal, #hero .reveal-card, #hero .reveal-heading')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -28px 0px' })
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const co2Str = co2.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-dots"></div>
      <div className="hero-fade"></div>

      <div className="hero-inner">
        <div className="hero-grid">

          {/* LEFT: Copy */}
          <div>
            <div className="reveal" suppressHydrationWarning style={{ marginBottom: '2rem', transitionDelay: '0ms' }}>
              <div className="pill-badge">
                Ingeniería de infraestructura energética &nbsp;·&nbsp; Desde 2017
              </div>
            </div>

            <h1 className="hero-h1 reveal-heading" style={{ marginBottom: '1.625rem', transitionDelay: '60ms' }}>
              Infraestructura energética<br/>
              para operaciones que<br/>
              <span className="accent">no pueden fallar.</span>
            </h1>

            <p className="hero-sub reveal" style={{ marginBottom: '2.375rem', transitionDelay: '120ms' }}>
              Ingeniería aplicada al margen, la resiliencia y el desempeño
              operativo de activos críticos.
            </p>

            <div className="reveal" suppressHydrationWarning style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '2rem', transitionDelay: '180ms' }}>
              <Link href="/contacto" className="btn-primary">
                Solicitar análisis estratégico
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="#soluciones" className="btn-secondary">
                Ver capacidades
              </Link>
            </div>
          </div>

          {/* RIGHT: Stats card */}
          <div className="stats-col">
            <div className="stats-card reveal-card" style={{ transitionDelay: '300ms' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.375rem' }}>
                <span className="live-label">Impacto acumulado · Portafolio activo</span>
                <div className="en-vivo-badge">
                  <span className="en-vivo-dot"></span>
                  En vivo
                </div>
              </div>

              <div style={{ marginBottom: '0.5rem' }}>
                <div className="co2-value">{co2Str}</div>
                <div className="co2-unit">
                  <span className="tt-tap">
                    tCO₂e
                    <span className="tt-pop">Toneladas de CO₂ equivalente: la unidad estándar para medir huella de carbono.</span>
                  </span>
                  {' '}evitadas acumuladas
                </div>
              </div>

              <div className="card-divider"></div>

              <div className="metrics-grid">
                <div>
                  <div className="metric-value">+150</div>
                  <div className="metric-label">Proyectos de<br/>infraestructura</div>
                </div>
                <div>
                  <div className="metric-value">≤36m</div>
                  <div className="metric-label">Payback<br/>promedio</div>
                </div>
                <div>
                  <div className="metric-value">$23.5M</div>
                  <div className="metric-label">MXN en OPEX<br/>optimizado/año</div>
                </div>
              </div>

              <div className="card-divider"></div>

              <Link href="#impacto-ambiental" className="card-link">
                <span>
                  Ver desempeño{' '}
                  <span className="tt-tap">
                    ESG
                    <span className="tt-pop">Desempeño ambiental, social y de gobernanza — indicadores de impacto sostenible que los corporativos exigen a sus proveedores.</span>
                  </span>
                  {' '}del portafolio
                </span>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

        </div>

        {/* Marquee strips */}
        <div className="marquee-strips-wrapper reveal" style={{ marginTop: '3.5rem', transitionDelay: '380ms' }} suppressHydrationWarning>

          <div className="strip-header marquee-strip-label">
            <div className="strip-line"></div>
            <span className="strip-label">Áreas de especialización</span>
            <div className="strip-line"></div>
          </div>

          <div className="marquee-row" style={{ marginBottom: '0.625rem' }}>
            <div className="marquee-track marquee-track--left">
              {SPEC_CARDS.map((c) => <MarqueeCard key={c.tag} card={c} type="spec" />)}
              {SPEC_CARDS.map((c) => (
                <div key={`dup-${c.tag}`} aria-hidden="true">
                  <MarqueeCard card={c} type="spec" />
                </div>
              ))}
            </div>
          </div>

          <div className="strip-header marquee-strip-label" style={{ marginTop: '1.25rem' }}>
            <div className="strip-line"></div>
            <span className="strip-label">Industrias que operamos</span>
            <div className="strip-line"></div>
          </div>

          <div className="marquee-row">
            <div className="marquee-track marquee-track--right">
              {IND_CARDS.map((c) => <MarqueeCard key={c.tag} card={c} type="ind" />)}
              {IND_CARDS.map((c) => (
                <div key={`dup-${c.tag}`} aria-hidden="true">
                  <MarqueeCard card={c} type="ind" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="scroll-indicator reveal" style={{ transitionDelay: '520ms' }} suppressHydrationWarning>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}
