'use client'

import { motion } from 'framer-motion'

const CARDS = [
  {
    index: '01',
    title: 'Especialidad multisistema',
    description:
      'Agua, gas y electricidad: las tres vertientes del consumo energético industrial.\n\nDiseñamos e implementamos soluciones integrales que ningún proveedor de un solo sistema puede ofrecer.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
      </svg>
    ),
  },
  {
    index: '02',
    title: 'Capacidad operativa nacional',
    description:
      'Hasta 8 cuadrillas de 6 personas cada una, ejecutando instalaciones múltiples simultáneas en cualquier punto del país.\n\nBajo estricto cumplimiento de Normas Mexicanas e Internacionales.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
]

const STATES = ['CDMX', 'Puebla', 'Edomex', 'Quintana Roo', 'BCS', 'Jalisco', 'NL', '+ más']

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export default function QuienesSomos() {
  return (
    <section className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      {/* Subtle top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Right-side ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_100%_50%,rgba(13,92,145,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-20 items-start">

          {/* ── Left col ─────────────────────────────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Eyebrow */}
            <motion.div variants={item} className="v2-eyebrow">
              <span className="v2-eyebrow-num">02</span>
              <span className="v2-eyebrow-line" />
              <span className="v2-eyebrow-label">Quiénes somos</span>
            </motion.div>

            {/* Headline */}
            <motion.h2 variants={item} className="v2-h2 mb-8">
              Una firma de ingeniería
              <br />
              <span className="accent">con visión de largo plazo.</span>
            </motion.h2>

            {/* Blockquote */}
            <motion.blockquote
              variants={item}
              className="pl-4 border-l-2 mb-10"
              style={{ borderColor: 'rgba(43,143,212,0.45)' }}
            >
              <p className="font-grotesk font-medium leading-relaxed text-base sm:text-lg text-white/70">
                No comercializamos equipos. Desarrollamos activos energéticos con visión
                técnica, financiera y operativa de largo plazo.
              </p>
            </motion.blockquote>

            {/* Capability cards — stacked, left-aligned, minimal */}
            <motion.div variants={container} className="flex flex-col divide-y divide-white/8">
              {CARDS.map((card) => (
                <motion.div
                  key={card.index}
                  variants={item}
                  className="py-5 flex items-start gap-5 group"
                >
                  {/* Mono index + icon */}
                  <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
                    <span className="font-mono text-[0.65rem] font-bold text-[var(--blue-light)]/60 tracking-widest">
                      {card.index}
                    </span>
                    <div className="text-[var(--blue-light)]/70 group-hover:text-[var(--blue-light)] transition-colors duration-300">
                      {card.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-grotesk font-bold text-white text-sm tracking-wide mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed whitespace-pre-line">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right col — Presencia nacional panel ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {/* Header */}
              <div className="flex items-center gap-2 mb-5">
                <span className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-[var(--blue-light)]/60 uppercase">
                  Cobertura
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <p className="font-grotesk font-bold text-white text-xl leading-snug mb-1">
                República Mexicana
              </p>
              <p className="text-white/45 text-sm mb-6 leading-relaxed">
                Cuadrillas activas en múltiples estados simultáneamente.
              </p>

              {/* State chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {STATES.map((s) => (
                  <span
                    key={s}
                    className="border border-white/12 bg-white/[0.05] text-white/60 px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Operational capacity block */}
              <div className="border border-white/10 bg-[#021829] rounded-xl p-4">
                <p className="font-mono text-[0.65rem] font-bold tracking-[0.2em] text-white/35 uppercase mb-2">
                  Capacidad operativa
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  Hasta <span className="text-white font-semibold">8 cuadrillas</span> de{' '}
                  <span className="text-white font-semibold">6 personas</span> ejecutando
                  instalaciones simultáneas bajo NOM e ISO.
                </p>
              </div>

              {/* Bottom stat */}
              <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-mono text-2xl font-bold text-white tabular-nums">+7</p>
                  <p className="text-xs text-white/40 mt-0.5">Estados activos</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-2xl font-bold text-[var(--blue-light)] tabular-nums">48</p>
                  <p className="text-xs text-white/40 mt-0.5">Personas en campo</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
