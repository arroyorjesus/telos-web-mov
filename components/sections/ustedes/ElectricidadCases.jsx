'use client'

import { motion } from 'framer-motion'
import { CASE_STUDIES_ELECTRICIDAD } from '@/data/caseStudies'

const ACCENT = '#22c55e'
const ACCENT_DIM = 'rgba(34,197,94,0.12)'
const ACCENT_BORDER = 'rgba(34,197,94,0.22)'

const LightningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
)

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

function CaseCard({ cs, featured = false }) {
  if (featured) {
    return (
      <motion.div
        variants={item}
        className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      >
        <div className="grid md:grid-cols-[1fr_320px]">
          {/* Header panel */}
          <div
            className="p-7 lg:p-9 flex flex-col justify-between min-h-[180px]"
            style={{ background: `linear-gradient(135deg, #04243d 0%, ${ACCENT_DIM} 100%)` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
                  <LightningIcon />
                </div>
                <span className="font-mono text-[0.65rem] font-bold tracking-widest uppercase" style={{ color: ACCENT }}>
                  {cs.category}
                </span>
              </div>
              <span className="font-mono text-[0.6rem] text-white/30 tracking-widest uppercase border border-white/10 px-2 py-1 rounded">
                Destacado
              </span>
            </div>
            <div>
              <h3 className="font-grotesk font-bold text-white text-xl mb-1">{cs.title}</h3>
              <p className="text-sm text-white/45">{cs.subtitle}</p>
            </div>
          </div>

          {/* Stats panel */}
          <div className="p-7 flex flex-col gap-4 border-t md:border-t-0 md:border-l border-white/[0.07]">
            <div className="rounded-xl p-4" style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">OPEX optimizado / año</p>
              <p className="font-mono font-black text-2xl tabular-nums" style={{ color: ACCENT }}>{cs.savingsYear}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-[#021829] p-3">
                <p className="font-mono text-xl font-bold text-white tabular-nums">{cs.capacity}</p>
                <p className="text-xs text-white/40 mt-0.5">capacidad instalada</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#021829] p-3">
                <p className="text-xs text-white/55 leading-snug">{cs.detail}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cs.tags.map((tag) => (
                <span key={tag} className="font-mono text-[0.6rem] px-2 py-1 rounded border border-white/10 text-white/35">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={item}
      className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      {/* Header */}
      <div
        className="h-32 flex items-end p-5"
        style={{ background: `linear-gradient(135deg, #04243d 0%, ${ACCENT_DIM} 100%)` }}
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.6rem] font-bold tracking-widest uppercase px-2 py-1 rounded" style={{ color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
            {cs.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="font-grotesk font-bold text-white mb-0.5">{cs.title}</h3>
          <p className="text-xs text-white/40">{cs.subtitle}</p>
        </div>

        <div className="rounded-xl p-4" style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
          <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-1">Ahorros / año</p>
          <p className="font-mono font-black text-lg tabular-nums" style={{ color: ACCENT }}>{cs.savingsYear}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/10 bg-[#021829] p-3">
            <p className="font-mono text-sm font-bold text-white tabular-nums">{cs.capacity}</p>
            <p className="text-xs text-white/35 mt-0.5">capacidad</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-[#021829] p-3">
            <p className="text-xs text-white/50 leading-snug">{cs.detail}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cs.tags.map((tag) => (
            <span key={tag} className="font-mono text-[0.6rem] px-2 py-1 rounded border border-white/10 text-white/35">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ElectricidadCases() {
  const [featured, ...rest] = CASE_STUDIES_ELECTRICIDAD
  return (
    <section id="electricidad" className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_0%_60%,rgba(34,197,94,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 lg:mb-12"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-xs font-bold tracking-[0.22em]" style={{ color: ACCENT }}>02</span>
            <span className="h-px w-9 bg-white/15" />
            <span className="font-mono text-[0.7rem] font-medium tracking-[0.22em] text-white/45 uppercase">
              Electricidad · Sistemas fotovoltaicos
            </span>
          </div>
          <h2 className="font-grotesk font-extrabold text-white text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] tracking-[-0.03em] mb-3">
            Generación distribuida.
            <br />
            <span style={{ color: ACCENT }}>Independencia de CFE.</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed max-w-[52ch]">
            Sistemas fotovoltaicos con BESS para operaciones de alto consumo. ROI garantizado en ≤ 36 meses.
          </p>
        </motion.div>

        {/* Cards — featured first (full-width), then 2 below */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col gap-4"
        >
          <CaseCard cs={featured} featured />
          <div className="grid md:grid-cols-2 gap-4">
            {rest.map((cs) => <CaseCard key={cs.id} cs={cs} />)}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
