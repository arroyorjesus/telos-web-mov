'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function EllosCTA() {
  return (
    <section className="relative bg-white py-section overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-5"
        >
          <span className="bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium">
            Sin presión · Con información
          </span>

          <h2 className="text-display font-bold text-slate-900 text-balance">
            Compara con datos reales,{' '}
            <span className="text-[#0d5c91]">no con promesas.</span>
          </h2>

          <p className="text-slate-600 leading-relaxed max-w-xl text-balance">
            Te ayudamos a evaluar opciones con información de tu propia operación: consumo, ROI, ahorro potencial y complejidad técnica.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all duration-200 shadow-green-glow"
            >
              Solicitar análisis comparativo
            </Link>
            <WhatsAppButton />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
