'use client'

import { motion } from 'framer-motion'
import { CASE_STUDIES_AGUA } from '@/data/caseStudies'

const ACCENT = '#3b82f6'
const ACCENT_DIM = 'rgba(59,130,246,0.12)'
const ACCENT_BORDER = 'rgba(59,130,246,0.22)'

const DropIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z"/>
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

function CaseCard({ cs }) {
  return (
    <motion.div
      variants={item}
      className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col"
    >
      {/* Header */}
      <div
        className="h-32 relative flex items-end justify-between p-5"
        style={{ background: `linear-gradient(135deg, #04243d 0%, ${ACCENT_DIM} 100%)` }}
      >
        <span className="font-mono text-[0.6rem] font-bold tracking-widest uppercase px-2 py-1 rounded" style={{ color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
          Agua
        </span>
        {cs.highlight && (
          <span className="font-mono text-[0.6rem] font-black tracking-wide px-2.5 py-1 rounded-full" style={{ color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
            {cs.highlight}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="font-grotesk font-bold text-white mb-0.5">{cs.title}</h3>
          <p className="text-xs text-white/40">{cs.subtitle}</p>
        </div>

        {/* Problem / Result */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="rounded-xl border border-white/10 bg-[#021829] p-3">
            <p className="font-mono text-[0.6rem] font-bold tracking-widest text-white/30 uppercase mb-1.5">Problema</p>
            <p className="text-sm text-white/55 leading-relaxed">{cs.problem}</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
            <p className="font-mono text-[0.6rem] font-bold tracking-widest uppercase mb-1.5" style={{ color: ACCENT }}>Resultado</p>
            <p className="text-sm text-white/80 leading-relaxed font-medium">{cs.result}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex flex-wrap gap-1.5">
          {cs.metrics.map((m) => (
            <span key={m} className="font-mono text-[0.6rem] px-2 py-1 rounded border border-white/10 text-white/35">{m}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function AguaCases() {
  return (
    <section id="agua" className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_100%_40%,rgba(59,130,246,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — right-offset asymmetric */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 lg:mb-12 grid lg:grid-cols-[1fr_380px] gap-8 items-end"
        >
          <div>
            <div className="v2-eyebrow">
              <span className="v2-eyebrow-num" style={{ color: ACCENT }}>03</span>
              <span className="v2-eyebrow-line" />
              <span className="v2-eyebrow-label">Agua · Eficiencia hídrica</span>
            </div>
            <h2 className="v2-h2">
              Independencia hídrica.
              <br />
              <span className="accent">Cero paros por desabasto.</span>
            </h2>
          </div>
          <p className="text-white/45 text-sm leading-relaxed">
            Tratamiento, captación pluvial y ósmosis inversa para eliminar la dependencia del suministro municipal y reducir costos hídricos operativos.
          </p>
        </motion.div>

        {/* Cards — 3 equal weight, 1 col → 3 col, slightly different from Electricidad layout */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr] gap-4"
        >
          {CASE_STUDIES_AGUA.map((cs) => <CaseCard key={cs.id} cs={cs} />)}
        </motion.div>

      </div>
    </section>
  )
}
