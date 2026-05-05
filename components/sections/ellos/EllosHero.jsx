'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function EllosHero() {
  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-16">
      <div className="absolute inset-0 bg-grid opacity-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(13,92,145,0.02)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div variants={item} className="mb-5">
            <Badge variant="brand">Comparativa de mercado</Badge>
          </motion.div>

          <motion.h1 variants={item} className="text-hero font-bold text-slate-900 leading-[1.04] tracking-[-0.04em] mb-5">
            El mercado tiene muchas opciones.
            <br />
            <span className="text-[#0d5c91]">Pocas resuelven el problema completo.</span>
          </motion.h1>

          <motion.p variants={item} className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Antes de decidir con quién trabajar, conviene entender qué hace cada quien y qué no hace.
            <br />
            Sin nombres. Con hechos. Para que decidas con información.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
