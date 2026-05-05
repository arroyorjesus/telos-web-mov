'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { CERTIFICATIONS } from '@/data/certifications'

const colorMap = {
  green: 'text-telos-green bg-telos-green-glow border-telos-green/20',
  orange: 'text-telos-orange bg-telos-orange-glow border-telos-orange/20',
  white: 'text-slate-700 bg-slate-100 border-slate-300',
}

export default function Certificaciones() {
  return (
    <section className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Certificaciones"
          badgeVariant="white"
          title="Capacidad certificada. Operación normada."
          subtitle="Certificaciones nacionales e internacionales que respaldan cada instalación que realizamos."
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeUpItem}
              className="light-card rounded-2xl p-5 hover:border-slate-300 transition-all duration-300"
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${colorMap[cert.color]}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1 leading-snug">{cert.title}</h3>
                  <p className="text-xs text-slate-500">{cert.subtitle}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-xs text-slate-600">
                    {cert.issuer}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
