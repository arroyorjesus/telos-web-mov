'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { NOSOTROS_METRICS } from '@/data/metrics'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function NosotrosHero() {
  return (
    <section className="relative min-h-[82dvh] flex items-center overflow-hidden bg-[#021829] pt-36 pb-20">

      {/* Blueprint grid */}
      <div
        className="v2-blueprint"
        style={{
          maskImage: 'radial-gradient(ellipse 75% 70% at 22% 32%, #000 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 22% 32%, #000 0%, transparent 78%)',
        }}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_55%_45%_at_10%_-8%,rgba(13,92,145,0.30)_0%,transparent_70%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_45%_55%_at_102%_108%,rgba(13,92,145,0.16)_0%,transparent_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">

          {/* Eyebrow */}
          <motion.div variants={item} className="v2-eyebrow">
            <span className="v2-eyebrow-num">01</span>
            <span className="v2-eyebrow-line" />
            <span className="v2-eyebrow-label">Sobre TELOS</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={item} className="v2-h1">
            Desarrollamos activos energéticos.
            <br />
            <span className="accent">No vendemos equipos.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={item} className="v2-body mb-12 max-w-[58ch]">
            Somos una firma especializada en el desarrollo e implementación de
            proyectos integrales de eficiencia energética, infraestructura
            eléctrica y sustentabilidad para el sector industrial y corporativo.
            Con visión técnica, financiera y operativa de largo plazo.
          </motion.p>

          {/* Engineering spec grid */}
          <motion.div variants={item} className="v2-spec-grid">
            {NOSOTROS_METRICS.map((m) => (
              <div key={m.label} className="v2-spec-cell">
                <p className="v2-spec-value tabular-nums">
                  {m.prefix}
                  <AnimatedCounter value={parseFloat(m.value)} />
                  {m.suffix}
                </p>
                <p className="v2-spec-label">{m.label}</p>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
