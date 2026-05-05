'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { MARKET_PLAYERS } from '@/data/comparisons'

export default function PanoramaMercado() {
  return (
    <section className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Panorama del mercado"
          badgeVariant="white"
          title="¿Qué tipo de empresa estás evaluando?"
          subtitle={null}
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MARKET_PLAYERS.map((player) => (
            <motion.div
              key={player.id}
              variants={fadeUpItem}
              className={`rounded-2xl p-6 border transition-all duration-300 relative ${
                player.telos
                  ? 'bg-[#0d5c91]/[0.05] border-[#0d5c91]/25 hover:border-[#0d5c91]/40'
                  : 'light-card hover:border-slate-300'
              }`}
            >
              {player.telos && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-bold bg-[#0d5c91]/10 border border-[#0d5c91]/25 text-[#0d5c91]">
                  TELOS
                </span>
              )}

              <h3 className={`font-bold text-base mb-3 ${player.telos ? 'text-[#0d5c91]' : 'text-slate-900'}`}>
                {player.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{player.description}</p>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1.5">Fortalezas</p>
                  {player.strengths.map((s) => (
                    <div key={s} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <span className="text-telos-green mt-0.5">+</span>
                      {s}
                    </div>
                  ))}
                </div>

                {player.limitations.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1.5">Limitaciones</p>
                    {player.limitations.map((l) => (
                      <div key={l} className="flex items-start gap-1.5 text-xs text-slate-500">
                        <span className="text-slate-400 mt-0.5">−</span>
                        {l}
                      </div>
                    ))}
                  </div>
                )}

                {player.claim && (
                  <p className="text-xs text-[#0d5c91] font-semibold mt-3 pt-3 border-t border-[#0d5c91]/20">
                    {player.claim}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
