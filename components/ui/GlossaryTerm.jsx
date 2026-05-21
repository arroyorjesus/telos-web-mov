'use client'

import { useState, useRef } from 'react'
import { GLOSSARY_MAP } from '@/data/glossary'

/**
 * GlossaryTerm — tooltip inline para términos técnicos.
 *
 * Uso con texto propio del término:   <GlossaryTerm term="OPEX" dark />
 * Uso envolviendo texto existente:    <GlossaryTerm term="BESS" dark>almacenamiento de baterías</GlossaryTerm>
 *
 * dark=true  → subrayado blanco  (secciones oscuras / dark gradient)
 * dark=false → subrayado azul    (secciones claras, default)
 */
export default function GlossaryTerm({ term, children, dark = false }) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos]         = useState({ x: 0, y: 0 })
  const ref                   = useRef(null)

  const entry = GLOSSARY_MAP[term]
  if (!entry) return <>{children ?? <span>{term}</span>}</>

  function handleMouseEnter() {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({ x: rect.left, y: rect.bottom })
    setVisible(true)
  }

  const lineColor = dark
    ? 'rgba(255,255,255,0.28)'
    : 'rgba(13,92,145,0.45)'

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0}
        aria-describedby={`gloss-${entry.id}`}
        style={{
          cursor: 'help',
          borderBottom: `1px dashed ${lineColor}`,
          textDecoration: 'none',
          outline: 'none',
        }}
      >
        {children ?? term}
      </span>

      {visible && (
        <span
          id={`gloss-${entry.id}`}
          role="tooltip"
          style={{
            position: 'fixed',
            left: Math.min(
              pos.x,
              typeof window !== 'undefined' ? window.innerWidth - 288 : pos.x
            ),
            top: pos.y + 8,
            zIndex: 9999,
            width: 272,
            background: '#021829',
            border: '1px solid rgba(43,143,212,0.28)',
            borderRadius: '0.625rem',
            padding: '0.625rem 0.875rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.40)',
            pointerEvents: 'none',
          }}
        >
          {/* Term + fullTerm */}
          <span style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.375rem',
            marginBottom: '0.3rem',
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#2b8fd4',
            }}>
              {entry.term}
            </span>
            {entry.fullTerm !== entry.term && (
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.6rem',
                color: 'rgba(255,255,255,0.30)',
                letterSpacing: '0.02em',
              }}>
                {entry.fullTerm}
              </span>
            )}
          </span>

          {/* Short definition */}
          <span style={{
            display: 'block',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.62)',
            lineHeight: 1.55,
          }}>
            {entry.short}
          </span>
        </span>
      )}
    </>
  )
}
