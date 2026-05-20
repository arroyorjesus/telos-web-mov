'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { USTEDES_METRICS } from '@/data/metrics'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const ACCENT_DOTS = [
  { color: '#22c55e', label: 'Electricidad' },
  { color: '#3b82f6', label: 'Agua' },
  { color: '#f97316', label: 'Gas térmico' },
]

export default function UstedesHero() {
  return (
    <section className="relative min-h-[78dvh] flex items-center overflow-hidden bg-[#021829] pt-36 pb-20">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 75% 70% at 22% 32%, #000 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 22% 32%, #000 0%, transparent 78%)',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_10%_-8%,rgba(13,92,145,0.28)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_102%_108%,rgba(13,92,145,0.14)_0%,transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div variants={item} className="mb-7 flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#2b8fd4]">01</span>
            <span className="h-px w-9 bg-white/15" />
            <span className="font-mono text-[0.7rem] font-medium tracking-[0.22em] text-white/45 uppercase">
              Portafolio · Casos reales
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-grotesk font-extrabold text-white text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.06] tracking-[-0.035em] mb-7"
          >
            Resultados reales.
            <br />
            <span className="text-[#2b8fd4]">Sin nombres. Con números.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-white/55 leading-relaxed max-w-[58ch] mb-8"
          >
            Agua, gas y electricidad optimizados en empresas, hoteles, centros
            deportivos e industrias a lo largo del país. Proyectos ejecutados,
            medidos y documentados.
          </motion.p>

          {/* Vertical dots */}
          <motion.div variants={item} className="flex items-center gap-5 mb-12">
            {ACCENT_DOTS.map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="font-mono text-[0.65rem] text-white/40 tracking-widest uppercase">{d.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Metrics spec-grid */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10"
          >
            {USTEDES_METRICS.map((m) => (
              <div key={m.label} className="bg-[#021829] flex flex-col gap-1.5 px-5 py-6">
                <p className="font-mono text-[1.85rem] lg:text-3xl font-bold text-white tracking-tight tabular-nums">
                  {m.prefix}
                  <AnimatedCounter value={parseFloat(m.value)} decimals={m.value % 1 !== 0 ? 1 : 0} />
                  {m.suffix}
                </p>
                <p className="text-xs text-white/45 leading-snug">{m.label}</p>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
