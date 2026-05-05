'use client'

import { motion } from 'framer-motion'

const SATELLITES = [
  { cx: 55, cy: 188, label: 'Agua', emoji: '💧', color: '#3b82f6', glowId: 'gBlue', delay: 0.3 },
  { cx: 308, cy: 72, label: 'Gas', emoji: '🔥', color: '#f97316', glowId: 'gOrange', delay: 0.4 },
  { cx: 308, cy: 308, label: 'LUZ', emoji: '⚡', color: '#2d802a', glowId: 'gGreen', delay: 0.5 },
]

const LINES = [
  { x1: 84, y1: 188, x2: 152, y2: 188, color: '#3b82f6' },
  { x1: 281, y1: 93, x2: 212, y2: 162, color: '#f97316' },
  { x1: 281, y1: 287, x2: 212, y2: 218, color: '#2d802a' },
]

const DOTS = [
  { startX: 84, startY: 188, endX: 152, endY: 188, color: '#3b82f6', delay: 0.9 },
  { startX: 281, startY: 93, endX: 212, endY: 162, color: '#f97316', delay: 1.1 },
  { startX: 281, startY: 287, endX: 212, endY: 218, color: '#2d802a', delay: 1.3 },
]

export default function EnergyFlowVisual({ className = '' }) {
  return (
    <div className={`relative w-full aspect-square mx-auto ${className}`}>
      <svg viewBox="0 0 380 380" className="w-full h-full" aria-hidden="true">
        <defs>
          {/* Blur glow filters */}
          <filter id="blur-blue" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="blur-orange" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="blur-green" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="blur-center" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <clipPath id="centerClip">
            <circle cx="190" cy="190" r="43" />
          </clipPath>
        </defs>

        {/* ── Liquid aura blobs ─────────────────────────────── */}
        {/* Center glow */}
        <circle cx="190" cy="190" r="70" fill="rgba(45,128,42,0.18)" filter="url(#blur-center)" />
        <circle cx="190" cy="190" r="50" fill="rgba(13,92,145,0.12)" filter="url(#blur-center)" />

        {/* Satellite auras */}
        <circle cx="55" cy="188" r="44" fill="rgba(59,130,246,0.22)" filter="url(#blur-blue)" />
        <circle cx="308" cy="72" r="44" fill="rgba(249,115,22,0.22)" filter="url(#blur-orange)" />
        <circle cx="308" cy="308" r="44" fill="rgba(45,128,42,0.22)" filter="url(#blur-green)" />

        {/* ── Connection lines ───────────────────────────────── */}
        {LINES.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1} y1={line.y1}
            x2={line.x2} y2={line.y2}
            stroke={line.color}
            strokeWidth="2"
            strokeOpacity="0.45"
            strokeDasharray="9 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.2, duration: 1, ease: 'easeInOut' }}
          />
        ))}

        {/* ── Traveling dots ────────────────────────────────── */}
        {DOTS.map((d, i) => (
          <motion.circle
            key={i}
            r="4.5"
            fill={d.color}
            initial={{ cx: d.startX, cy: d.startY, opacity: 0 }}
            animate={{
              cx: [d.startX, d.endX, d.startX],
              cy: [d.startY, d.endY, d.startY],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ delay: d.delay, duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* ── Center TELOS node ─────────────────────────────── */}
        {/* Outer pulse rings */}
        <motion.circle cx="190" cy="190" r="52" fill="none"
          stroke="rgba(13,92,145,0.2)" strokeWidth="1.5"
          animate={{ r: [48, 68], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeOut' }}
        />
        <motion.circle cx="190" cy="190" r="44" fill="none"
          stroke="rgba(13,92,145,0.12)" strokeWidth="1"
          animate={{ r: [44, 64], opacity: [0.4, 0] }}
          transition={{ repeat: Infinity, duration: 2.8, delay: 0.7, ease: 'easeOut' }}
        />

        {/* Main circle */}
        <motion.circle
          cx="190" cy="190" r="44"
          fill="#0d5c91"
          stroke="rgba(13,92,145,0.5)"
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        />

        {/* TELOS logo inside center node */}
        <image
          href="/logo-blanco.png"
          x="152" y="152"
          width="76" height="76"
          preserveAspectRatio="xMidYMid meet"
          clipPath="url(#centerClip)"
        />

        {/* ── Satellite nodes ───────────────────────────────── */}
        {SATELLITES.map((node, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: node.delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Pulse ring */}
            <motion.circle
              cx={node.cx} cy={node.cy} r="30"
              fill="none"
              stroke={node.color}
              strokeWidth="1.2"
              animate={{ r: [28, 44], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, delay: 0.8 + i * 0.4, ease: 'easeOut' }}
            />
            {/* Circle fill */}
            <circle
              cx={node.cx} cy={node.cy} r="28"
              fill="white"
              stroke={node.color}
              strokeWidth="1.5"
              strokeOpacity="0.55"
            />
            {/* Emoji */}
            <text x={node.cx} y={node.cy - 3} textAnchor="middle" fontSize="15">
              {node.emoji}
            </text>
            {/* Label */}
            <text
              x={node.cx} y={node.cy + 15}
              textAnchor="middle"
              fill={node.color}
              fontSize="8.5"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              letterSpacing="0.8"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
