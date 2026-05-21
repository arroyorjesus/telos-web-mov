'use client'

import { motion } from 'framer-motion'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { TECHNOLOGY_ORIGINS } from '@/data/comparisons'

const colorMap = {
  orange: 'text-telos-orange bg-telos-orange-glow border-telos-orange/20',
  green: 'text-telos-green bg-telos-green-glow border-telos-green/20',
  blue: 'text-telos-blue bg-telos-blue-glow border-telos-blue/20',
}

export default function TecnologiaInternacional() {
  return (
    <section className="relative py-section overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 max-w-2xl"
            >
              <span className="section-badge badge-blue" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
                Tecnología
              </span>
              <h2 className="section-h2" style={{ marginBottom: '0.875rem' }}>
                Acceso a lo mejor del mundo.<br />
                Sin restricciones de marca.
              </h2>
              <p className="section-sub">
                No estamos casados con un fabricante. Seleccionamos la tecnología
                correcta para cada proyecto, de donde venga.
              </p>
            </motion.div>

            <div className="space-y-4">
              {[
                { title: 'Sin dependencia de marca única', description: 'Evaluamos tecnología por desempeño y ROI, no por convenios comerciales exclusivos.' },
                { title: 'Tecnología de punta en cada vertical', description: 'La mejor solución para calderas puede venir de Italia.\nPara fotovoltaico, de Asia.\nPara agua, de EE.UU.\nTú recibes lo mejor de cada origen.' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="light-card rounded-xl p-4"
                >
                  <h4 className="font-semibold text-slate-900 text-sm mb-1.5">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Country cards */}
          <StaggerContainer className="grid grid-cols-2 gap-4" delay={0.2}>
            {TECHNOLOGY_ORIGINS.map((tech) => {
              const c = colorMap[tech.color]
              return (
                <motion.div
                  key={tech.country}
                  variants={fadeUpItem}
                  className={`light-card rounded-2xl p-5 border ${c.split(' ')[2] || ''} hover:border-opacity-50 transition-all duration-300`}
                >
                  <div className="text-3xl mb-3">{tech.flag}</div>
                  <p className="font-bold text-slate-900 mb-2">{tech.country}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{tech.specialty}</p>
                </motion.div>
              )
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
