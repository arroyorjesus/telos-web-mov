'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function SavingsSimulationCard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative glass-card rounded-2xl overflow-hidden p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-gray-muted uppercase tracking-widest mb-1">Simulación de ahorro</p>
          <p className="text-sm font-medium text-gray-light">Empresa tipo · Consumo alto</p>
        </div>
        <span className="badge-orange px-2.5 py-1 rounded-full text-xs font-medium">Sin optimizar</span>
      </div>

      {/* Before / After */}
      <div className="space-y-3 mb-5">
        {[
          { label: 'Electricidad (CFE)', before: 85000, after: 28000, color: 'green' },
          { label: 'Gas térmico', before: 120000, after: 60000, color: 'orange' },
          { label: 'Agua / pipas', before: 45000, after: 12000, color: 'blue' },
        ].map((row) => (
          <div key={row.label} className="space-y-1.5">
            <div className="flex justify-between text-xs text-gray-muted">
              <span>{row.label}</span>
              <span className={`text-telos-${row.color} font-medium`}>
                -{Math.round(((row.before - row.after) / row.before) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-black-border rounded-full overflow-hidden">
              <div className="h-full flex gap-0.5">
                {/* After bar */}
                <motion.div
                  className={`h-full rounded-full bg-telos-${row.color}`}
                  initial={{ width: '100%' }}
                  animate={isInView ? { width: `${(row.after / row.before) * 100}%` } : { width: '100%' }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-muted line-through">${(row.before / 1000).toFixed(0)}k</span>
              <span className="text-white font-medium">${(row.after / 1000).toFixed(0)}k / mes</span>
            </div>
          </div>
        ))}
      </div>

      {/* Total savings */}
      <div className="border-t border-black-border pt-4 mt-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-muted mb-1">Ahorro mensual total</p>
            <p className="text-2xl font-bold text-telos-green">
              $<AnimatedCounter value={150000} /> MXN
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-muted mb-1">ROI estimado</p>
            <p className="text-lg font-bold text-white">24 meses</p>
          </div>
        </div>
        <div className="mt-3 p-3 bg-telos-green-glow border border-telos-green/15 rounded-xl">
          <p className="text-xs text-telos-green font-medium">
            $1.8M MXN ahorrados en los primeros 12 meses
          </p>
        </div>
      </div>

      {/* Shimmer */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
        <div className="shimmer absolute inset-0 opacity-20" />
      </div>
    </motion.div>
  )
}
