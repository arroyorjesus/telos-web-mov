'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { CASE_STUDIES_ELECTRICIDAD } from '@/data/caseStudies'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function ElectricidadCases() {
  return (
    <section id="electricidad" className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-telos-green/15 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(34,197,94,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Electricidad · Sistemas fotovoltaicos"
          badgeVariant="green"
          title="Electricidad · Sistemas fotovoltaicos"
          subtitle="Generación distribuida y ahorro en factura CFE para operaciones de alto consumo."
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASE_STUDIES_ELECTRICIDAD.map((cs) => (
            <motion.div
              key={cs.id}
              variants={fadeUpItem}
              className="group light-card rounded-2xl overflow-hidden hover:border-telos-green/20 transition-all duration-300"
            >
              {/* Image area */}
              <div className="h-40 bg-gradient-to-br from-slate-200 via-slate-100 to-telos-green/[0.08] relative">
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="badge-green px-2 py-0.5 rounded text-xs">{cs.category}</span>
                </div>
                {/* Solar panel placeholder icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-telos-green">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                  </svg>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-0.5">{cs.title}</h3>
                <p className="text-xs text-slate-500 mb-4">{cs.subtitle}</p>

                {/* Key metric */}
                <div className="bg-telos-green-glow border border-telos-green/15 rounded-xl p-4 mb-4">
                  <p className="text-telos-green font-black text-xl">{cs.savingsYear}</p>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 bg-slate-100 border border-slate-200 rounded-xl p-3">
                    <p className="text-sm font-bold text-slate-900">{cs.capacity}</p>
                    <p className="text-xs text-slate-500">capacidad</p>
                  </div>
                  <div className="flex-1 bg-slate-100 border border-slate-200 rounded-xl p-3">
                    <p className="text-xs text-slate-600 leading-snug">{cs.detail}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="bg-slate-100 border border-slate-300 text-slate-600 px-2 py-0.5 rounded text-xs">{tag}</span>
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
