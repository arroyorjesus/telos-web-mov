'use client'

import { motion } from 'framer-motion'
import { CASE_STUDIES_GAS } from '@/data/caseStudies'

const ACCENT = '#f97316'
const ACCENT_DIM = 'rgba(249,115,22,0.12)'
const ACCENT_BORDER = 'rgba(249,115,22,0.22)'
const GREEN = '#4ade80'
const GREEN_DIM = 'rgba(74,222,128,0.10)'
const GREEN_BORDER = 'rgba(74,222,128,0.18)'

const FlameIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
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

function SavingBar({ pct }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[0.6rem] text-white/35 uppercase tracking-widest">Consumo</span>
        <span className="font-mono text-xs font-bold tabular-nums" style={{ color: ACCENT }}>−{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}99)` }}
          initial={{ width: '100%' }}
          whileInView={{ width: `${100 - pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="flex justify-between">
        <span className="font-mono text-[0.6rem] text-white/25 line-through">100%</span>
        <span className="font-mono text-[0.6rem] text-white/60 font-bold">{100 - pct}%</span>
      </div>
    </div>
  )
}

function CaseCard({ cs, featured = false }) {
  if (featured) {
    return (
      <motion.div
        variants={item}
        className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden hover:bg-white/[0.07] transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      >
        <div className="grid md:grid-cols-[1fr_300px]">
          {/* Left: main info */}
          <div className="p-7 lg:p-9 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}`, color: ACCENT }}>
                <FlameIcon />
              </div>
              {cs.highlight && (
                <span className="font-mono text-[0.6rem] font-bold tracking-widest uppercase px-2 py-1 rounded" style={{ color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
                  {cs.highlight}
                </span>
              )}
            </div>

            <div>
              <h3 className="font-grotesk font-bold text-white text-xl mb-1">{cs.title}</h3>
              <p className="text-sm text-white/40">{cs.subtitle}</p>
            </div>

            <SavingBar pct={cs.savingsPct} />

            {/* CO2 */}
            <div className="rounded-xl p-3" style={{ background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}` }}>
              <p className="font-mono text-xs font-bold" style={{ color: GREEN }}>{cs.co2}</p>
            </div>
          </div>

          {/* Right: before/after */}
          <div className="flex flex-col gap-3 p-7 border-t md:border-t-0 md:border-l border-white/[0.07]">
            <p className="font-mono text-[0.6rem] font-bold tracking-[0.2em] text-white/30 uppercase mb-1">Comparativo</p>
            <div className="rounded-xl border border-white/10 bg-[#021829] p-4 flex-1">
              <p className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest mb-1.5">Antes</p>
              <p className="font-mono text-sm text-white/50 line-through tabular-nums">{cs.before}</p>
            </div>
            <div className="rounded-xl p-4 flex-1" style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest mb-1.5" style={{ color: ACCENT }}>Con TELOS</p>
              <p className="font-mono text-sm font-bold text-white tabular-nums">{cs.after}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {cs.metrics.map((m) => (
                <span key={m} className="font-mono text-[0.6rem] px-2 py-1 rounded border border-white/10 text-white/35">{m}</span>
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
      <div
        className="h-32 relative flex items-end justify-between p-5"
        style={{ background: `linear-gradient(135deg, #04243d 0%, ${ACCENT_DIM} 100%)` }}
      >
        <span className="font-mono text-[0.6rem] font-bold tracking-widest uppercase px-2 py-1 rounded" style={{ color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
          Gas térmico
        </span>
        {cs.highlight && (
          <span className="font-mono text-[0.6rem] font-black tracking-wide px-2.5 py-1 rounded-full" style={{ color: ACCENT, background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
            {cs.highlight}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="font-grotesk font-bold text-white mb-0.5">{cs.title}</h3>
          <p className="text-xs text-white/40">{cs.subtitle}</p>
        </div>

        <SavingBar pct={cs.savingsPct} />

        <div className="rounded-xl p-3" style={{ background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}` }}>
          <p className="font-mono text-xs font-bold" style={{ color: GREEN }}>{cs.co2}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/10 bg-[#021829] p-3">
            <p className="font-mono text-[0.6rem] text-white/30 uppercase tracking-widest mb-1">Antes</p>
            <p className="text-xs text-white/45 line-through">{cs.before}</p>
          </div>
          <div className="rounded-xl p-3" style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_BORDER}` }}>
            <p className="font-mono text-[0.6rem] uppercase tracking-widest mb-1" style={{ color: ACCENT }}>Con TELOS</p>
            <p className="text-xs font-bold text-white">{cs.after}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cs.metrics.map((m) => (
            <span key={m} className="font-mono text-[0.6rem] px-2 py-1 rounded border border-white/10 text-white/35">{m}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function GasCases() {
  const [featured, ...rest] = CASE_STUDIES_GAS
  return (
    <section id="gas" className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_100%,rgba(249,115,22,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 lg:mb-12"
        >
          <div className="v2-eyebrow">
            <span className="v2-eyebrow-num" style={{ color: ACCENT }}>04</span>
            <span className="v2-eyebrow-line" />
            <span className="v2-eyebrow-label">Gas térmico · Calderas de condensación</span>
          </div>
          <h2 className="v2-h2 mb-3">
            Reducción drástica de gas.
            <br />
            <span className="accent-orange">Emisiones CO₂ al mínimo.</span>
          </h2>
          <p className="text-white/45 text-sm leading-relaxed max-w-[52ch]">
            Calderas de condensación, heat pumps y recuperadores de calor. De 30% a 99% de ahorro según proyecto.
          </p>
        </motion.div>

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
