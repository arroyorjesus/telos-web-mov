'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import SavingsSimulationCard from '@/components/media/SavingsSimulationCard'
import { PROBLEMS } from '@/data/services'

const PROBLEM_ICONS = {
  TrendingUp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  AlertTriangle: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  ),
  Layers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </svg>
  ),
}

const colorMap = {
  orange: { icon: 'text-telos-orange', bg: 'bg-telos-orange-glow', border: 'border-telos-orange/20' },
  red: { icon: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  blue: { icon: 'text-telos-blue', bg: 'bg-telos-blue-glow', border: 'border-telos-blue/20' },
}

export default function ProblemSection() {
  return (
    <section className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div>
            <SectionHeader
              badge="El problema"
              badgeVariant="orange"
              title="Cada mes sin optimizar es dinero que ya no regresa."
              subtitle="La mayoría de las empresas no sabe exactamente dónde está perdiendo dinero: electricidad, gas, agua o la suma invisible de los tres."
              className="mb-10"
            />

            <StaggerContainer className="flex flex-col gap-4" delay={0.2}>
              {PROBLEMS.map((problem) => {
                const c = colorMap[problem.color] || colorMap.orange
                return (
                  <motion.div
                    key={problem.title}
                    variants={fadeUpItem}
                    className={`light-card rounded-2xl p-5 border ${c.border} hover:scale-[1.01] transition-transform duration-200`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-9 h-9 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0 ${c.icon}`}>
                        {PROBLEM_ICONS[problem.icon]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{problem.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{problem.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </StaggerContainer>
          </div>

          {/* Right — Savings simulation */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <SavingsSimulationCard />

            {/* Context note */}
            <p className="mt-4 text-xs text-slate-500 text-center">
              Simulación basada en rangos promedio.
              <br />
              Los valores reales se determinan mediante diagnóstico técnico.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
