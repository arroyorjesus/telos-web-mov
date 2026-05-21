'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const G  = '#2d802a'   // Verde Telos
const B  = '#0d5c91'   // Azul Telos
const BG = '#060e18'

const ESTADOS = [
  {
    id: 'cdmx',    label: 'Ciudad de México', zona: 'Centro',
    activos: 4,
    proyectos: [
      'Corporativo Coyoacán · Optimización eléctrica',
      'Hotel 190 hab · Estrategia hídrica',
      'CEDIS · 165 kWp instalados',
      'Captación pluvial · 24,000 L',
    ],
  },
  {
    id: 'puebla',  label: 'Puebla', zona: 'Centro-Oriente',
    activos: 2,
    proyectos: [
      'CEDIS Puebla · 340 kWp instalados',
      'Parque Industrial Amozoc · 297 kWp',
    ],
  },
  {
    id: 'edomex',  label: 'Estado de México', zona: 'Centro',
    activos: 1,
    proyectos: ['Gimnasio · 3 calderas reemplazan 8 · −40%'],
  },
  {
    id: 'jalisco', label: 'Guadalajara, Jalisco', zona: 'Occidente',
    activos: 1,
    proyectos: ['Planta industrial · Optimización eléctrica'],
  },
  {
    id: 'nl',      label: 'Monterrey, N.L.', zona: 'Noreste',
    activos: 1,
    proyectos: ['Planta industrial · Agua + Electricidad'],
  },
  {
    id: 'bcs',     label: 'Los Cabos, BCS', zona: 'Noroeste',
    activos: 2,
    proyectos: [
      'Hotel · 13 calderas de condensación',
      'Ósmosis inversa · 30% recuperado',
    ],
  },
  {
    id: 'qroo',    label: 'Quintana Roo', zona: 'Sureste',
    activos: 1,
    proyectos: ['Complejo hotelero · Estrategia hídrica integral'],
  },
]

export default function MapaCobertura() {
  const [hoverId, setHoverId] = useState(null)
  const hovered = ESTADOS.find(e => e.id === hoverId) ?? null

  return (
    <div style={{
      background: BG,
      border: `1px solid ${B}28`,
      borderRadius: '1.25rem',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* ── Header ────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.7rem 1rem',
        borderBottom: `1px solid ${B}1a`,
        background: `${B}07`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: G, display: 'inline-block',
            boxShadow: `0 0 7px ${G}`,
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.58rem', fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: `${B}bb`,
          }}>
            Presencia nacional
          </span>
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.58rem', fontWeight: 700,
          color: `${G}99`,
        }}>
          32 estados · instalación disponible
        </span>
      </div>

      {/* ── Nota de cobertura ──────────────────────────────────────── */}
      <div style={{ padding: '0.875rem 1rem 0' }}>
        <div style={{
          background: `${B}0e`,
          border: `1px solid ${B}22`,
          borderRadius: '0.6rem',
          padding: '0.6rem 0.8rem',
        }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.5,
            margin: 0,
          }}>
            Ejecutamos instalaciones en cualquier punto de la{' '}
            <span style={{ color: `${B}dd`, fontWeight: 600 }}>
              República Mexicana
            </span>
            {' '}— hasta 8 cuadrillas simultáneas. Los estados marcados tienen{' '}
            <span style={{ color: G, fontWeight: 600 }}>proyectos activos</span>{' '}hoy.
          </p>
        </div>
      </div>

      {/* ── Lista de estados ───────────────────────────────────────── */}
      <div style={{ padding: '0.75rem 1rem 0.875rem', position: 'relative' }}>

        {/* Eyebrow */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.5rem', fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: `${B}50`, marginBottom: '0.5rem',
        }}>
          Proyectos activos — hover para ver detalle
        </div>

        {/* Grid 2 columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem' }}>
          {ESTADOS.map((e) => {
            const isHov = hoverId === e.id
            return (
              <div
                key={e.id}
                onMouseEnter={() => setHoverId(e.id)}
                onMouseLeave={() => setHoverId(null)}
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0.6rem',
                  borderRadius: '0.5rem',
                  cursor: 'default',
                  background: isHov ? `${G}12` : `${B}07`,
                  border: `1px solid ${isHov ? G + '35' : B + '18'}`,
                  transition: 'all 0.18s ease',
                  gap: '0.4rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', minWidth: 0 }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: '50%',
                    background: G, flexShrink: 0,
                    boxShadow: isHov ? `0 0 10px ${G}` : `0 0 5px ${G}55`,
                    display: 'inline-block',
                    transition: 'box-shadow 0.2s',
                  }} />
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.72rem',
                    fontWeight: isHov ? 600 : 400,
                    color: isHov ? '#fff' : 'rgba(255,255,255,0.58)',
                    transition: 'color 0.18s',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {e.label}
                  </span>
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.5rem', fontWeight: 700,
                  color: isHov ? G : `${G}70`,
                  flexShrink: 0,
                  transition: 'color 0.18s',
                }}>
                  ×{e.activos}
                </span>
              </div>
            )
          })}
        </div>

        {/* Tooltip de proyectos */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                background: '#060f1a',
                border: `1px solid ${B}50`,
                borderRadius: '0.75rem',
                padding: '0.75rem 0.875rem',
                pointerEvents: 'none',
                boxShadow: `0 16px 48px rgba(0,0,0,0.7)`,
                zIndex: 20,
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '0.4rem',
              }}>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.5rem', fontWeight: 700,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: `${B}70`, marginBottom: '0.08rem',
                  }}>
                    {hovered.zona}
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.85rem', fontWeight: 700, color: '#fff',
                  }}>
                    {hovered.label}
                  </div>
                </div>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.5rem', fontWeight: 700,
                  color: G, background: `${G}18`,
                  border: `1px solid ${G}35`,
                  borderRadius: '100px', padding: '0.15rem 0.5rem',
                }}>
                  {hovered.activos} {hovered.activos === 1 ? 'activo' : 'activos'}
                </span>
              </div>
              <div style={{ height: 1, background: `${B}22`, margin: '0.4rem 0' }} />
              {hovered.proyectos.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.18rem' }}>
                  <span style={{
                    width: 3, height: 3, borderRadius: '50%',
                    background: `${G}80`, flexShrink: 0,
                    marginTop: '0.35rem', display: 'inline-block',
                  }} />
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.66rem', color: 'rgba(255,255,255,0.48)',
                    lineHeight: 1.4,
                  }}>
                    {p}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <div style={{
        borderTop: `1px solid ${B}16`,
        padding: '0.5rem 1rem',
        display: 'flex', alignItems: 'center',
        background: `${B}05`,
      }}>
        {[
          { v: '+150',    l: 'proyectos' },
          { v: '7',       l: 'activos hoy' },
          { v: '8',       l: 'cuadrillas' },
          { v: '≤36m',    l: 'payback' },
          { v: '+$450M',  l: 'OPEX optimizado' },
        ].map((s, i, arr) => (
          <div key={s.l} style={{
            flex: 1, textAlign: 'center',
            borderRight: i < arr.length - 1 ? `1px solid ${B}14` : 'none',
            padding: '0 0.35rem',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem', fontWeight: 800,
              color: '#fff', lineHeight: 1,
            }}>
              {s.v}
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.55rem', color: 'rgba(255,255,255,0.27)',
              marginTop: '0.1rem',
            }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
