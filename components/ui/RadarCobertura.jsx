'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Colores oficiales TELOS ───────────────────────────────────────
const G  = '#2d802a'   // Verde Telos
const B  = '#0d5c91'   // Azul Telos
const BG = '#05080a'

// ── Hotspots (data-driven — actualiza x/y para mover puntos) ─────
// Coordenadas calibradas sobre viewBox 0 0 1040 692
const HOTSPOTS = [
  {
    id: 'cdmx', short: 'CDMX', label: 'Ciudad de México',
    x: 548, y: 452,
    zona: 'Centro — Valle de México',
    activos: 4, ahorro: '$8.1M MXN / año',
    proyectos: [
      'Corporativo Coyoacán · Optimización eléctrica',
      'Hotel 190 hab · Estrategia hídrica',
      'CEDIS Distribución · 165 kWp',
      'Captación pluvial · 24,000 L',
    ],
  },
  {
    id: 'puebla', short: 'PUE', label: 'Puebla · Amozoc',
    x: 592, y: 460,
    zona: 'Centro-Oriente',
    activos: 2, ahorro: '$7.3M MXN / año',
    proyectos: [
      'CEDIS Puebla · 340 kWp instalados',
      'Parque Industrial Amozoc · 297 kWp',
    ],
  },
  {
    id: 'edomex', short: 'EDO', label: 'Estado de México',
    x: 522, y: 443,
    zona: 'Centro',
    activos: 1, ahorro: 'Ingeniería térmica activa',
    proyectos: ['Gimnasio · 3 calderas reemplazan 8 · −40%'],
  },
  {
    id: 'jalisco', short: 'JAL', label: 'Guadalajara, Jalisco',
    x: 358, y: 408,
    zona: 'Occidente',
    activos: 1, ahorro: 'Proyecto activo',
    proyectos: ['Planta industrial · Optimización eléctrica'],
  },
  {
    id: 'nl', short: 'NL', label: 'Monterrey, N.L.',
    x: 594, y: 245,
    zona: 'Noreste',
    activos: 1, ahorro: 'Proyecto en ejecución',
    proyectos: ['Planta industrial · Agua + Electricidad'],
  },
  {
    id: 'bcs', short: 'BCS', label: 'Los Cabos, BCS',
    x: 107, y: 442,
    zona: 'Noroeste',
    activos: 2, ahorro: 'Hídrico + ingeniería térmica',
    proyectos: [
      'Hotel 190 hab · 13 calderas condensación',
      'Ósmosis inversa 1 L/seg · 30% recuperado',
    ],
  },
  {
    id: 'qroo', short: 'QR', label: 'Quintana Roo',
    x: 1005, y: 390,
    zona: 'Sureste',
    activos: 1, ahorro: 'Proyecto hotelero activo',
    proyectos: ['Complejo hotelero · Estrategia hídrica integral'],
  },
]

const TICKER = [
  { name: 'Ciudad de México', activos: 4 },
  { name: 'Puebla',           activos: 2 },
  { name: 'Estado de México', activos: 1 },
  { name: 'Jalisco',          activos: 1 },
  { name: 'Nuevo León',       activos: 1 },
  { name: 'B.C. Sur',         activos: 2 },
  { name: 'Quintana Roo',     activos: 1 },
]

// ─────────────────────────────────────────────────────────────────
// SVG PATHS — trazados sobre la imagen de referencia (1040 × 692)
// ─────────────────────────────────────────────────────────────────

// Baja California (península completa)
const BAJA = `
  M 50,27 L 65,20 L 83,15 L 100,17 L 113,25 L 120,38 L 121,54
  L 119,70 L 116,88 L 113,106 L 111,124 L 111,142 L 112,160
  L 114,178 L 117,195 L 118,212 L 117,228 L 115,243 L 112,257
  L 109,271 L 108,285 L 107,299 L 107,313 L 108,327 L 109,341
  L 111,355 L 112,369 L 112,383 L 111,397 L 109,411 L 107,425
  L 106,438 L 106,445
  L 109,433 L 112,420 L 114,406 L 116,392 L 117,378
  L 117,364 L 116,350 L 114,336 L 112,322 L 110,308
  L 109,294 L 108,280 L 108,266 L 109,252 L 111,238
  L 114,224 L 117,210 L 119,196 L 119,182 L 118,168
  L 116,154 L 113,140 L 110,125 L 105,110 L 99,94
  L 90,78 L 78,62 L 63,46 Z
`

