'use client'

import { useState, useEffect } from 'react'

const TERMS = [
  { term: 'OPEX', def: 'Gastos operativos: lo que pagas cada mes para mantener tu operación (luz, gas, agua, mantenimiento).' },
  { term: 'CAPEX', def: 'Inversión de capital: el dinero que desembolsas una sola vez para comprar un equipo o sistema.' },
  { term: 'ESG', def: 'Desempeño ambiental, social y de gobernanza — los indicadores que miden el impacto sostenible de tu empresa.' },
  { term: 'BESS', def: 'Baterías inteligentes que guardan energía barata y la usan en horas pico, reduciendo tu factura eléctrica.' },
  { term: 'tCO₂e', def: 'Toneladas de CO₂ equivalente: unidad estándar para medir huella de carbono.' },
  { term: 'TIR', def: 'Tasa Interna de Retorno: rentabilidad de la inversión en % anual. Si supera tu costo de capital, el proyecto se justifica solo.' },
  { term: 'Payback', def: 'Período de recuperación: meses que tardan los ahorros en pagar la inversión inicial. En nuestros proyectos típicamente 18–36 meses.' },
  { term: 'Demanda CFE', def: 'Cargo mensual que CFE cobra según tu pico de consumo, no solo por cuánta energía usas en total.' },
  { term: 'Factor de Potencia', def: 'Eficiencia con la que tu instalación usa la energía eléctrica. Un factor bajo genera cargos extra en tu factura CFE.' },
  { term: 'Cogeneración', def: 'Producción simultánea de electricidad y calor útil a partir de un solo combustible — más eficiente que generarlos por separado.' },
]

export default function GlossaryPanel() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        className={`gloss-btn`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="glossPanel"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        Glosario
      </button>

      <div
        id="glossPanel"
        className={`gloss-panel${open ? ' gloss-open' : ''}`}
        role="dialog"
        aria-label="Glosario de términos técnicos"
      >
        <p className="gloss-title">Glosario técnico</p>
        {TERMS.map(({ term, def }) => (
          <div key={term} className="gloss-item">
            <div className="gloss-term">{term}</div>
            <div className="gloss-def">{def}</div>
          </div>
        ))}
      </div>
    </>
  )
}
