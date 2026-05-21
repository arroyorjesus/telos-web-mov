'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES } from '@/data/services'
import GlossaryTerm from '@/components/ui/GlossaryTerm'

// Estado A → Estado B: el antes/después que ve el Gerente de Operaciones
const PROCESO = {
  agua: {
    estadoA: 'Dependencia y riesgo de desabasto',
    estadoB: 'Autonomía hídrica total',
    pasos: [
      { antes: 'Dependencia total del suministro municipal', despues: 'Sistema autónomo: ósmosis, captación y reuso propio' },
      { antes: 'Costo recurrente de pipas de agua ($X / mes)', despues: 'Ahorro en logística hídrica desde el primer mes' },
      { antes: 'Riesgo sanitario y paros operativos por desabasto', despues: 'Cero paros · Calidad normada · NOM garantizada' },
      { antes: 'Sin monitoreo ni control de consumo', despues: 'Telemetría en tiempo real del consumo y calidad' },
    ],
    resultados: [
      { value: '40–80%', label: 'reducción en costo hídrico operativo' },
      { value: '100%', label: 'autonomía del suministro municipal' },
      { value: '0',     label: 'paros por desabasto' },
      { value: '≤36m',  label: 'payback garantizado por contrato' },
    ],
  },
  gas: {
    estadoA: 'Activos obsoletos y fuga de calor',
    estadoB: 'Sistemas de alta eficiencia que se pagan solos',
    pasos: [
      { antes: 'Calderas viejas con eficiencia térmica < 70%', despues: 'Calderas de condensación: eficiencia > 95%' },
      { antes: 'Fuga de calor no recuperada = dinero que se escapa', despues: 'Recuperadores de calor: desperdicio cero' },
      { antes: 'Factura de gas absorbida como costo fijo', despues: 'El ahorro generado paga la inversión completa' },
      { antes: 'Sin datos de consumo térmico por zona', despues: 'Monitoreo SCADA por zona y por equipo' },
    ],
    resultados: [
      { value: '30–99%', label: 'ahorro en factura de gas' },
      { value: '>95%',   label: 'eficiencia térmica post-instalación' },
      { value: '0',      label: 'desperdicio térmico residual' },
      { value: '≤36m',   label: 'payback garantizado por contrato' },
    ],
  },
  electricidad: {
    estadoA: 'Tarifas variables e incertidumbre de CFE',
    estadoB: 'Costo energético bajo control total',
    pasos: [
      { antes: 'Tarifa horaria y cargos por demanda impredecibles', despues: 'Costo por kWh fijo y predecible con generación propia' },
      { antes: 'Apagones de red detienen la operación', despues: 'BESS garantiza continuidad ante cortes de red' },
      { antes: '100% de dependencia de CFE = pasivo estructural', despues: 'Hasta 90% de reducción en factura CFE' },
      { antes: 'Cero visibilidad del consumo eléctrico por área', despues: 'Dashboard en tiempo real: consumo, generación, ahorro' },
    ],
    resultados: [
      { value: '≤36m',  label: 'payback garantizado por contrato' },
      { value: '−90%',  label: 'reducción máxima en factura CFE' },
      { value: '0',     label: 'cargos por demanda tras optimización' },
      { value: '24/7',  label: 'continuidad operativa con BESS' },
    ],
  },
}

// Colores Telos por vertical
const ACCENT = {
  agua:         '#0d5c91',  // Azul Telos
  gas:          '#f97316',  // Naranja Telos
  electricidad: '#2d802a',  // Verde Telos
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
  const proceso  = PROCESO[selected]
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
          <span className="section-badge badge-green" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            Agua · Gas · Electricidad
          </span>
          <h2 className="v2-h2 mb-4">
            No es un catálogo.
            <br />
            <span className="accent">Es una solución de negocio.</span>
          </h2>
          <p className="v2-body">
            Para cada Gerente de Operaciones: diagnóstico del estado actual, diseño del estado objetivo y garantía de{' '}
            <GlossaryTerm term="Payback" dark>payback</GlossaryTerm>
            {' '}por contrato.
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
              {/* ── Estado A → Estado B ─────────────────────────────────── */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 lg:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                {/* Contrast header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}18`, color: accent }}>
                    {ICONS[selected]}
                  </div>
                  <div>
                    <p className="font-grotesk font-bold text-white text-sm">{service.title}</p>
                    <p className="text-xs text-white/40">{service.subtitle}</p>
                  </div>
                </div>

                {/* A → B state labels */}
                <div className="flex items-center gap-3 mb-5 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="font-mono text-[0.6rem] font-bold tracking-widest uppercase text-red-400/70 line-through">{proceso.estadoA}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-white/30">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-mono text-[0.6rem] font-bold tracking-widest uppercase" style={{ color: accent }}>{proceso.estadoB}</span>
                </div>

                <div className="flex flex-col gap-0">
                  {proceso.pasos.map((paso, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.4 }}
                      className="py-3.5 border-b border-white/[0.06] last:border-0 grid grid-cols-[1fr_16px_1fr] gap-2 items-start"
                    >
                      <p className="text-xs text-white/35 leading-relaxed line-through">{paso.antes}</p>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-white/20">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-xs text-white/75 leading-relaxed font-medium">{paso.despues}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[0.65rem] px-2 py-1 rounded border border-white/10 text-white/40">{tag}</span>
                  ))}
                </div>
              </div>

              {/* ── Resultados garantizados ──────────────────────────────── */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col">
                <p className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-white/35 uppercase mb-5">
                  Resultados garantizados
                </p>

                <div className="flex flex-col gap-0 flex-1">
                  {proceso.resultados.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.4 }}
                      className="py-4 border-b border-white/[0.06] last:border-0"
                    >
                      <p className="font-mono text-2xl font-bold tabular-nums leading-none mb-1" style={{ color: accent }}>
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