// Contorno principal de México (sin Baja California)
// Trazado clockwise desde esquina NW (Sonora-Arizona) → Golfo → Yucatán → Pacífico sur → Pacífico norte
const MEXICO_OUTER = `
  M 218,20
  L 270,14 L 338,11 L 412,10 L 480,11 L 542,15 L 600,21
  L 650,30 L 698,44 L 740,62 L 772,83 L 795,106 L 814,130
  L 812,152 L 806,172 L 798,192 L 790,212 L 784,232
  L 780,252 L 778,268 L 780,284 L 785,300 L 793,317
  L 803,333 L 815,348 L 826,362 L 836,375 L 844,386
  L 850,395 L 854,403 L 857,409 L 858,413
  L 864,412 L 870,408 L 877,400 L 884,390
  L 892,378 L 900,364 L 909,352 L 919,344
  L 930,340 L 942,340 L 955,344 L 966,353
  L 975,366 L 981,382 L 982,398 L 978,413
  L 971,426 L 959,437 L 944,445 L 928,449
  L 912,450 L 896,449 L 880,447 L 864,446
  L 850,448 L 838,454 L 828,463 L 820,474
  L 814,487 L 809,501 L 806,515 L 804,529
  L 802,543 L 798,557 L 790,568 L 778,577
  L 762,584 L 744,588 L 726,590 L 708,588
  L 690,583 L 672,576 L 655,570 L 641,567
  L 630,568 L 620,572 L 608,580 L 592,587
  L 572,590 L 550,586 L 528,578 L 506,565
  L 483,549 L 460,532 L 437,514 L 413,496
  L 389,478 L 365,462 L 342,448 L 322,438
  L 305,432 L 290,428 L 277,422 L 266,413
  L 257,402 L 250,388 L 244,372 L 240,355
  L 237,337 L 234,319 L 230,300 L 224,282
  L 218,264 L 213,246 L 211,228 L 212,210
  L 214,192 L 217,174 L 218,156 L 218,138
  L 217,120 L 215,102 L 215,84 L 216,66
  L 217,48 L 218,32 Z
`

// Líneas de frontera estatal (simplificadas pero proporcionales)
// Divididas en grupos por región para mejor organización
const STATE_LINES = [
  // Baja Ca. Norte / Sur
  `M 109,285 L 180,278`,
  // Sonora / Baja + mainland
  `M 180,278 L 215,260`,
  // Sonora / Chihuahua
  `M 343,20 L 312,100 L 290,140 L 275,185 L 258,210 L 240,238`,
  // Chihuahua / Coahuila
  `M 520,18 L 510,55 L 498,95 L 485,135 L 472,170 L 460,205`,
  // Coahuila / Nuevo León
  `M 628,28 L 625,60 L 618,95 L 608,130 L 598,160 L 590,190 L 580,218`,
  // Nuevo León / Tamaulipas
  `M 680,60 L 672,92 L 662,125 L 650,158 L 638,190 L 625,222 L 612,250`,
  // Tamaulipas coast line internal
  `M 812,130 L 804,155 L 796,180`,
  // Sonora / Sinaloa
  `M 238,240 L 252,265 L 260,285 L 262,305`,
  // Sinaloa / Durango
  `M 290,140 L 312,175 L 328,210 L 338,248 L 345,282`,
  // Durango / Zacatecas / Nayarit
  `M 345,282 L 360,308 L 370,335`,
  // Nayarit / Jalisco coast
  `M 260,342 L 272,368 L 280,392 L 285,418`,
  // Jalisco / Michoacan
  `M 370,390 L 393,412 L 408,432 L 420,452`,
  // Jalisco / Guanajuato / Aguascalientes
  `M 390,392 L 415,400 L 440,408 L 462,415`,
  // Guanajuato / SLP / Querétaro
  `M 462,415 L 480,420 L 498,425 L 516,428`,
  // Querétaro / Hidalgo / CDMX band
  `M 516,428 L 530,432 L 542,435 L 555,437`,
  // Estado de México outline
  `M 498,432 L 510,440 L 522,448 L 535,455 L 545,462 L 540,472 L 528,478 L 512,475 L 498,468 L 490,458 L 490,445 Z`,
  // Puebla / Veracruz
  `M 580,438 L 600,442 L 622,445 L 642,448 L 660,452`,
  // Veracruz coast
  `M 790,215 L 776,240 L 762,265 L 750,290 L 740,315 L 732,338`,
  // Oaxaca / Guerrero
  `M 532,510 L 552,525 L 574,538 L 596,548 L 618,555`,
  // Chiapas / Oaxaca
  `M 635,545 L 650,552 L 665,558 L 680,562`,
  // Tabasco / Campeche
  `M 730,460 L 748,455 L 766,450 L 783,447`,
  // Campeche / Yucatan
  `M 860,420 L 872,412 L 885,405 L 898,400`,
  // Yucatan / Quintana Roo
  `M 940,378 L 948,392 L 952,408 L 950,422 L 944,434`,
]

