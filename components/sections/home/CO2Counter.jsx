'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const BASE_DATE    = new Date('2026-05-05T06:00:00Z')
const BASE_CO2_T   = 2195.26
const BASE_KWH     = 3142160
const DAILY_CO2_T  = 2.444
const DAILY_KWH    = 3467.8
const PER_SEC_CO2  = DAILY_CO2_T / 86400
const PER_SEC_KWH  = DAILY_KWH  / 86400

function calcLive() {
  const secs = Math.max(0, (Date.now() - BASE_DATE.getTime()) / 1000)
  const co2  = BASE_CO2_T + secs * PER_SEC_CO2
  const kwh  = BASE_KWH   + secs * PER_SEC_KWH
  return { co2, kwh }
}

export default function CO2Counter() {
  const [live, setLive] = useState(() => calcLive())

  useEffect(() => {
    const t = setInterval(() => setLive(calcLive()), 5000)
    return () => clearInterval(t)
  }, [])

  const co2Str = live.co2.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  const mwhStr = (live.kwh / 1000).toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      className="mt-12 rounded-2xl border border-telos-green/20 bg-telos-green/5 p-6 flex flex-col sm:flex-row gap-6"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-telos-green animate-pulse" />
          <span className="text-xs font-semibold text-telos-green uppercase tracking-widest">
            Impacto en tiempo real
          </span>
        </div>
        <div className="flex gap-6">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-telos-green tabular-nums">
              {co2Str}
            </p>
            <p className="text-xs text-slate-600 mt-1">tCO₂ evitadas</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#0d5c91] tabular-nums">
              {mwhStr}
            </p>
            <p className="text-xs text-slate-600 mt-1">MWh generados</p>
          </div>
        </div>
      </div>
      <div className="sm:border-l border-t sm:border-t-0 border-slate-200 sm:pl-6 pt-4 sm:pt-0">
        <p className="text-xs text-slate-600 uppercase tracking-widest mb-3">Diariamente</p>
        <div className="space-y-2">
          <div>
            <p className="text-lg font-bold text-telos-green">{DAILY_CO2_T.toFixed(2)}t CO₂</p>
          </div>
          <div>
            <p className="text-lg font-bold text-[#0d5c91]">{DAILY_KWH.toLocaleString('es-MX')} kWh</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
