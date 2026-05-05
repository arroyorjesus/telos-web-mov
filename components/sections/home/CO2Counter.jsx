'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const BASE_DATE   = new Date('2026-05-05T06:00:00Z')
const BASE_CO2_T  = 2195.26
const BASE_KWH    = 3142160
const DAILY_CO2_T = 2.444
const DAILY_KWH   = 3467.8
const PER_SEC_CO2 = DAILY_CO2_T / 86400
const PER_SEC_KWH = DAILY_KWH  / 86400

function calcLive() {
  const secs = Math.max(0, (Date.now() - BASE_DATE.getTime()) / 1000)
  return {
    co2: BASE_CO2_T + secs * PER_SEC_CO2,
    kwh: BASE_KWH   + secs * PER_SEC_KWH,
  }
}

export default function CO2Counter() {
  const [live, setLive] = useState(() => calcLive())

  useEffect(() => {
    const t = setInterval(() => setLive(calcLive()), 1000)
    return () => clearInterval(t)
  }, [])

  const co2Str = live.co2.toLocaleString('es-MX', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
  const mwhStr = (live.kwh / 1000).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <Link
        href="/nosotros#impacto-ambiental"
        className="block group focus:outline-none"
      >
        <div
          className="relative rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_60px_rgba(13,92,145,0.35)] transition-shadow duration-300 group-hover:shadow-[0_0_80px_rgba(13,92,145,0.55)]"
          style={{ background: 'linear-gradient(160deg, #04243d 0%, #0d5c91 55%, #1a7abf 100%)' }}
        >
          {/* Radial glow behind number */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(13,92,145,0.6)_0%,transparent_75%)] pointer-events-none" />
          {/* Top shimmer line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative px-6 py-5">
            {/* Live badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/25 bg-white/10 text-[10px] font-semibold text-white uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d802a] animate-pulse" />
                En vivo
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest">CO₂e evitado acumulado</span>
            </div>

            {/* Main number */}
            <div className="font-black text-[#2d802a] tabular-nums leading-none tracking-tight text-4xl sm:text-5xl mb-1">
              {co2Str}
            </div>
            <p className="text-white/70 text-xs font-light tracking-wide mb-4">
              toneladas de CO₂ equivalente
            </p>

            {/* Secondary stat */}
            <div className="border-t border-white/15 pt-3 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-white tabular-nums">{mwhStr}</p>
                <p className="text-[10px] text-white/60 mt-0.5">MWh de energía limpia</p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold transition-all duration-200 group-hover:bg-white/20 group-hover:border-white/35">
                Ver detalle completo
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
