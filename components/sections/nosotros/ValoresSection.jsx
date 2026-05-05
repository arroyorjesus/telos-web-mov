'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { NOSOTROS_VALUES } from '@/data/certifications'

const ICONS = {
  Eye: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  BarChart3: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
    </svg>
  ),
  Clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
}

const colorMap = {
  blue: { icon: 'text-telos-blue', bg: 'bg-telos-blue-glow', border: 'border-telos-blue/20' },
  green: { icon: 'text-telos-green', bg: 'bg-telos-green-glow', border: 'border-telos-green/20' },
  orange: { icon: 'text-telos-orange', bg: 'bg-telos-orange-glow', border: 'border-telos-orange/20' },
}

export default function ValoresSection() {
  return (
    <section className="relative bg-white py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Valores"
          badgeVariant="white"
          title="Lo que nos define."
          subtitle={null}
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {NOSOTROS_VALUES.map((val) => {
            const c = colorMap[val.color]
            return (
              <motion.div
                key={val.title}
                variants={fadeUpItem}
                className="light-card rounded-2xl p-7 hover:border-slate-300 transition-all duration-300 group"
              >
                <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.icon} mb-5`}>
                  {ICONS[val.icon]}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3">{val.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{val.description}</p>
              </motion.div>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
