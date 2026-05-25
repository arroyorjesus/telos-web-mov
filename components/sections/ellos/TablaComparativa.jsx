'use client'

import { motion } from 'framer-motion'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { COMPARISON_CRITERIA } from '@/data/comparisons'

function Check({ value }) {
  if (value === true)
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-telos-green/15 border border-telos-green/25">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-telos-green">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </span>
    )
  if (value === 'partial')
    return (
      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/10 border border-yellow-500/20">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500">
          <path d="M19 13H5v-2h14v2z"/>
        </svg>
      </span>
    )
  return (
    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 border border-slate-200">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </span>
  )
}

export default function TablaComparativa() {
  const headers = [
    { label: 'TELOS', highlight: true },
    { label: 'Solo solar', highlight: false },
    { label: 'Proveedor equipo', highlight: false },
  ]

  const cols = (row) => [
    { label: 'TELOS', value: row.telos, highlight: true },
    { label: 'Solo solar', value: row.solar, highlight: false },
    { label: 'Proveedor equipo', value: row.equipo, highlight: false },
  ]

  return (
    <section id="comparativa" className="relative py-section overflow-hidden scroll-mt-24">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-2xl"
        >
          <span className="section-badge badge-blue" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
            Comparativa
          </span>
          <h2 className="section-h2" style={{ marginBottom: '0.875rem' }}>
            Criterios que importan — sin rodeos.
          </h2>
          <p className="section-sub">
            Comparativa basada en oferta pública de mercado. Mayo 2026.
          </p>
        </motion.div>

        <MotionWrapper preset="fadeUp" delay={0.2}>
          {/* ── Mobile: stacked cards (toda la data visible, sin scroll horizontal) ── */}
          <div className="md:hidden flex flex-col gap-3">
            {COMPARISON_CRITERIA.map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-sm font-semibold text-white mb-3">{row.label}</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {cols(row).map((c) => (
                    <div
                      key={c.label}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${
                        c.highlight
                          ? 'bg-[#0d5c91]/10 border border-[#0d5c91]/25'
                          : 'bg-white/[0.03] border border-white/[0.06]'
                      }`}
                    >
                      <Check value={c.value} />
                      <span
                        className={`text-xs leading-tight ${
                          c.highlight ? 'text-[#0d5c91] font-semibold' : 'text-white/55'
                        }`}
                      >
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Desktop / tablet: tabla ── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-xs text-slate-500 font-medium w-1/2">Criterio</th>
                  {headers.map((h) => (
                    <th
                      key={h.label}
                      className={`py-4 px-4 text-xs font-semibold text-center ${
                        h.highlight ? 'text-[#0d5c91]' : 'text-slate-500'
                      }`}
                    >
                      {h.highlight && (
                        <div className="mb-1">
                          <span className="px-2 py-0.5 rounded text-xs font-bold bg-[#0d5c91]/10 border border-[#0d5c91]/25 text-[#0d5c91]">Elegido</span>
                        </div>
                      )}
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_CRITERIA.map((row, i) => (
                  <motion.tr
                    key={row.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className={`border-t ${i === 0 ? 'border-slate-200' : 'border-slate-100'} ${
                      i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4 text-sm text-slate-600">{row.label}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center">
                        <Check value={row.telos} />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center">
                        <Check value={row.solar} />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center">
                        <Check value={row.equipo} />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-telos-green/20 border border-telos-green/40" />
              Completo
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-yellow-500/15 border border-yellow-500/30" />
              Parcial / según modelo
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-100 border border-slate-300" />
              No aplica
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
