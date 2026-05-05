'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'

const CARDS = [
  {
    title: 'Nuestra especialidad',
    description:
      'Agua, gas y electricidad: las tres vertientes del consumo energético industrial.\n\nDiseñamos e implementamos soluciones integrales que ningún proveedor de un solo sistema puede ofrecer.',
    icon: (
      <svg className="w-6 h-6 text-[#0d5c91]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2h-2v9H2v2h9v9h2v-9h9v-2h-9V2z"/>
      </svg>
    ),
  },
  {
    title: 'Nuestra capacidad operativa',
    description:
      'Hasta 8 cuadrillas de 6 personas cada una, capaces de ejecutar instalaciones múltiples simultáneas en cualquier punto del país.\n\nBajo estricto cumplimiento de Normas Mexicanas e Internacionales.',
    icon: (
      <svg className="w-6 h-6 text-[#0d5c91]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82M5 5.18L12 1.41l7 3.77v4L12 13 5 9.18v-4m7-2C7.29 3.26 5.16 5 5 5c0 0 1.87 1.48 7 4.2 5.11-2.69 7-4.2 7-4.2-.16-.98-2.29-2.75-7-1.82z"/>
      </svg>
    ),
  },
]

const STATES = [
  'CDMX', 'Puebla', 'Edomex', 'Quintana Roo', 'BCS', 'Jalisco', 'NL', '+ más',
]

export default function QuienesSomos() {
  return (
    <section className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left */}
          <div>
            <SectionHeader
              badge="Quiénes somos"
              badgeVariant="white"
              title="Una empresa de ingeniería con visión de largo plazo."
              subtitle={null}
              className="mb-8"
            />

            <motion.blockquote
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pl-4 border-l-2 border-telos-green mb-8"
            >
              <p className="text-slate-900 font-medium leading-relaxed text-lg">
                No comercializamos equipos. Desarrollamos activos energéticos con visión técnica, financiera y operativa de largo plazo.
              </p>
            </motion.blockquote>

            <StaggerContainer className="flex flex-col gap-4">
              {CARDS.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUpItem}
                  className="light-card rounded-2xl p-5 hover:border-slate-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5">{card.icon}</div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>

          {/* Right — National presence */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="light-card rounded-3xl p-8">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Presencia nacional</p>
              <p className="text-slate-900 font-bold text-xl mb-2">República Mexicana</p>
              <p className="text-slate-500 text-sm mb-6">Cuadrillas activas en múltiples estados simultáneamente.</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {STATES.map((s) => (
                  <span key={s} className="bg-slate-100 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>

              <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Capacidad Operativa</p>
                <p className="text-sm text-slate-700 leading-relaxed">Múltiples cuadrillas activas simultáneamente en toda la República Mexicana, bajo Normas Mexicanas e Internacionales.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
