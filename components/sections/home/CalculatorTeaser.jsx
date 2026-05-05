'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import MotionWrapper from '@/components/ui/MotionWrapper'

const FIELDS_PREVIEW = [
  { label: 'Tipo de operación', placeholder: 'Hotel / Industria / Corporativo…', disabled: true },
  { label: 'Gasto mensual en electricidad', placeholder: '$0 MXN / mes', disabled: true },
  { label: 'Gasto mensual en gas', placeholder: '$0 MXN / mes', disabled: true },
  { label: 'Gasto mensual en agua', placeholder: '$0 MXN / mes', disabled: true },
]

export default function CalculatorTeaser() {
  return (
    <section className="relative bg-white py-section overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,197,94,0.02)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Calculadora · Fase 2"
          badgeVariant="green"
          title="Calcula cuánto ahorro puede estar escondido en tu operación."
          subtitle="Con unos cuantos datos de consumo, podrás estimar tu ahorro potencial en electricidad, gas y agua."
          align="center"
          className="mb-10"
        />

        {/* Calculator preview — blurred/locked UI */}
        <MotionWrapper preset="scaleIn" delay={0.2}>
          <div className="relative glass-card rounded-3xl overflow-hidden">
            {/* Blur overlay */}
            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/40 flex flex-col items-center justify-center gap-4 rounded-3xl">
              <div className="text-center px-6">
                <div className="w-12 h-12 rounded-2xl bg-telos-green/10 border border-telos-green/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-telos-green">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <p className="text-white font-bold text-lg mb-2">Calculadora en desarrollo</p>
                <p className="text-white/70 text-sm max-w-sm mx-auto leading-relaxed">
                  Mientras lanzamos la calculadora, solicita tu diagnóstico gratuito y te damos los números reales de tu operación.
                </p>
              </div>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all duration-200 shadow-green-glow"
              >
                Solicitar diagnóstico gratuito →
              </Link>
            </div>

            {/* Mock form */}
            <div className="p-8 opacity-30 select-none pointer-events-none">
              <div className="grid sm:grid-cols-2 gap-4">
                {FIELDS_PREVIEW.map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs text-gray-muted mb-1.5">{f.label}</label>
                    <div className="h-11 bg-slate-200 border border-slate-300 rounded-xl flex items-center px-4">
                      <span className="text-sm text-slate-500">{f.placeholder}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-12 bg-telos-green/20 border border-telos-green/30 rounded-xl" />
            </div>
          </div>
        </MotionWrapper>

        <MotionWrapper preset="fadeUp" delay={0.3} className="mt-6 text-center">
          <p className="text-xs text-gray-muted">
            Los resultados serán estimaciones preliminares.
            <br />
            El ahorro real se determina mediante diagnóstico técnico en sitio.
          </p>
        </MotionWrapper>
      </div>
    </section>
  )
}
