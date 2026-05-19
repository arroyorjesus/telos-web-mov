'use client'

import { useState, useEffect } from 'react'
import Reveal from '@/components/ui/Reveal'

const CO2_BASE  = 2195.26
const KWH_BASE  = 3142160
const EPOCH     = new Date('2026-05-05T06:00:00Z').getTime()
const CO2_PER_SEC = 2.444  / 86400
const KWH_PER_SEC = 3467.8 / 86400

function calcLive() {
  const secs = Math.max(0, (Date.now() - EPOCH) / 1000)
  return {
    co2: CO2_BASE + CO2_PER_SEC * secs,
    kwh: KWH_BASE + KWH_PER_SEC * secs,
  }
}

function fmtK(v) {
  return v >= 1000
    ? (v / 1000).toLocaleString('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'k'
    : Math.round(v).toLocaleString('es-MX')
}

const EQ_CARDS = [
  {
    id: 'arb', label: 'Árboles equivalentes', sub: 'Árboles capturando CO₂ por 1 año', color: '#4ade80',
    calc: (co2) => co2 * 1000 / 21.77,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-7"/><path d="M9 15 7 9h10l-2 6"/><path d="M7 9 5 4h14l-2 5"/><path d="M5 4h14"/></svg>,
  },
  {
    id: 'aut', label: 'autos de gasolina / año', sub: 'Autos fuera de circulación por 1 año', color: '#fb923c',
    calc: (co2) => co2 / 4.6,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17H5v-2l2-5h10l2 5v2z"/><path d="M9 17v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1"/><path d="M19 17v1a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1"/><circle cx="7.5" cy="14.5" r="0.5" fill="currentColor"/><circle cx="16.5" cy="14.5" r="0.5" fill="currentColor"/><path d="M5 10h14"/><path d="m7 10 1.5-4h7L17 10"/></svg>,
  },
  {
    id: 'azt', label: 'partidos completos', sub: 'Partidos iluminando el Estadio Azteca', color: '#60a5fa',
    calc: (_co2, kwh) => kwh / 25000,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" opacity="0.15" stroke="currentColor"/><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    id: 'vue', label: 'vuelos de ida', sub: 'Vuelos CDMX–París por pasajero', color: '#818cf8',
    calc: (co2) => co2 / 1.7,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor" opacity="0.15" stroke="currentColor"/><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>,
  },
  {
    id: 'hog', label: 'hogares', sub: 'Hogares mexicanos abastecidos por 1 año', color: '#f472b6',
    calc: (_co2, kwh) => kwh / 1800,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="currentColor" opacity="0.15"/><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    id: 'bar', label: 'barriles', sub: 'Barriles de petróleo equivalentes evitados', color: '#fbbf24',
    calc: (_co2, kwh) => kwh / 1699.8,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>,
  },
  {
    id: 'gp', label: 'vueltas', sub: 'Vueltas al GP de México', color: '#f87171',
    calc: (_co2, kwh) => kwh / 45.1,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" fill="currentColor" opacity="0.15"/><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  },
  {
    id: 'ac', label: 'millones de horas', sub: 'Horas de minisplit eficiente funcionando', color: '#22d3ee',
    calc: (_co2, kwh) => kwh / 1_000_000,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></svg>,
  },
]

export default function ImpactoAmbientalHome() {
  const [live, setLive] = useState(calcLive)

  useEffect(() => {
    const id = setInterval(() => setLive(calcLive()), 5000)
    return () => clearInterval(id)
  }, [])

  const { co2, kwh } = live

  return (
    <section className="impact-section reveal" id="impacto-ambiental" aria-labelledby="impact-heading">
      <div className="impact-inner">

        <div className="impact-header">
          <div className="impact-badge">
            <span className="impact-badge-dot"></span>
            Impacto ambiental · En tiempo real
          </div>
          <h2 id="impact-heading" className="impact-h2">
            Impacto ambiental documentado.<br/>
            <em>En tiempo real.</em>
          </h2>
          <p className="impact-subtitle">
            Acumulado desde el inicio de operaciones de todos nuestros proyectos activos.
            Actualizado cada 5 segundos.
          </p>
        </div>

        <Reveal className="impact-counter-card reveal" style={{ '--i': 0 }}>
          <p className="impact-counter-label">CO₂e total evitado acumulado</p>
          <div className="impact-co2-num">
            {co2.toLocaleString('es-MX', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
          </div>
          <p className="impact-co2-unit">toneladas de CO₂ equivalente</p>

          <div className="impact-secondary">
            <div>
              <p className="impact-sec-num">
                {(kwh / 1000).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="impact-sec-label">MWh de energía limpia generados</p>
            </div>
            <div>
              <p className="impact-sec-num green">+2.444</p>
              <p className="impact-sec-label">tCO₂e evitadas cada día</p>
            </div>
            <div>
              <p className="impact-sec-num">3,467.8</p>
              <p className="impact-sec-label">kWh limpios generados cada día</p>
            </div>
          </div>
        </Reveal>

        <div className="impact-nudge">
          <p className="impact-nudge-text">¿Qué tan grande es ese número?</p>
          <div className="impact-nudge-arrow">
            <div className="impact-nudge-line"></div>
            <svg className="impact-nudge-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </div>

        <div className="impact-eq-grid">
          {EQ_CARDS.map((card, i) => {
            const val = card.calc(co2, kwh)
            return (
              <Reveal key={card.id} className="impact-eq-card reveal" style={{ '--i': i + 1 }}>
                <span className="impact-eq-icon" style={{ color: card.color }}>{card.icon}</span>
                <div>
                  <p className="impact-eq-num" style={{ color: card.color }}>{fmtK(val)}</p>
                  <p className="impact-eq-unit">{card.label}</p>
                </div>
                <p className="impact-eq-label">{card.sub}</p>
              </Reveal>
            )
          })}
        </div>

        <p className="impact-footer-note">
          Factores: emisión CFE México 0.444 tCO₂e/MWh · árboles 21.77 kgCO₂/año · auto gasolina 4.6 tCO₂e/año · vuelo CDMX–París 1.7 tCO₂e/pasajero · Estadio Azteca 25,000 kWh/partido · gas natural 56.1 kgCO₂e/GJ · Corte base: mayo 2026
        </p>

      </div>
    </section>
  )
}
