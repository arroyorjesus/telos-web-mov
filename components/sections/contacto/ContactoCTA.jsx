'use client'

import { motion } from 'framer-motion'
import { SITE } from '@/data/site'

export default function ContactoCTA() {
  return (
    <section className="relative bg-white py-section overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,197,94,0.04)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-telos-green/10 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-5"
        >
          <h2 className="text-display font-bold text-slate-900 text-balance">
            Empieza con datos.{' '}
            <span className="text-gradient-green">Decide con claridad.</span>
          </h2>
          <p className="text-slate-600">Elige tu medio preferido y agenda tu diagnóstico inicial.</p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-medium text-sm hover:bg-slate-200 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              Enviar email
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25d366] text-slate-900 font-bold text-sm hover:bg-[#20ba5a] transition-colors"
            >
              WhatsApp directo
            </a>
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-medium text-sm hover:bg-slate-200 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18L6.56 2a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.61 9.81a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Llamar ahora
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
