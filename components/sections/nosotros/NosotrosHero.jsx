'use client'

import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Badge from '@/components/ui/Badge'
import { NOSOTROS_METRICS } from '@/data/metrics'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function NosotrosHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-16">
      <div className="absolute inset-0 bg-grid opacity-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(13,92,145,0.03)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_100%_60%,rgba(13,92,145,0.02)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="mb-5">
            <Badge variant="brand">Sobre TELOS</Badge>
          </motion.div>

          <motion.h1 variants={item} className="text-hero font-bold text-slate-900 leading-[1.04] tracking-[-0.04em] mb-6">
            Desarrollamos activos energéticos.
            <br />
            <span className="text-[#0d5c91]">No vendemos equipos.</span>
          </motion.h1>

          <motion.p variants={item} className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-10">
            Somos una firma especializada en el desarrollo e implementación de proyectos integrales de eficiencia energética, infraestructura eléctrica y sustentabilidad para el sector industrial y corporativo.
            <br />
            Con visión técnica, financiera y operativa de largo plazo.
          </motion.p>

          {/* Metrics */}
          <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
            {NOSOTROS_METRICS.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <p className="text-3xl font-bold text-slate-900 tracking-tight">
                  {m.prefix}
                  <AnimatedCounter value={parseFloat(m.value)} />
                  {m.suffix}
                </p>
                <p className="text-xs text-slate-500">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
