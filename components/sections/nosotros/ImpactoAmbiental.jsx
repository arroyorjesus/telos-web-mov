'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ── Datos base (corte 5 mayo 2026, medianoche CDMX) ──────────────────────────
const BASE_DATE    = new Date('2026-05-05T06:00:00Z') // 00:00 CDMX = 06:00 UTC
const BASE_CO2_T   = 2195.26    // tCO₂e acumuladas
const BASE_KWH     = 3142160    // kWh acumulados
const DAILY_CO2_T  = 2.444      // tCO₂e / día
const DAILY_KWH    = 3467.8     // kWh / día
const PER_SEC_CO2  = DAILY_CO2_T / 86400
const PER_SEC_KWH  = DAILY_KWH  / 86400

function calcLive() {
  const secs = Math.max(0, (Date.now() - BASE_DATE.getTime()) / 1000)
  const co2  = BASE_CO2_T + secs * PER_SEC_CO2
  const kwh  = BASE_KWH   + secs * PER_SEC_KWH
  return { co2, kwh }
}

// ── SVG icons per equivalence (no emojis — Anti-Emoji Policy) ────────────────
const EQ_ICONS = {
  arboles: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12M12 12L8 8M12 12l4-4M5 17l3-3M19 17l-3-3M3 21h18M7 12a5 5 0 0 1 5-9 5 5 0 0 1 5 9"/>
    </svg>
  ),
  autos: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l3-4h10l3 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
      <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
    </svg>
  ),
  azteca: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M2 11h20M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
      <circle cx="12" cy="15" r="2"/>
    </svg>
  ),
  vuelos: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 2.5c-1.5-1.5-3.5-1.5-5 0L11 6 2.8 4.2l-2 2 7.4 3.7L3 15H1l-1 3 3-1v2l3-1v-2l5.5-5.5 3.7 7.4 2-2z"/>
    </svg>
  ),
  hogares: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  barriles: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
      <path d="M3 12a9 3 0 0 0 18 0"/>
    </svg>
  ),
  gp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h1l3-3 4 2 3-5 3 4 1-2h2"/>
      <path d="M3 7h18M5 3l2 4M19 3l-2 4"/>
      <circle cx="7" cy="19" r="1"/><circle cx="17" cy="19" r="1"/>
    </svg>
  ),
  ac: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/>
    </svg>
  ),
}

