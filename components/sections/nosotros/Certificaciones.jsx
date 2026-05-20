'use client'

import { motion } from 'framer-motion'
import { CERTIFICATIONS } from '@/data/certifications'

// Map old v1 colors to accent tokens
const ACCENT = {
  green:  { color: '#4ade80', bg: 'rgba(74,222,128,0.10)', border: 'rgba(74,222,128,0.20)' },
  orange: { color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.20)' },
  white:  { color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.15)' },
}

// Certification badge icon
function BadgeIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4"/>
      <path d="M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
    </svg>
  )
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Certificaciones() {
  return (
    <section className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_100%_20%,rgba(13,92,145,0.10)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Asymmetric header ──────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-20 mb-14 lg:mb-16 items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#2b8fd4]">05</span>
              <span className="h-px w-9 bg-white/15" />
              <span className="font-mono text-[0.7rem] font-medium tracking-[0.22em] text-white/45 uppercase">
                Certificaciones
              </span>
            </div>
            <h2 className="font-grotesk font-extrabold text-white text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] tracking-[-0.03em]">
              Capacidad certificada.
              <br />
              <span className="text-[#2b8fd4]">Operación normada.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/45 text-sm leading-relaxed"
          >
            Certificaciones nacionales e internacionales que respaldan cada
            instalación que realizamos. Sin excepciones.
          </motion.p>
        </div>

        {/* ── Asymmetric grid: 5-col × 2-row with first card full-height left ─ */}
        {/* Responsive: single column on mobile, 2-col on md, asymmetric on lg */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-4"
        >
          {CERTIFICATIONS.map((cert, i) => {
            const acc = ACCENT[cert.color] || ACCENT.white
            return (
              <motion.div
                key={cert.title}
                variants={item}
                className={`
                  rounded-2xl border bg-white/[0.04] p-5 lg:p-6
                  hover:bg-white/[0.07] transition-colors duration-300
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
                  ${i === 0 ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''}
                `}
                style={{ borderColor: i === 0 ? acc.border : 'rgba(255,255,255,0.08)' }}
              >
                {/* Top: badge icon + issuer tag */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: acc.bg, border: `1px solid ${acc.border}` }}
                  >
                    <BadgeIcon color={acc.color} />
                  </div>
                  <span
                    className="font-mono text-[0.6rem] font-bold tracking-widest px-2 py-1 rounded border"
                    style={{ color: acc.color, borderColor: acc.border, background: acc.bg }}
                  >
                    {cert.issuer}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-grotesk font-bold text-white text-sm leading-snug mb-1.5">
                  {cert.title}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed">{cert.subtitle}</p>

                {/* Vertical tag */}
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <span className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest">
                    {cert.vertical}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
