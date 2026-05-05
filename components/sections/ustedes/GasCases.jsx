'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { CASE_STUDIES_GAS } from '@/data/caseStudies'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

function SavingBar({ pct, color = 'orange' }) {
  const colors = {
    orange: 'bg-telos-orange',
    green: 'bg-telos-green',
    blue: 'bg-telos-blue',
  }
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-500">
        <span>Antes</span>
        <span className={`text-telos-${color} font-medium`}>-{pct}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colors[color]}`}
          initial={{ width: '100%' }}
          whileInView={{ width: `${100 - pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500 line-through">{100}%</span>
        <span className="text-slate-900 font-medium">{100 - pct}%</span>
      </div>
    </div>
  )
}

export default function GasCases() {
  return (
    <section id="gas" className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-telos-orange/15 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Gas térmico · Calderas de condensación"
          badgeVariant="orange"
          title="Gas térmico · Calderas de condensación"
          subtitle="Reducción drástica del consumo de gas y emisiones de CO₂ con tecnología de alta eficiencia."
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASE_STUDIES_GAS.map((cs) => (
            <motion.div
              key={cs.id}
              variants={fadeUpItem}
              className="group light-card rounded-2xl overflow-hidden hover:border-telos-orange/20 transition-all duration-300"
            >
              {/* Image area */}
              <div className="h-40 bg-gradient-to-br from-slate-200 to-telos-orange/[0.08] relative">
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="badge-orange px-2 py-0.5 rounded text-xs">Gas térmico</span>
                </div>
                {cs.highlight && (
                  <div className="absolute top-3 right-3">
                    <span className="badge-orange px-2.5 py-1 rounded-full text-xs font-bold">{cs.highlight}</span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-telos-orange">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-0.5">{cs.title}</h3>
                <p className="text-xs text-slate-500 mb-5">{cs.subtitle}</p>

                {/* Savings bar */}
                <div className="mb-4">
                  <SavingBar pct={cs.savingsPct} color="orange" />
                </div>

                {/* CO2 */}
                <div className="bg-telos-green-glow border border-telos-green/15 rounded-xl p-3 mb-4">
                  <p className="text-xs text-telos-green font-medium">{cs.co2}</p>
                </div>

                {/* Before / After */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-3">
                    <p className="text-xs text-slate-500 mb-0.5">Antes</p>
                    <p className="text-sm text-slate-600 font-medium line-through">{cs.before}</p>
                  </div>
                  <div className="bg-telos-orange-glow border border-telos-orange/15 rounded-xl p-3">
                    <p className="text-xs text-telos-orange mb-0.5">Con TELOS</p>
                    <p className="text-sm text-slate-900 font-bold">{cs.after}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cs.metrics.map((m) => (
                    <span key={m} className="badge-orange px-2 py-0.5 rounded text-xs">{m}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
