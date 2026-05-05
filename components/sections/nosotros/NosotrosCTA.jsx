'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function NosotrosCTA() {
  return (
    <section className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,197,94,0.05)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-telos-green/15 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5"
        >
          <span className="bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium">
            Diagnóstico gratuito
          </span>

          <h2 className="text-display font-bold text-slate-900 text-balance">
            Tu operación no necesita otro proveedor.{' '}
            <span className="text-gradient-green">Necesita un aliado técnico.</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all duration-200 shadow-green-glow"
            >
              Solicitar diagnóstico
            </Link>
            <WhatsAppButton />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
