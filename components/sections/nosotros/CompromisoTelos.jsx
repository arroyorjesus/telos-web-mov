'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Verde Telos / Azul Telos / Naranja Telos
const PILARES = [
  {
    num:    '01',
    titulo: 'Visión integral',
    cuerpo: 'No resolvemos problemas aislados; optimizamos el sistema completo (Agua, Gas, Luz). La eficiencia real nace de ver los tres vectores como uno.',
    color:  '#0d5c91',
  },
  {
    num:    '02',
    titulo: 'Resultados medibles',
    cuerpo: 'Si no se puede medir, no existe. Garantizamos el payback por contrato — no prometemos ahorros, los certificamos con métricas reales desde el día uno.',
    color:  '#2d802a',
  },
  {
    num:    '03',
    titulo: 'Largo plazo',
    cuerpo: 'Diseñamos para décadas, no para el trimestre. Somos el brazo técnico que acompaña tu crecimiento — cada activo que instalamos se aprecia con el tiempo.',
    color:  '#f97316',
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function CompromisoTelos() {
  return (
    <section className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Diagonal ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 55% 50% at 90% 100%, rgba(13,92,145,0.12) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 10% 10%, rgba(45,128,42,0.06) 0%, transparent 60%)',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 lg:mb-16 max-w-3xl"
        >
          <span className="section-badge badge-green" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            El Compromiso TELOS
          </span>
          <h2 className="v2-h2 mb-5">
            No buscamos una transacción.
            <br />
            <span className="accent">Gestionamos tu infraestructura.</span>
          </h2>
          <p className="v2-body max-w-2xl">
            Somos tu departamento de ingeniería externa de alto nivel — para que tú te enfoques en tu negocio.
          </p>
        </motion.div>

        {/* ── Misión + Visión ────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {[
            {
              label: 'Misión',
              color: '#0d5c91',
              texto: 'Maximizar la eficiencia de la infraestructura crítica industrial para convertir la energía en un motor de rentabilidad y sostenibilidad.',
            },
            {
              label: 'Visión',
              color: '#2d802a',
              texto: 'Ser el estándar de ingeniería estratégica en México, donde cada activo energético de nuestros clientes sea un modelo de eficiencia técnica y financiera.',
            },
          ].map((mv) => (
            <motion.div
              key={mv.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                  style={{ color: mv.color, background: `${mv.color}18`, border: `1px solid ${mv.color}35` }}
                >
                  {mv.label}
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{mv.texto}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Principios Core ───────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-4 mb-4"
        >
          {PILARES.map((p) => (
            <motion.div
              key={p.num}
              variants={item}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.07] transition-colors duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-[0.65rem] font-bold tabular-nums"
                  style={{ color: `${p.color}80` }}
                >
                  {p.num}
                </span>
                <span className="h-px flex-1" style={{ background: `${p.color}25` }} />
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: p.color }}
                />
              </div>
              <h3 className="font-grotesk font-bold text-white text-base mb-2">{p.titulo}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{p.cuerpo}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Cierre estratégico para el CEO ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8"
          style={{
            background: 'linear-gradient(135deg, rgba(13,92,145,0.12) 0%, rgba(45,128,42,0.06) 100%)',
            borderColor: 'rgba(43,143,212,0.25)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex-1">
            <p className="font-mono text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/30 mb-3">
              Momento de la verdad
            </p>
            <p className="text-white/75 text-base leading-relaxed max-w-2xl">
              No buscamos una transacción, buscamos gestionar tu infraestructura para que tú te enfoques en tu negocio.{' '}
              <span style={{ color: '#2b8fd4', fontWeight: 600 }}>
                Somos tu departamento de ingeniería externa de alto nivel.
              </span>
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/contacto"
              className="btn-primary"
              style={{ whiteSpace: 'nowrap' }}
            >
              Agendar diagnóstico
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