// Polígonos de estados activos (con relleno verde sutil)
const ACTIVE_STATES = {
  cdmx: `M 538,440 L 558,438 L 568,445 L 565,462 L 548,470 L 532,465 L 524,452 L 530,440 Z`,
  edomex: `M 498,430 L 525,428 L 540,435 L 546,442 L 542,455 L 535,468 L 520,475 L 504,470 L 492,460 L 490,445 Z`,
  puebla: `M 560,438 L 612,435 L 638,448 L 635,488 L 606,502 L 572,498 L 548,478 L 548,458 Z`,
  jalisco: `M 298,388 L 385,388 L 418,408 L 412,450 L 375,468 L 330,460 L 292,440 L 280,418 Z`,
  nl: `M 568,185 L 652,178 L 688,210 L 684,260 L 646,280 L 590,274 L 554,252 L 545,218 Z`,
  bcs: `M 107,285 L 120,278 L 118,300 L 118,340 L 117,380 L 114,420 L 108,445 L 106,438 L 107,420 L 108,380 L 108,340 L 109,300 Z`,
  qroo: `M 918,372 L 984,382 L 1005,392 L 1000,432 L 976,452 L 944,462 L 908,452 L 890,428 L 895,400 Z`,
}

// Centro del radar (centro geográfico aprox. de México)
const CX = 540
const CY = 340

