'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const VIDEOS = {
  agua: '/videos/agua-web.mp4',
  gas: '/videos/gas-termico-web.mp4',
  electricidad: '/videos/electricidad-web.mp4',
  integral: '/videos/estrategia-integral-web.mp4',
}

function LiquidButton({ children, href }) {
  if (href) {
    return (
      <Link
        href={href}
        className="liquid-glass rounded-xl px-5 py-2.5 text-sm text-slate-900/90 transition-transform hover:scale-[1.02] inline-block"
      >
        {children}
      </Link>
    )
  }
  return (
    <button
      type="button"
      className="liquid-glass rounded-xl px-5 py-2.5 text-sm text-slate-900/90 transition-transform hover:scale-[1.02]"
    >
      {children}
    </button>
  )
}

function CardVideo({ src }) {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      autoPlay
      muted
      loop
      playsInline
    />
  )
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs text-white">
      {children}
    </span>
  )
}

const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function SolucionesSection() {
  return (
    <section className="min-h-screen bg-white px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between"
        >
          <div>
            <p className="mb-4 inline-flex rounded-full border border-[#0d5c91]/30 bg-[#0d5c91]/10 px-3 py-1 text-xs font-medium text-[#0d5c91]">
              Soluciones
            </p>
            <h2 className="text-display font-bold text-slate-900">
              Las tres vertientes.
              <br />
              <span className="text-[#0d5c91] font-bold">Un solo aliado estratégico.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
              Integramos agua, gas térmico y electricidad bajo una sola estrategia de eficiencia energética.
            </p>
          </div>
          <div className="shrink-0 md:pt-10">
            <LiquidButton href="/contacto">Conoce nuestras soluciones →</LiquidButton>
          </div>
        </motion.header>

        {/* Grid asimétrico */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2">

          {/* Card 01 — Agua (tall left) */}
          <motion.article
            className="feature-card flex min-h-[28rem] flex-col p-7 md:row-span-2"
            variants={cardAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <CardVideo src={VIDEOS.agua} />
            <div className="absolute inset-0 bg-black/35" />

            <div className="relative z-10 flex justify-between text-sm text-white/60">
              <span>01/</span>
              <span>Agua</span>
            </div>

            <div className="flex-1" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white md:text-2xl leading-tight">
                Agua inteligente
                <br />
                para operar mejor
              </h3>
              <div className="mt-4 h-px w-full bg-white/20" />
              <p className="mt-4 text-xs leading-relaxed text-white/90 md:text-sm">
                Captación pluvial, tratamiento, recirculación, ósmosis inversa
                y eficiencia hídrica para reducir consumo y dependencia del suministro municipal.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Tag>Captación pluvial</Tag>
                <Tag>Tratamiento</Tag>
                <Tag>Ósmosis inversa</Tag>
                <Tag>Reuso</Tag>
                <Tag>Filtración</Tag>
              </div>
            </div>
          </motion.article>

          {/* Card 02 — Gas térmico (wide top right) */}
          <motion.article
            className="feature-card-dark flex min-h-[18rem] flex-col p-7 md:col-span-2"
            variants={cardAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
          >
            <CardVideo src={VIDEOS.gas} />
            <div className="absolute inset-0 bg-black/35" />

            <div className="relative z-10 flex justify-between text-sm text-white/60">
              <span>02/</span>
              <span>Gas térmico</span>
            </div>

            <div className="flex-1" />

            <div className="relative z-10 max-w-xl">
              <h3 className="text-xl font-bold text-white md:text-2xl leading-tight">
                Eficiencia térmica
                <br />
                de alto rendimiento
              </h3>
              <div className="mt-4 h-px w-full bg-white/20" />
              <p className="mt-4 text-xs leading-relaxed text-white/90 md:text-sm">
                Calderas eficientes, condensación, cogeneración, heat pumps,
                ACS solar y optimización de procesos térmicos industriales.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Tag>Calderas</Tag>
                <Tag>ACS</Tag>
                <Tag>Heat pumps</Tag>
                <Tag>Intercambiadores</Tag>
                <Tag>Cogeneración</Tag>
              </div>
            </div>
          </motion.article>

          {/* Card 03 — Electricidad */}
          <motion.article
            className="feature-card flex min-h-[18rem] flex-col p-7"
            variants={cardAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
          >
            <CardVideo src={VIDEOS.electricidad} />
            <div className="absolute inset-0 bg-black/35" />

            <div className="relative z-10 flex justify-between text-sm text-white/60">
              <span>03/</span>
              <span>Electricidad</span>
            </div>

            <div className="flex-1" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white md:text-2xl leading-tight">
                Generación y
                <br />
                optimización eléctrica
              </h3>
              <div className="mt-4 h-px w-full bg-white/20" />
              <p className="mt-4 text-xs leading-relaxed text-white/90 md:text-sm">
                Sistemas fotovoltaicos, BESS, optimización de demanda,
                monitoreo y eliminación de bajo factor de potencia.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Tag>Fotovoltaico</Tag>
                <Tag>BESS</Tag>
                <Tag>Demanda CFE</Tag>
                <Tag>Monitoreo</Tag>
              </div>
            </div>
          </motion.article>

          {/* Card 04 — Estrategia integral */}
          <motion.article
            className="feature-card flex min-h-[18rem] flex-col p-7"
            variants={cardAnim}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.24 }}
          >
            <CardVideo src={VIDEOS.integral} />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex justify-between text-sm text-white/60">
              <span>04/</span>
              <span>Estrategia integral</span>
            </div>

            <div className="flex-1" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white md:text-2xl leading-tight">
                Un diagnóstico,
                <br />
                tres verticales.
              </h3>
              <div className="mt-4 h-px w-full bg-white/20" />
              <p className="mt-4 text-xs leading-relaxed text-white/90 md:text-sm">
                Agua, gas y electricidad bajo una sola estrategia integrada de eficiencia.
              </p>
              <div className="mt-5">
                <Link
                  href="/nosotros#impacto-ambiental"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-slate-900 font-medium text-sm hover:bg-white/90 transition-all duration-200"
                >
                  El planeta respira mejor →
                </Link>
              </div>
            </div>
          </motion.article>

        </div>
      </div>
    </section>
  )
}