// ── Equivalencias (se recalculan con el total vivo) ──────────────────────────
const EQ = [
  {
    id: 'arboles',
    label: 'Árboles capturando\nCO₂ por 1 año',
    calc: ({ co2 }) => (co2 * 1000) / 21.77,
    fmt:  (v) => v >= 1000 ? `${(v/1000).toLocaleString('es-MX',{minimumFractionDigits:1,maximumFractionDigits:1})}k` : Math.round(v).toLocaleString('es-MX'),
    unit: 'árboles equivalentes',
    accent: '#4ade80',
  },
  {
    id: 'autos',
    label: 'Autos fuera de\ncirculación por 1 año',
    calc: ({ co2 }) => co2 / 4.6,
    fmt:  (v) => Math.round(v).toLocaleString('es-MX'),
    unit: 'autos de gasolina',
    accent: '#fb923c',
  },
  {
    id: 'azteca',
    label: 'Partidos iluminando\nel Estadio Azteca',
    calc: ({ kwh }) => kwh / 25000,
    fmt:  (v) => v.toLocaleString('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    unit: 'partidos completos',
    accent: '#60a5fa',
  },
  {
    id: 'vuelos',
    label: 'Vuelos CDMX–París\npor pasajero',
    calc: ({ co2 }) => co2 / 1.7,
    fmt:  (v) => Math.round(v).toLocaleString('es-MX'),
    unit: 'vuelos de ida',
    accent: '#818cf8',
  },
  {
    id: 'hogares',
    label: 'Hogares mexicanos\nabastecidos por 1 año',
    calc: ({ kwh }) => kwh / 1800,
    fmt:  (v) => Math.round(v).toLocaleString('es-MX'),
    unit: 'hogares',
    accent: '#f472b6',
  },
  {
    id: 'barriles',
    label: 'Barriles de petróleo\nequivalentes evitados',
    calc: ({ kwh }) => kwh / 1699.8,
    fmt:  (v) => Math.round(v).toLocaleString('es-MX'),
    unit: 'barriles',
    accent: '#fbbf24',
  },
  {
    id: 'gp',
    label: 'Vueltas al\nGP de México',
    calc: ({ kwh }) => kwh / 45.1,
    fmt:  (v) => Math.round(v).toLocaleString('es-MX'),
    unit: 'vueltas',
    accent: '#f87171',
  },
  {
    id: 'ac',
    label: 'Horas de minisplit\neficiente funcionando',
    calc: ({ kwh }) => kwh / 1000000,
    fmt:  (v) => v.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + 'M',
    unit: 'millones de horas',
    accent: '#22d3ee',
  },
]

export default function ImpactoAmbiental() {
  const [live, setLive] = useState(() => calcLive())

  useEffect(() => {
    const t = setInterval(() => setLive(calcLive()), 5000)
    return () => clearInterval(t)
  }, [])

  const co2Str = live.co2.toLocaleString('es-MX', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  const mwhStr = (live.kwh / 1000).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <section id="impacto-ambiental" className="relative py-12 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(160deg, #04243d 0%, #0d5c91 50%, #1a7abf 100%)' }}>
      {/* Glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(255,255,255,0.07)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_100%_80%,rgba(13,92,145,0.4)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 text-xs font-medium text-white mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d802a] animate-pulse" />
            Impacto ambiental · En tiempo real
          </span>
          <h2 className="text-3xl md:text-[2.75rem] font-bold text-white leading-[1.1] tracking-tight">
            Cada segundo que pasa,<br />
            <span className="text-[#2d802a]">el planeta respira mejor.</span>
          </h2>
          <p className="text-white/75 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
            Acumulado desde el inicio de operaciones de todos nuestros proyectos activos.<br />Contador actualizado cada segundo.
          </p>
        </motion.div>

        {/* ── Main counters ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-0"
        >
          <div className="relative rounded-3xl border border-white/20 bg-[#04243d]/65 overflow-hidden px-6 py-7 md:px-14 md:py-10 text-center shadow-[0_0_100px_rgba(13,92,145,0.4)]">
            {/* Subtle inner glow top line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {/* Radial glow behind the number */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_45%,rgba(13,92,145,0.55)_0%,transparent_75%)] pointer-events-none" />

            <p className="relative text-xs text-white/70 uppercase tracking-widest mb-3">
              CO₂e total evitado acumulado
            </p>

            <div className="relative font-black text-[#2d802a] tabular-nums leading-none tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              {co2Str}
            </div>

            <p className="text-white/80 mt-2 text-lg font-light tracking-wide">
              toneladas de CO₂ equivalente
            </p>

            {/* Secondary stats */}
            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold text-white tabular-nums">{mwhStr}</p>
                <p className="text-xs text-white/75 mt-0.5">MWh de energía limpia generados</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2d802a] tabular-nums">+{DAILY_CO2_T.toFixed(3)}</p>
                <p className="text-xs text-white/75 mt-0.5">tCO₂e evitadas cada día</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white tabular-nums">{DAILY_KWH.toLocaleString('es-MX')}</p>
                <p className="text-xs text-white/75 mt-0.5">kWh limpios generados cada día</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Scroll nudge ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-2 py-3"
        >
          <p className="text-white/70 text-sm font-medium tracking-wide">
            ¿Qué tan grande es ese número?
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-px h-5 bg-gradient-to-b from-white/40 to-transparent" />
            <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── Equivalences grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {EQ.map((eq, i) => {
            const val = eq.calc(live)
            return (
              <motion.div
                key={eq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.45 }}
                className="rounded-2xl border border-white/15 bg-white/[0.05] p-4 md:p-5 flex flex-col gap-3 hover:border-white/25 transition-colors duration-300"
              >
                <span style={{ color: eq.accent }}>{EQ_ICONS[eq.id]}</span>
                <div>
                  <p
                    className="text-xl md:text-2xl font-black tabular-nums leading-tight"
                    style={{ color: eq.accent }}
                  >
                    {eq.fmt(val)}
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">{eq.unit}</p>
                </div>
                <p className="text-xs text-white/70 leading-relaxed whitespace-pre-line">
                  {eq.label}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-white/50 mt-10 max-w-2xl mx-auto leading-relaxed"
        >
          Factores: emisión CFE México 0.444 tCO₂e/MWh · árboles 21.77 kg CO₂/año · auto gasolina 4.6 tCO₂e/año · vuelo CDMX–París 1.7 tCO₂e/pasajero · Estadio Azteca 25,000 kWh/partido · Corte base: mayo 2026
        </motion.p>
      </div>
    </section>
  )
}
