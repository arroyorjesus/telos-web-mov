'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES } from '@/data/services'

const PROCESS = {
  agua: {
    cómoLaHacemos: [
      'Diagnóstico integral de consumos actuales y puntos de fuga',
      'Diseño de sistemas de captación, tratamiento y reuso',
      'Instalación con tecnología de ósmosis y filtración avanzada',
      'Monitoreo en tiempo real del consumo y calidad del agua',
    ],
    resultados: [
      'Eliminación de paros por desabasto',
      'Reducción de 40–80% en consumo de agua',
      'Independencia del suministro municipal',
      'Cumplimiento normativo ambiental',
    ],
  },
  gas: {
    cómoLaHacemos: [
      'Auditoría de sistemas térmicos y puntos de pérdida de calor',
      'Diseño e instalación de calderas de condensación eficientes',
      'Integración de heat pumps y recuperadores de calor',
      'Optimización de procesos térmicos y ACS',
    ],
    resultados: [
      'Ahorro de 30–99% en factura de gas',
      'Reducción masiva de emisiones CO₂',
      'Mayor vida útil de equipos y menos mantenimiento',
      'Continuidad operativa térmica garantizada',
    ],
  },
  electricidad: {
    cómoLaHacemos: [
      'Auditoría energética y mapeo de cargas eléctricas',
      'Diseño de sistemas fotovoltaicos a medida',
      'Instalación de BESS (baterías de almacenamiento)',
      'Optimización de demanda y eliminación de factor de potencia',
    ],
    resultados: [
      'Hasta 100% independencia de CFE',
      'Eliminación de cargos por demanda',
      'Monitoreo en tiempo real 24/7',
      'ROI garantizado ≤ 36 meses',
    ],
  },
}

export default function SolucionesInteractivas() {
  const [selected, setSelected] = useState('agua')
  const service = SERVICES.find(s => s.id === selected)
  const process = PROCESS[selected]

  return (
    <section className="relative bg-white py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Nuestras soluciones.
            <br />
            Cómo las hacemos.
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Tres verticales, una estrategia integral.
            <br />
            Cada solución es diagnóstica, no de catálogo.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-6">
          {/* Selector */}
          <div className="lg:col-span-3 flex gap-3 mb-8">
            {SERVICES.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setSelected(service.id)}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selected === service.id
                    ? 'bg-[#0d5c91] text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {service.label}
              </motion.button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-3 grid lg:grid-cols-3 gap-6"
            >
              {/* Left: Description */}
              <motion.div className="light-card rounded-2xl p-6 lg:p-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.colorHex}15`, color: service.colorHex }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    {service.id === 'agua' && <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0z"/>}
                    {service.id === 'gas' && <path d="M13 2H11v7H4v2h7v7h2v-7h7v-2h-7z"/>}
                    {service.id === 'electricidad' && <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {service.longDescription}
                </p>
                <div className="space-y-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-1 rounded text-xs bg-slate-100 text-slate-700 mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Center: How we do it */}
              <motion.div className="light-card rounded-2xl p-6 lg:p-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Cómo lo hacemos</h4>
                <div className="space-y-3">
                  {process.cómoLaHacemos.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3"
                    >
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: service.colorHex }}
                      >
                        {i + 1}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Results */}
              <motion.div className="light-card rounded-2xl p-6 lg:p-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4">Resultados</h4>
                <div className="space-y-3">
                  {process.resultados.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3 items-start"
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5"
                        style={{ backgroundColor: `${service.colorHex}20` }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={service.colorHex} strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </span>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {result}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
