'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { SCENARIOS } from '@/data/comparisons'
import Link from 'next/link'

const ICONS = {
  Flame: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  Droplets: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
    </svg>
  ),
  Zap: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
  Settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
}

const colorMap = {
  orange: 'text-telos-orange bg-telos-orange-glow border-telos-orange/20',
  blue: 'text-telos-blue bg-telos-blue-glow border-telos-blue/20',
  green: 'text-telos-green bg-telos-green-glow border-telos-green/20',
  white: 'text-slate-900 bg-slate-100 border-slate-200',
}

export default function EscenariosReales() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative py-section overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-2xl"
        >
          <span className="section-badge badge-blue" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            Escenarios reales
          </span>
          <h2 className="section-h2">
            Cuando el problema es real, una solución parcial no alcanza.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Scenarios list */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            {SCENARIOS.map((s, i) => {
              const c = colorMap[s.color]
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    active === i
                      ? `${c} `
                      : 'light-card hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`shrink-0 ${active === i ? '' : 'text-slate-500'}`}>
                      {ICONS[s.icon]}
                    </div>
                    <p className={`text-sm font-medium ${active === i ? 'text-slate-900' : 'text-slate-600'}`}>
                      {s.problem}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Answer panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col gap-4"
              >
                <div className="light-card rounded-2xl p-6 flex-1 bg-[#0d5c91]/[0.06] border-[#0d5c91]/15">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-lg bg-[#0d5c91] flex items-center justify-center">
                      <span className="text-white font-black text-xs">T</span>
                    </div>
                    <p className="text-xs font-bold text-[#0d5c91] uppercase tracking-wider">TELOS</p>
                  </div>
                  <p className="text-slate-900 leading-relaxed">{SCENARIOS[active].telosAnswer}</p>
                </div>

                <div className="light-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Otros proveedores</p>
                  </div>
                  <p className="text-slate-500 leading-relaxed">{SCENARIOS[active].othersAnswer}</p>
                </div>

                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-medium text-sm hover:bg-slate-200 transition-all duration-200"
                >
                  Analizar mi caso →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
