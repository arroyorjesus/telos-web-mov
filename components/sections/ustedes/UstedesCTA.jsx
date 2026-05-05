'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function UstedesCTA() {
  return (
    <section className="relative bg-white py-section overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,197,94,0.05)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-telos-green/15 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-5"
        >
          <span className="badge-green px-3 py-1.5 rounded-full text-xs font-medium">
            Tu turno
          </span>

          <h2 className="text-display font-bold text-slate-900 text-balance">
            La siguiente empresa{' '}
            <span className="text-gradient-green">debería ser la tuya.</span>
          </h2>

          <p className="text-slate-600 leading-relaxed max-w-xl text-balance">
            Si tu operación consume agua, gas o electricidad todos los días, probablemente ya hay dinero que puede recuperarse desde el primer mes.
          </p>

          <p className="text-slate-500 text-sm italic">
            ¿Sabes cuánto dinero estás dejando de ahorrar cada mes?
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all duration-200 shadow-green-glow"
            >
              Calcular mi ahorro potencial →
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-medium text-sm hover:bg-slate-200 transition-all duration-200"
            >
              Solicitar diagnóstico gratuito
            </Link>
          </div>
          <WhatsAppButton variant="minimal" />
        </motion.div>
      </div>
    </section>
  )
}
