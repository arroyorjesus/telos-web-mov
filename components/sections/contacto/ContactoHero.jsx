'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'

export default function ContactoHero() {
  return (
    <section className="relative inner-hero-bg min-h-[38vh] flex items-center justify-center overflow-hidden pt-36 pb-14">

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <Badge variant="green">Diagnóstico gratuito · Sin compromiso</Badge>
          <h1 className="text-hero font-bold text-white text-balance leading-tight">
            Hablemos sobre tu{' '}
            <span className="accent">potencial de ahorro.</span>
          </h1>
          <p className="text-lg max-w-xl text-balance leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Sin compromiso. Sin presión.
            <br />
            Solo una conversación sobre cómo reducir tus costos de electricidad, gas y agua.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
