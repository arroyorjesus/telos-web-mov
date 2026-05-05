'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

export default function ContactoHero() {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-white pt-32 pb-12">
      <div className="absolute inset-0 bg-grid opacity-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(45,128,42,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <Badge variant="green">Diagnóstico gratuito · Sin compromiso</Badge>
          <h1 className="text-hero font-bold text-slate-900 text-balance leading-tight">
            Hablemos sobre tu{' '}
            <span className="text-gradient-green">potencial de ahorro.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl text-balance leading-relaxed">
            Sin compromiso. Sin presión.
            <br />
            Solo una conversación sobre cómo reducir tus costos de electricidad, gas y agua.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