export default function RadarCobertura() {
  const [active, setActive] = useState(null)

  return (
    <div style={{
      background: BG,
      border: `1px solid ${B}28`,
      borderRadius: '1.25rem',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* ── CSS animations (hardware-accelerated) ──────────────── */}
      <style>{`
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dotPulseRing {
          0%   { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0;   transform: scale(4.5); }
        }
        .radar-group {
          transform-origin: ${CX}px ${CY}px;
          animation: radarSpin 6s linear infinite;
          will-change: transform;
        }
        .dot-pulse-a {
          transform-origin: inherit;
          animation: dotPulseRing 2.6s ease-out infinite;
        }
        .dot-pulse-b {
          transform-origin: inherit;
          animation: dotPulseRing 2.6s ease-out infinite;
          animation-delay: 0.9s;
        }
        @keyframes tickerDot {
          0%, 100% { opacity: 0.65; }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.7rem 1rem',
        borderBottom: `1px solid ${B}20`,
        background: `${B}08`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: G,
            display: 'inline-block', boxShadow: `0 0 8px ${G}`,
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem',
            fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: `${B}cc`,
          }}>
            Radar de cobertura · República Mexicana
          </span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem',
          fontWeight: 700, color: `${G}bb`,
        }}>
          +7 estados · 12 activos
        </span>
      </div>

      {/* ── Body: mapa + ticker ─────────────────────────────────── */}
      <div style={{ display: 'flex' }}>

        {/* SVG Map */}
        <div style={{ flex: 1, position: 'relative', padding: '0.375rem 0 0' }}>
          <svg
            viewBox="0 0 1040 692"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            aria-label="Mapa de cobertura TELOS — República Mexicana"
          >
            <defs>
              <filter id="glow-green">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={G} floodOpacity="0.7"/>
              </filter>
              <filter id="glow-blue">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={B} floodOpacity="0.5"/>
              </filter>
              {/* Degradado de estela */}
              <linearGradient id="sweepGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={B} stopOpacity="0.55"/>
                <stop offset="100%" stopColor={B} stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* Cuadrícula técnica sutil */}
            {[100,200,300,400,500,600,700,800,900].map(x => (
              <line key={`vl${x}`} x1={x} y1="0" x2={x} y2="692"
                stroke={`${B}0d`} strokeWidth="0.5" strokeDasharray="3 6"/>
            ))}
            {[80,160,240,320,400,480,560,640].map(y => (
              <line key={`hl${y}`} x1="0" y1={y} x2="1040" y2={y}
                stroke={`${B}0d`} strokeWidth="0.5" strokeDasharray="3 6"/>
            ))}

            {/* Círculos concéntricos del radar */}
            {[120, 240, 360, 480].map(r => (
              <circle key={r} cx={CX} cy={CY} r={r}
                fill="none" stroke={`${B}0e`} strokeWidth="0.5" strokeDasharray="4 8"/>
            ))}

            {/* ── Mapa de México ────────────────────────────────── */}

            {/* Estados activos — relleno verde sutil */}
            {Object.entries(ACTIVE_STATES).map(([id, d]) => (
              <path key={id} d={d}
                fill={active?.id === id ? `${G}22` : `${G}0d`}
                stroke="none"
                style={{ transition: 'fill 0.25s' }}
              />
            ))}

            {/* Cuerpo principal — México */}
            <path d={MEXICO_OUTER}
              fill="#0b1d2c"
              stroke={`${B}55`}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Baja California */}
            <path d={BAJA}
              fill="#0b1d2c"
              stroke={`${B}55`}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Líneas de fronteras estatales */}
            {STATE_LINES.map((d, i) => (
              <path key={i} d={d}
                fill="none"
                stroke={`${B}28`}
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
            ))}

            {/* ── Barrido del radar ─────────────────────────────── */}
            <g className="radar-group">
              {/* Estela ancha (más opaca) */}
              <path
                d={`M ${CX},${CY} L ${CX},${CY - 480} A 480,480 0 0,0 ${CX - 84},${CY - 472} Z`}
                fill={B} fillOpacity="0.055"
              />
              {/* Estela media */}
              <path
                d={`M ${CX},${CY} L ${CX - 84},${CY - 472} A 480,480 0 0,0 ${CX - 165},${CY - 449} Z`}
                fill={B} fillOpacity="0.025"
              />
              {/* Línea de escaneo */}
              <line
                x1={CX} y1={CY} x2={CX} y2={CY - 490}
                stroke={B} strokeWidth="1.5" strokeOpacity="0.80"
                strokeLinecap="round"
                filter="url(#glow-blue)"
              />
              {/* Punto del radar en el extremo */}
              <circle cx={CX} cy={CY - 490} r="2" fill={B} fillOpacity="0.9"/>
            </g>

            {/* ── Hotspots ──────────────────────────────────────── */}
            {HOTSPOTS.map((h) => {
              const isHov = active?.id === h.id
              return (
                <g
                  key={h.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setActive(h)}
                  onMouseLeave={() => setActive(null)}
                >
                  {/* Anillos de pulso animados — scale desde el centro del punto */}
                  <circle cx={h.x} cy={h.y} r="5" fill="none"
                    stroke={G} strokeWidth="0.8" strokeOpacity="0.65"
                    className="dot-pulse-a"
                    style={{ transformOrigin: `${h.x}px ${h.y}px` }}
                  />
                  <circle cx={h.x} cy={h.y} r="5" fill="none"
                    stroke={G} strokeWidth="0.8" strokeOpacity="0.5"
                    className="dot-pulse-b"
                    style={{ transformOrigin: `${h.x}px ${h.y}px` }}
                  />
                  {/* Halo de fondo */}
                  <circle cx={h.x} cy={h.y} r="8"
                    fill={G} fillOpacity={isHov ? '0.18' : '0.08'}
                    style={{ transition: 'fill-opacity 0.2s' }}
                  />
                  {/* Punto core */}
                  <circle cx={h.x} cy={h.y} r={isHov ? '5.5' : '4.5'}
                    fill={G}
                    filter="url(#glow-green)"
                    style={{ transition: 'r 0.2s' }}
                  />
                  {/* Label */}
                  <text
                    x={h.x + 9} y={h.y - 6}
                    fontSize="8" fontFamily="'JetBrains Mono', monospace"
                    fontWeight="700" letterSpacing="0.05em"
                    fill={isHov ? G : `${G}99`}
                    style={{ transition: 'fill 0.2s', pointerEvents: 'none' }}
                  >
                    {h.short}
                  </text>
                </g>
              )
            })}

            {/* Punto central del radar */}
            <circle cx={CX} cy={CY} r="3" fill={B} fillOpacity="0.5"/>
            <circle cx={CX} cy={CY} r="1.5" fill={B} fillOpacity="0.9"/>
          </svg>

          {/* ── Tooltip ─────────────────────────────────────────── */}
          <AnimatePresence>
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 5, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.97 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 272,
                  background: '#060f1a',
                  border: `1px solid ${B}55`,
                  borderRadius: '0.875rem',
                  padding: '0.875rem',
                  pointerEvents: 'none',
                  boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px ${B}18, 0 0 24px ${B}10`,
                  zIndex: 20,
                }}
              >
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.53rem', fontWeight: 700, letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: `${B}88`, marginBottom: '0.18rem',
                    }}>
                      {active.zona}
                    </div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.875rem', fontWeight: 700, color: '#fff',
                    }}>
                      {active.label}
                    </div>
                  </div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.53rem',
                    fontWeight: 700, color: G,
                    background: `${G}18`, border: `1px solid ${G}35`,
                    borderRadius: '100px', padding: '0.18rem 0.5rem',
                    whiteSpace: 'nowrap', marginTop: '0.1rem',
                  }}>
                    {active.activos} {active.activos === 1 ? 'ACTIVO' : 'ACTIVOS'}
                  </span>
                </div>

                <div style={{ height: 1, background: `${B}22`, margin: '0.5rem 0' }} />

                {/* Ahorro */}
                <div style={{ marginBottom: '0.5rem' }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: '0.52rem',
                    textTransform: 'uppercase', letterSpacing: '0.14em',
                    color: 'rgba(255,255,255,0.28)', marginBottom: '0.18rem',
                  }}>
                    OPEX optimizado
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.9rem', fontWeight: 800, color: G,
                  }}>
                    {active.ahorro}
                  </div>
                </div>

                {/* Proyectos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.22rem' }}>
                  {active.proyectos.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                      <span style={{
                        width: 3, height: 3, borderRadius: '50%',
                        background: `${B}70`, flexShrink: 0,
                        marginTop: '0.35rem', display: 'inline-block',
                      }} />
                      <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.68rem', color: 'rgba(255,255,255,0.50)',
                        lineHeight: 1.4,
                      }}>
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Ticker lateral ──────────────────────────────────── */}
        <div style={{
          width: 140,
          borderLeft: `1px solid ${B}18`,
          padding: '0.875rem 0.7rem',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: '0.53rem',
            fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: `${B}55`, marginBottom: '0.625rem',
          }}>
            Activos
          </div>

          {TICKER.map((t, i) => (
            <div key={t.name} style={{
              padding: '0.45rem 0',
              borderBottom: `1px solid ${B}10`,
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: '0.3rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flex: 1, minWidth: 0 }}>
                <span style={{
                  width: 5, height: 5, borderRadius: '50%', background: G,
                  flexShrink: 0, display: 'inline-block',
                  boxShadow: `0 0 5px ${G}80`,
                  animation: `tickerDot 2.5s ease-in-out infinite`,
                  animationDelay: `${i * 0.22}s`,
                }} />
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '0.68rem',
                  color: 'rgba(255,255,255,0.55)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {t.name}
                </span>
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.53rem', fontWeight: 700, color: `${G}aa`, flexShrink: 0,
              }}>
                ×{t.activos}
              </span>
            </div>
          ))}

          {/* Stat inferior */}
          <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
            <div style={{ height: 1, background: `${B}18`, marginBottom: '0.625rem' }} />
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '1.25rem', fontWeight: 800, color: '#fff', lineHeight: 1,
            }}>
              +$450M
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '0.62rem',
              color: 'rgba(255,255,255,0.30)', marginTop: '0.18rem', lineHeight: 1.3,
            }}>
              MXN en OPEX<br/>optimizado
            </div>
          </div>
        </div>

      </div>

      {/* ── Stats bar ───────────────────────────────────────────── */}
      <div style={{
        borderTop: `1px solid ${B}18`,
        padding: '0.55rem 1rem',
        display: 'flex', alignItems: 'center',
        background: `${B}06`,
      }}>
        {[
          { v: '+150',    l: 'proyectos' },
          { v: '7',       l: 'estados' },
          { v: '12',      l: 'activos' },
          { v: '≤36m',    l: 'payback' },
          { v: '−2,195t', l: 'CO₂ evitadas' },
        ].map((s, i, arr) => (
          <div key={s.l} style={{
            flex: 1, textAlign: 'center',
            borderRight: i < arr.length - 1 ? `1px solid ${B}15` : 'none',
            padding: '0 0.4rem',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.78rem', fontWeight: 800, color: '#fff', lineHeight: 1,
            }}>
              {s.v}
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.58rem', color: 'rgba(255,255,255,0.28)', marginTop: '0.12rem',
            }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
