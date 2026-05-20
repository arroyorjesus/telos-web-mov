'use client'

import { motion } from 'framer-motion'
import { NOSOTROS_VALUES } from '@/data/certifications'

// SVG icons per valor
const ICONS = {
  Eye: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  BarChart3: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/>
      <path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
    </svg>
  ),
  Clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
}

// Accent per color token
const ACCENT = {
  blue:   { color: '#2b8fd4', bg: 'rgba(43,143,212,0.10)', border: 'rgba(43,143,212,0.20)' },
  green:  { color: '#4ade80', bg: 'rgba(74,222,128,0.10)',  border: 'rgba(74,222,128,0.20)' },
  orange: { color: '#fb923c', bg: 'rgba(251,146,60,0.10)',  border: 'rgba(251,146,60,0.20)' },
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

function ValorCard({ val, large = false }) {
  const acc = ACCENT[val.color] || ACCENT.blue
  return (
    <motion.div
      variants={item}
      className={`
        rounded-2xl border border-white/10 bg-white/[0.04]
        hover:bg-white/[0.07] transition-colors duration-300
        shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]
        ${large ? 'p-8 lg:p-10 flex flex-col justify-between' : 'p-6 lg:p-7'}
      `}
    >
      {/* Icon */}
      <div
        className={`rounded-xl flex items-center justify-center shrink-0 mb-5 ${large ? 'w-12 h-12' : 'w-10 h-10'}`}
        style={{ background: acc.bg, border: `1px solid ${acc.border}`, color: acc.color }}
      >
        {ICONS[val.icon]}
      </div>

      {large && (
        <div>
          <p className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-white/30 uppercase mb-4">
            Principio core
          </p>
        </div>
      )}

      <div>
        <h3 className={`font-grotesk font-bold text-white leading-snug mb-3 ${large ? 'text-2xl lg:text-3xl' : 'text-lg'}`}>
          {val.title}
        </h3>
        <p className={`text-white/50 leading-relaxed ${large ? 'text-base' : 'text-sm'}`}>
          {val.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function ValoresSection() {
  const [first, ...rest] = NOSOTROS_VALUES

  return (
    <section className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_5%_80%,rgba(13,92,145,0.10)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Left-aligned header ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 lg:mb-14"
        >
          <div className="v2-eyebrow">
            <span className="v2-eyebrow-num">05</span>
            <span className="v2-eyebrow-line" />
            <span className="v2-eyebrow-label">Valores</span>
          </div>
          <h2 className="v2-h2">
            Lo que nos define.
          </h2>
        </motion.div>

        {/* ── Asymmetric grid: large left + 2 stacked right ─────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] gap-4 lg:gap-5"
        >
          {/* First value — large card spanning full height on both md and lg */}
          <div className="row-span-2 flex">
            <ValorCard val={first} large />
          </div>

          {/* Remaining values — stacked on the right */}
          {rest.map((val) => (
            <ValorCard key={val.title} val={val} large={false} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
