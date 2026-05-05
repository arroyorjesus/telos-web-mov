'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { TELOS_BENEFITS, MARKET_LIMITATIONS } from '@/data/comparisons'

export default function BeneficiosIntegral() {
  return (
    <section className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Aliado vs. especialista de silo"
          badgeVariant="white"
          title="Lo que ganas con un aliado integral vs un especialista de silo."
          className="mb-12"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* TELOS column */}
          <MotionWrapper preset="fadeLeft" delay={0.1}>
            <div className="light-card rounded-2xl p-6 border-[#0d5c91]/20 bg-[#0d5c91]/[0.05] h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-[#0d5c91] flex items-center justify-center">
                  <span className="text-white font-black text-xs">T</span>
                </div>
                <p className="font-bold text-[#0d5c91]">Con TELOS</p>
              </div>

              <ul className="space-y-4">
                {TELOS_BENEFITS.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#0d5c91] shrink-0 mt-0.5">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    {b}
                  </motion.li>
                ))}
              </ul>
            </div>
          </MotionWrapper>

          {/* Market column */}
          <MotionWrapper preset="fadeRight" delay={0.2}>
            <div className="light-card rounded-2xl p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-500">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 9h.01M15 9h.01"/>
                    <path d="M9 15h6"/>
                  </svg>
                </div>
                <p className="font-bold text-slate-500">Con el resto del mercado</p>
              </div>

              <ul className="space-y-4">
                {MARKET_LIMITATIONS.map((l, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3 text-sm text-slate-500 leading-relaxed"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 shrink-0 mt-0.5">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                    {l}
                  </motion.li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
