'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { CASE_STUDIES_AGUA } from '@/data/caseStudies'

export default function AguaCases() {
  return (
    <section id="agua" className="relative bg-white py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-telos-blue/15 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,rgba(59,130,246,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Agua · Eficiencia hídrica"
          badgeVariant="blue"
          title="Agua · Eficiencia hídrica"
          subtitle="Tratamiento, captación pluvial y ósmosis inversa para eliminar desabasto y reducir costos hídricos."
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASE_STUDIES_AGUA.map((cs) => (
            <motion.div
              key={cs.id}
              variants={fadeUpItem}
              className="group light-card rounded-2xl overflow-hidden hover:border-telos-blue/20 transition-all duration-300"
            >
              {/* Image area */}
              <div className="h-40 bg-gradient-to-br from-slate-200 to-telos-blue/[0.08] relative">
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="badge-blue px-2 py-0.5 rounded text-xs">Agua</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-telos-blue">
                    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/>
                  </svg>
                </div>

                {/* Highlight badge */}
                <div className="absolute top-3 right-3">
                  <span className="badge-blue px-2.5 py-1 rounded-full text-xs font-bold">{cs.highlight}</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-0.5">{cs.title}</h3>
                <p className="text-xs text-slate-500 mb-4">{cs.subtitle}</p>

                {/* Problem / Result */}
                <div className="space-y-3 mb-4">
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-3">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Problema</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{cs.problem}</p>
                  </div>
                  <div className="bg-telos-blue-glow border border-telos-blue/15 rounded-xl p-3">
                    <p className="text-xs text-telos-blue font-medium uppercase tracking-wider mb-1">Resultado</p>
                    <p className="text-sm text-slate-900 leading-relaxed">{cs.result}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cs.metrics.map((m) => (
                    <span key={m} className="badge-blue px-2 py-0.5 rounded text-xs">{m}</span>
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
