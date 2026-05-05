'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { HOW_WE_WORK } from '@/data/services'

const STEP_ICONS = {
  Search: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  Settings: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  BarChart3: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
    </svg>
  ),
}

const colorMap = {
  green: {
    text: 'text-telos-green',
    bg: 'bg-telos-green/10',
    border: 'border-telos-green/20',
    badge: 'bg-telos-green/10 border-telos-green/20 text-telos-green',
    numBg: 'bg-green-50 border-green-200 text-telos-green',
  },
  blue: {
    text: 'text-[#0d5c91]',
    bg: 'bg-[#0d5c91]/10',
    border: 'border-[#0d5c91]/20',
    badge: 'bg-[#0d5c91]/10 border-[#0d5c91]/20 text-[#0d5c91]',
    numBg: 'bg-blue-50 border-blue-200 text-[#0d5c91]',
  },
  orange: {
    text: 'text-telos-orange',
    bg: 'bg-telos-orange/10',
    border: 'border-telos-orange/20',
    badge: 'bg-telos-orange/10 border-telos-orange/20 text-telos-orange',
    numBg: 'bg-orange-50 border-orange-200 text-telos-orange',
  },
}

export default function HowWeWorkSection() {
  return (
    <section className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(13,92,145,0.03)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Cómo trabajamos"
          badgeVariant="brand-light"
          title="Tres pasos.&#10;Resultados medibles desde el día uno."
          subtitle="Un proceso claro, sin improvisación, con métricas reales en cada etapa."
          titleClass="text-slate-900"
          subtitleClass="text-slate-500"
          className="mb-12 lg:mb-16"
        />

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-12 bottom-12 w-px bg-gradient-to-b from-telos-green/40 via-[#0d5c91]/40 to-telos-orange/40 hidden md:block" />

          <div className="flex flex-col gap-6">
            {HOW_WE_WORK.map((step, i) => {
              const c = colorMap[step.color]
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-6 md:gap-10"
                >
                  {/* Step number */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center font-bold text-sm z-10 ${c.numBg}`}>
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 flex-1 hover:border-slate-300 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.text} shrink-0`}>
                        {STEP_ICONS[step.icon]}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm mb-4">{step.description}</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium ${c.badge}`}>
                          <span className={`w-1 h-1 rounded-full bg-current`} />
                          {step.badge}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
