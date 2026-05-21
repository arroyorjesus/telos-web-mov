'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  {
    q: '¿Por qué sigue subiendo mi factura de CFE aunque ya tengo paneles solares?',
    a: 'Los paneles solares reducen el consumo energético, pero no eliminan los cargos por demanda máxima ni las penalizaciones por factor de potencia. Para reducir la factura de CFE de forma integral se requiere también compensación reactiva, variadores de frecuencia (VFDs) y, en muchos casos, un sistema BESS que gestione la demanda en las horas pico. TELOS analiza los tres vectores — generación, consumo y demanda — para encontrar el verdadero origen del gasto.',
  },
  {
    q: '¿Cuánto tiempo tarda el retorno de inversión en un proyecto de eficiencia energética?',
    a: 'En los proyectos que ejecuta TELOS el retorno de inversión (ROI) se garantiza por contrato en menos de 3 años. El plazo varía según el tipo de instalación: proyectos solares con BESS logran payback en 24–36 meses, modernización de calderas de condensación en 18–30 meses, y sistemas de tratamiento de agua entre 12 y 36 meses dependiendo del ahorro en pipas. El diagnóstico técnico gratuito determina el escenario exacto para tu operación.',
  },
  {
    q: '¿Qué diferencia hay entre TELOS y una empresa instaladora de paneles solares?',
    a: 'Una empresa instaladora de paneles solares atiende únicamente el vector eléctrico. TELOS es una firma de ingeniería energética integral que resuelve los tres vectores del consumo: electricidad (solar, BESS, VFDs), gas térmico (calderas de condensación, heat pumps, recuperadores de calor) y agua (ósmosis inversa, captación pluvial, tratamiento y reuso). Esto permite identificar dónde realmente se pierde dinero en la operación y ejecutar proyectos que ningún proveedor especializado en un solo sistema puede ofrecer.',
  },
  {
    q: '¿TELOS trabaja con plantas de nearshoring y empresas internacionales en México?',
    a: 'Sí. Empresas internacionales que establecen operaciones en México — manufactura, logística, centros de datos — enfrentan infraestructura energética antigua y tarifas industriales complejas. TELOS diseña e implementa la infraestructura de agua, gas y electricidad que esas plantas necesitan para operar con eficiencia desde el primer día, con cumplimiento de normas NOM, ANCE y STPS. Operamos en todo el territorio nacional incluyendo los corredores industriales del Bajío, Monterrey, Guadalajara y Puebla.',
  },
  {
    q: '¿Puedo financiar o arrendar los equipos en lugar de comprarlos?',
    a: 'Sí. TELOS ofrece esquemas de financiamiento y arrendamiento para que la inversión en infraestructura energética no comprometa el capital de trabajo de la empresa. En la modalidad de arrendamiento, el ahorro generado por el sistema cubre la renta mensual desde el primer mes — en muchos casos con flujo de caja positivo desde el arranque. El diagnóstico técnico gratuito incluye la proyección financiera de cada esquema disponible.',
  },
  {
    q: '¿Qué normas y certificaciones cumple TELOS?',
    a: 'TELOS opera bajo estricto cumplimiento de la Norma Oficial Mexicana NOM-001-SEDE (instalaciones eléctricas), certificación ANCE (equipo eléctrico) y normativa STPS (seguridad en trabajos en alturas y espacios confinados). Cada instalación es supervisada por ingenieros certificados y se entrega con la documentación técnica completa. Esto garantiza que la inversión cumpla el 100% de la regulación vigente y elimina cualquier pasivo contingente por incumplimiento.',
  },
  {
    q: '¿En qué estados de México opera TELOS?',
    a: 'TELOS tiene cobertura nacional. Hemos ejecutado proyectos en Ciudad de México, Puebla, Estado de México, Baja California Sur (Los Cabos), Jalisco, Quintana Roo, Nuevo León y más estados. Contamos con hasta 8 cuadrillas propias de 6 personas cada una para ejecutar instalaciones simultáneas en distintos puntos del país sin subcontratar la operación técnica.',
  },
]

export default function FAQEllos() {
  const [open, setOpen] = useState(null)

  return (
    <section className="relative bg-[#021829] py-20 md:py-28 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_0%_60%,rgba(13,92,145,0.10)_0%,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-20 mb-14 items-end">
          <div>
            <span className="section-badge badge-blue" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              Preguntas frecuentes · Antes de decidir
            </span>
            <h2 className="v2-h2">
              Las dudas que todos tienen
              <br />
              <span className="accent">antes de elegir un proveedor.</span>
            </h2>
          </div>
          <p className="text-white/45 text-sm leading-relaxed">
            Respondemos las preguntas más comunes sobre eficiencia energética,
            retorno de inversión, nearshoring, financiamiento y certificaciones.
            Sin lenguaje de ventas.
          </p>
        </div>

        {/* ── FAQ items ──────────────────────────────────────────── */}
        <div className="divide-y divide-white/[0.07]">
          {FAQS.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left py-5 flex items-start justify-between gap-6 group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-4">
                    <span className="font-mono text-[0.6rem] font-bold text-[var(--blue-light)]/50 tracking-widest mt-1 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-grotesk font-semibold text-white/85 group-hover:text-white text-sm sm:text-base leading-snug transition-colors duration-200">
                      {faq.q}
                    </span>
                  </span>
                  <span className="shrink-0 mt-0.5">
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                      className="text-white/30 group-hover:text-[var(--blue-light)] transition-all duration-300"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="pb-6 pl-9 text-sm text-white/55 leading-relaxed max-w-3xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
