'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { SITE } from '@/data/site'

export default function HomeCTA() {
  return (
    <section className="relative bg-slate-50 py-section overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,197,94,0.03)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-grid opacity-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <span className="badge-green px-3 py-1.5 rounded-full text-xs font-medium">
            Diagnóstico gratuito · Sin compromiso
          </span>

          {/* Headline */}
          <h2 className="text-display font-bold text-slate-900 text-balance leading-tight">
            Convierte tu consumo energético en una{' '}
            <span className="text-telos-green">ventaja financiera.</span>
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl text-balance">
            El diagnóstico inicial no tiene costo.
            <br />
            Si existe ahorro en tu operación, TELOS lo encuentra, lo diseña y lo implementa.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-telos-green text-black font-bold text-base hover:bg-telos-green-light transition-all duration-200 shadow-green-glow hover:shadow-[0_0_50px_rgba(34,197,94,0.4)]"
            >
              Solicitar diagnóstico gratuito
            </Link>
            <WhatsAppButton
              className="px-7 py-4 text-base"
            />
          </div>

          {/* Micro trust */}
          <p className="text-xs text-slate-500">
            Sin spam. Sin compromisos.
            <br />
            Te contactaremos en menos de 24 horas hábiles.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-4 pt-6 border-t border-slate-200 w-full">
            {[
              '150+ proyectos ejecutados',
              '12+ años en energía',
              'ROI ≤ 36 meses',
              'Normas ANCE · STPS',
            ].map((trust) => (
              <span key={trust} className="flex items-center gap-1.5 text-xs text-slate-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-telos-green shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {trust}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
