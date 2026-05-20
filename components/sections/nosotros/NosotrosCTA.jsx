'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NosotrosCTA() {
  return (
    <section className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      {/* Subtle top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Centered radial glow — acceptable for terminal CTA */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,rgba(13,92,145,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_40%_at_50%_100%,rgba(13,92,145,0.10)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.05]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2b8fd4] animate-pulse" />
            <span className="font-mono text-[0.68rem] font-medium tracking-[0.18em] text-white/50 uppercase">
              Diagnóstico gratuito
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-grotesk font-extrabold text-white text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] tracking-[-0.03em] text-balance">
            Tu operación no necesita
            <br />
            otro proveedor.{' '}
            <span className="text-[#2b8fd4]">Necesita un aliado técnico.</span>
          </h2>

          {/* Subtext */}
          <p className="text-white/45 text-base leading-relaxed max-w-[48ch]">
            Diagnóstico real, propuesta a medida, ejecución llave en mano.
            Sin compromisos hasta que veas los números.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0d5c91] text-white font-semibold text-sm hover:bg-[#1a7abf] active:scale-[0.98] transition-all duration-200 shadow-[0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.10)]"
            >
              Solicitar diagnóstico
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <a
              href="https://wa.me/5215512345678?text=Hola%2C%20quiero%20solicitar%20un%20diagn%C3%B3stico%20energ%C3%A9tico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/15 bg-white/[0.05] text-white/75 font-semibold text-sm hover:bg-white/[0.09] hover:text-white active:scale-[0.98] transition-all duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Engineering footnote */}
          <p className="font-mono text-[0.65rem] text-white/25 tracking-wide mt-2">
            Respuesta en menos de 24 h · Sin costo ni compromiso
          </p>
        </motion.div>
      </div>
    </section>
  )
}
