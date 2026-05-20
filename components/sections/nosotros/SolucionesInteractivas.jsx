'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES } from '@/data/services'

const PROCESS = {
  agua: {
    pasos: [
      'Diagnóstico integral de consumos actuales y puntos de fuga',
      'Diseño de sistemas de captación, tratamiento y reuso',
      'Instalación con tecnología de ósmosis y filtración avanzada',
      'Monitoreo en tiempo real del consumo y calidad del agua',
    ],
    resultados: [
      { value: '40–80%', label: 'reducción en consumo de agua' },
      { value: '100%', label: 'independencia del suministro municipal' },
      { value: '0', label: 'paros por desabasto' },
      { value: 'NOM', label: 'cumplimiento normativo garantizado' },
    ],
  },
  gas: {
    pasos: [
      'Auditoría de sistemas térmicos y puntos de pérdida de calor',
      'Diseño e instalación de calderas de condensación eficientes',
      'Integración de heat pumps y recuperadores de calor',
      'Optimización de procesos térmicos y ACS',
    ],
    resultados: [
      { value: '30–99%', label: 'ahorro en factura de gas' },
      { value: 'Cero', label: 'emisiones directas en algunos casos' },
      { value: '+25%', label: 'vida útil de equipos' },
      { value: '24/7', label: 'continuidad operativa térmica' },
    ],
  },
  electricidad: {
    pasos: [
      'Auditoría energética y mapeo de cargas eléctricas',
      'Diseño de sistemas fotovoltaicos a medida',
      'Instalación de BESS (baterías de almacenamiento)',
      'Optimización de demanda y factor de potencia',
    ],
    resultados: [
      { value: '≤36m', label: 'payback garantizado' },
      { value: '100%', label: 'independencia posible de CFE' },
      { value: '0', label: 'cargos por demanda eliminados' },
      { value: '24/7', label: 'monitoreo en tiempo real' },
    ],
  },
}

// Accent colors per vertical
const ACCENT = {
  agua: '#3b82f6',
  gas: '#f97316',
  electricidad: '#22c55e',
}

// SVG icons per vertical
const ICONS = {
  agua: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z"/>
    </svg>
  ),
  gas: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 4 6 4 9c0 2.5 1 4.5 3 6 .67.5 1 1.2 1 2h8c0-.8.33-1.5 1-2 2-1.5 3-3.5 3-6 0-3-2.48-7-8-7z"/>
      <path d="M9 21h6M10 21v1h4v-1"/>
    </svg>
  ),
  electricidad: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
}

const contentVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, x: -12, transition: { duration: 0.25 } },
}

export default function SolucionesInteractivas() {
  const [selected, setSelected] = useState('agua')
  const service  = SERVICES.find(s => s.id === selected)
  const process  = PROCESS[selected]
  const accent   = ACCENT[selected]

  return (
    <section className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Left ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_-5%_60%,rgba(13,92,145,0.14)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Asymmetric header — LEFT aligned (DESIGN_VARIANCE 8) ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 lg:mb-16 max-w-2xl"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#2b8fd4]">03</span>
            <span className="h-px w-9 bg-white/15" />
            <span className="font-mono text-[0.7rem] font-medium tracking-[0.22em] text-white/45 uppercase">
              Capacidades técnicas
            </span>
          </div>
          <h2 className="font-grotesk font-extrabold text-white text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] tracking-[-0.03em] mb-4">
            Tres verticales.
            <br />
            <span className="text-[#2b8fd4]">Una estrategia integral.</span>
          </h2>
          <p className="text-white/50 text-base leading-relaxed">
            Cada solución es diagnóstica, no de catálogo. Sin auditoría, no hay propuesta.
          </p>
        </motion.div>

        {/* ── Asymmetric layout: vertical tabs left, content right ──────── */}
        <div className="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-12 items-start">

          {/* Selector — vertical pill tabs */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex lg:flex-col gap-2"
          >
            {SERVICES.map((s) => {
              const isActive = selected === s.id
              const acc      = ACCENT[s.id]
              return (
                <motion.button
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    flex-1 lg:flex-none
                    flex items-center gap-3 px-4 py-3.5 rounded-xl text-left
                    font-mono text-xs font-bold tracking-wide
                    border transition-all duration-250
                    ${isActive
                      ? 'border-white/20 bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]'
                      : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                    }
                  `}
                >
                  <span
                    className="shrink-0"
                    style={{ color: isActive ? acc : 'currentColor', transition: 'color 0.25s' }}
                  >
                    {ICONS[s.id]}
                  </span>
                  <span className="hidden lg:inline">{s.label}</span>
                  <span className="lg:hidden text-[0.65rem]">{s.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="tab-dot"
                      className="ml-auto hidden lg:block w-1.5 h-1.5 rounded-full"
                      style={{ background: acc }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid md:grid-cols-[1fr_280px] gap-6"
            >
              {/* ── Process steps ───────────────────────────────────────── */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                {/* Service header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${accent}18`, color: accent }}
                  >
                    {ICONS[selected]}
                  </div>
                  <div>
                    <p className="font-grotesk font-bold text-white text-sm">{service.title}</p>
                    <p className="text-xs text-white/40">{service.subtitle}</p>
                  </div>
                </div>

                <p className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-white/35 uppercase mb-4">
                  Metodología
                </p>

                <div className="flex flex-col gap-0">
                  {process.pasos.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.4 }}
                      className="flex gap-4 py-3.5 border-b border-white/[0.06] last:border-0"
                    >
                      <span
                        className="shrink-0 font-mono text-xs font-bold tabular-nums mt-0.5"
                        style={{ color: `${accent}90` }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm text-white/65 leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.65rem] px-2 py-1 rounded border border-white/10 text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Results metrics ──────────────────────────────────────── */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col">
                <p className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-white/35 uppercase mb-5">
                  Resultados típicos
                </p>

                <div className="flex flex-col gap-0 flex-1">
                  {process.resultados.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                      className="py-4 border-b border-white/[0.06] last:border-0"
                    >
                      <p
                        className="font-mono text-2xl font-bold tabular-nums leading-none mb-1"
                        style={{ color: accent }}
                      >
                        {r.value}
                      </p>
                      <p className="text-xs text-white/50 leading-snug">{r.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
