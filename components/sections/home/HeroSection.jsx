'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import Badge from '@/components/ui/Badge'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { HOME_METRICS } from '@/data/metrics'
import EnergyFlowVisual from '@/components/media/EnergyFlowVisual'
import CO2Counter from '@/components/sections/home/CO2Counter'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const VERTICALS = [
  { label: 'Agua', color: 'blue' },
  { label: 'Gas térmico', color: 'orange' },
  { label: 'Electricidad', color: 'green' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden isolate bg-white pt-32 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(34,197,94,0.04)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_80%_at_-5%_60%,rgba(59,130,246,0.03)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_105%_70%,rgba(249,115,22,0.02)_0%,transparent_60%)]" />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==')]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Copy */}
          <motion.div variants={container} initial="hidden" animate="visible" className="max-w-2xl">

            {/* Badge */}
            <motion.div variants={item} className="flex items-center gap-3 mb-6">
              <Badge variant="green" dot>
                Eficiencia energética integral · Desde 2017
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-hero font-bold text-slate-900 leading-[1.04] tracking-[-0.04em] mb-4 text-balance"
            >
              Tu consumo energético{' '}
              <span className="text-[#0d5c91]">puede convertirse</span>{' '}
              en rentabilidad.
            </motion.h1>

            {/* Subheadline */}
            <motion.p variants={item} className="text-lg text-slate-600 leading-relaxed mb-8 text-balance max-w-xl">
              Diseñamos e implementamos proyectos de eficiencia energética en electricidad, gas térmico y agua para hoteles, industrias y empresas con alto consumo.
              <br />
              Diagnóstico técnico, ejecución llave en mano y resultados medibles desde el primer mes.
            </motion.p>

            {/* Vertical chips */}
            <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
              {VERTICALS.map((v) => (
                <span key={v.label} className={`badge-${v.color} px-3 py-1.5 rounded-full text-xs font-medium`}>
                  {v.label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all duration-200 shadow-green-glow hover:shadow-[0_0_40px_rgba(34,197,94,0.35)]"
              >
                Solicitar diagnóstico gratuito
              </Link>
              <Link
                href="/nosotros#impacto-ambiental"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-medium text-sm hover:bg-slate-200 hover:border-slate-300 transition-all duration-200"
              >
                Impacto Ambiental en Tiempo Real →
              </Link>
            </motion.div>

            {/* Micro trust */}
            <motion.p variants={item} className="mt-4 text-xs text-slate-500">
              Sin spam. Sin compromisos.
              <br />
              Solo datos reales sobre tu operación.
            </motion.p>

            {/* CO2 Counter */}
            <CO2Counter />
          </motion.div>

          {/* Right — Energy Flow Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center"
          >
            <EnergyFlowVisual className="w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px]" />
          </motion.div>
        </div>

        {/* Metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 lg:mt-20 pt-8 border-t border-slate-200"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {HOME_METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-1"
              >
                <p className={`text-3xl lg:text-4xl font-bold tracking-tight ${
                  m.color === 'green' ? 'text-telos-green' :
                  m.color === 'blue' ? 'text-[#0d5c91]' :
                  m.color === 'orange' ? 'text-telos-orange' : 'text-slate-900'
                }`}>
                  {m.prefix}
                  <AnimatedCounter value={m.value} suffix="" duration={3200} />
                  {m.suffix}
                </p>
                <p className="text-sm text-slate-700 font-medium">{m.label}</p>
                <p className="text-xs text-slate-500">{m.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-xs text-slate-500 tracking-widest hidden sm:block">Desliza hacia abajo</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-[1px] h-6 bg-gradient-to-b from-slate-400 to-transparent"
        />
      </motion.div>
    </section>
  )
}
