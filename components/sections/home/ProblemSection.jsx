'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const SECTOR_RATES = {
  corporativo: { elec: 0.70, gas: 0,    agua: 0.20, elecCost: 3.20, gasCostGJ: 0   },
  industrial:  { elec: 0.45, gas: 0.30, agua: 0.45, elecCost: 2.70, gasCostGJ: 140 },
  hoteles:     { elec: 1613797 / 3360000, gas: 0.35, agua: 0.20, elecCost: 3.00, gasCostGJ: 140 },
  residencial: { elec: 0.95, gas: 0,    agua: 0.20, elecCost: 6.20, gasCostGJ: 0   },
}

const CFE_FACTOR      = 0.000444
const CAR_CO2         = 4.6
const TREE_CO2        = 0.02177
const GAS_EF_KG_PER_GJ = 56.1
const BOILER_UPGRADE  = 0.14

function parsePesos(s) {
  return parseFloat(String(s).replace(/[^0-9.]/g, '')) || 0
}

function fmt(n) {
  return '$' + Math.round(n || 0).toLocaleString('es-MX')
}

function fmtInput(v) {
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ''))
  if (!n) return ''
  return n.toLocaleString('es-MX')
}

const EditIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

export default function ProblemSection() {
  const [sector, setSector] = useState('hoteles')
  const [elec, setElec] = useState('280,000')
  const [gas, setGas] = useState('95,000')
  const [agua, setAgua] = useState('38,000')
  const [result, setResult] = useState(null)

  const calc = useCallback(() => {
    const rates = SECTOR_RATES[sector]
    const eRaw = parsePesos(elec)
    const gRaw = parsePesos(gas)
    const aRaw = parsePesos(agua)

    const eSave = eRaw * rates.elec * 12
    const gSave = gRaw * rates.gas * 12
    const aSave = aRaw * rates.agua * 12
    const total = eSave + gSave + aSave
    const integral = total * 1.12

    const hasAny = eRaw > 0 || gRaw > 0 || aRaw > 0

    let co2Line = null
    let equiv = null
    if (hasAny) {
      const kwhSaved = rates.elecCost > 0 ? (eRaw * rates.elec * 12) / rates.elecCost : 0
      const co2Elec = kwhSaved * CFE_FACTOR
      const gjSaved = rates.gasCostGJ > 0 ? (gRaw * rates.gas * 12) / rates.gasCostGJ : 0
      const co2Gas = gjSaved * GAS_EF_KG_PER_GJ * BOILER_UPGRADE / 1000
      const co2Total = co2Elec + co2Gas

      if (co2Total > 0.01) {
        const cars = Math.round(co2Total / CAR_CO2)
        const trees = Math.round(co2Total * 1000 / (TREE_CO2 * 1000))
        co2Line = `~${co2Total.toFixed(1)} tCO₂e evitadas / año`
        equiv = cars > 0 ? `≈ ${cars.toLocaleString('es-MX')} autos fuera de circulación · ${trees.toLocaleString('es-MX')} árboles equivalentes` : null
      }
    }

    setResult({ eSave, gSave, aSave, total, integral, hasAny, co2Line, equiv,
      low: total * 0.80, high: total * 1.20 })
  }, [sector, elec, gas, agua])

  useEffect(() => { calc() }, [calc])

  return (
    <section className="problem-section" id="problema" aria-labelledby="problem-heading">
      <div className="problem-section-inner">

        {/* LEFT: copy + problem cards */}
        <div>
          <Reveal style={{ '--i': 0 }}>
            <span className="section-badge badge-orange">El desafío operativo</span>
          </Reveal>

          <Reveal as="h2" className="section-h2" style={{ '--i': 1, marginTop: '1rem', marginBottom: '1rem' }} id="problem-heading">
            Tu operación ya genera la información.<br/>
            <span style={{ color: '#0d5c91' }}>La mayoría no sabe qué hacer con ella.</span>
          </Reveal>

          <p className="section-sub reveal" style={{ '--i': 2, marginBottom: '2rem' }}>
            Electricidad, gas y agua absorben entre 8% y 25% del{' '}
            <span className="tt-tap">OPEX<span className="tt-pop" style={{ color: '#1e293b' }}>Gasto operativo: electricidad, gas, agua y mantenimiento — lo que pagas cada mes solo para mantener las puertas abiertas.</span></span>
            {' '}en activos intensivos.<br/>Sin ingeniería aplicada, esa presión crece cada año sin control ni palanca de mejora.
          </p>

          <div className="problem-cards">
            <div className="problem-card reveal" style={{ '--i': 3 }}>
              <div className="problem-card-bar" style={{ background: 'var(--orange)' }}></div>
              <div className="problem-card-head">
                <div className="problem-icon-wrap" style={{ background: 'rgba(249,115,22,0.10)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                    <polyline points="16 7 22 7 22 13"/>
                  </svg>
                </div>
                <h3 className="problem-title">
                  <span className="tt-tap">OPEX<span className="tt-pop" style={{ color: '#0f172a' }}>Gasto operativo: electricidad, gas, agua y mantenimiento — lo que pagas cada mes solo para mantener las puertas abiertas.</span></span>
                  {' '}energético sin palanca de mejora
                </h3>
              </div>
              <p className="problem-desc">Electricidad, gas y agua absorben entre el 8% y el 25% del OPEX en activos intensivos en consumo. Sin un proyecto de ingeniería, esa presión crece cada año sin control ni estrategia.</p>
            </div>

            <div className="problem-card reveal" style={{ '--i': 4 }}>
              <div className="problem-card-bar" style={{ background: '#ef4444' }}></div>
              <div className="problem-card-head">
                <div className="problem-icon-wrap" style={{ background: 'rgba(239,68,68,0.10)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m21.73 18-8-14a2 2 0 00-3.48 0l-8 14A2 2 0 004 21h16a2 2 0 001.73-3z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h3 className="problem-title">Infraestructura crítica con riesgo operativo</h3>
              </div>
              <p className="problem-desc">Equipos térmicos, sistemas eléctricos e instalaciones hídricas envejecen sin modernización planificada. El resultado: mayor consumo, menor eficiencia y exposición a paros no programados.</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Simulator */}
        <Reveal style={{ '--i': 2 }}>
          <div className="sim-card">
            <div className="sim-card-header">
              <p className="sim-card-title">Análisis de potencial de optimización de OPEX</p>
              <p className="sim-card-subtitle">Ingresa el gasto mensual promedio de tu operación. Los rangos se basan en proyectos ejecutados con infraestructura similar.</p>
            </div>

            <div className="sim-card-body">
              <div className="sim-body-grid">

                {/* LEFT col: inputs */}
                <div>
                  <label className="sim-label" htmlFor="simSector">Sector o Industria</label>
                  <select className="sim-select" id="simSector" value={sector} onChange={e => setSector(e.target.value)}>
                    <option value="corporativo">Corporativo y edificios de oficinas</option>
                    <option value="industrial">Industrial y manufactura</option>
                    <option value="hoteles">Hotelería, hospitales y clubes deportivos</option>
                    <option value="residencial">Desarrollos residenciales y comerciales</option>
                  </select>

                  <div className="sim-inputs">
                    {[
                      { id: 'simElec', label: 'Electricidad',  val: elec,  set: setElec,  cls: 'sim-input-elec'  },
                      { id: 'simGas',  label: 'Gas térmico',   val: gas,   set: setGas,   cls: 'sim-input-gas'   },
                      { id: 'simAgua', label: 'Agua',          val: agua,  set: setAgua,  cls: 'sim-input-agua'  },
                    ].map(({ id, label, val, set, cls }) => (
                      <div key={id}>
                        <label className="sim-label" htmlFor={id}>{label}</label>
                        <div className="sim-input-inner">
                          <span className="sim-input-prefix" aria-hidden="true">$</span>
                          <input
                            className={`sim-input ${cls}`}
                            id={id}
                            type="text"
                            inputMode="numeric"
                            value={val}
                            onFocus={e => { e.target.value = parsePesos(e.target.value) || '' }}
                            onBlur={e => { set(fmtInput(e.target.value)) }}
                            onChange={e => set(e.target.value)}
                            autoComplete="off"
                          />
                          <span className="sim-edit-icon" aria-hidden="true"><EditIcon /></span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="sim-reference-note" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                    <div className="sim-reference-note-body">
                      <span>Valores de referencia · </span>
                      <span className="sim-reference-cta" onClick={() => document.getElementById('simElec').focus()}>Personalizar</span>
                    </div>
                  </div>
                </div>

                {/* RIGHT col: output */}
                <div>
                  <div className="sim-output" id="simOutput" aria-live="polite" aria-atomic="true">
                    <p className="sim-output-eyebrow">Reducción de OPEX estimada</p>
                    <p className="sim-output-amount">{result ? fmt(result.total) : '$0'}</p>
                    <p className="sim-output-period">
                      {result?.hasAny ? 'MXN / año · rango orientativo' : 'MXN / año · ingresa el gasto mensual de tu operación'}
                    </p>

                    <div className="sim-output-range" style={{ opacity: result?.hasAny ? 1 : 0.3 }}>
                      Rango orientativo: <strong>{result ? fmt(result.low) : '—'}</strong> – <strong>{result ? fmt(result.high) : '—'}</strong> MXN / año
                    </div>

                    {[
                      { label: 'Electricidad', id: 'elec', val: result?.eSave, cls: 'sim-dot-elec' },
                      { label: 'Gas térmico',  id: 'gas',  val: result?.gSave, cls: 'sim-dot-gas'  },
                      { label: 'Agua',         id: 'agua', val: result?.aSave, cls: 'sim-dot-agua' },
                    ].map(({ label, id, val, cls }) => (
                      <div key={id} className="sim-output-row">
                        <span className="sim-output-row-label"><span className={`sim-dot ${cls}`} aria-hidden="true"></span>{label}</span>
                        <span className="sim-output-row-value">{val ? fmt(val) + ' / año' : '$0 / año'}</span>
                      </div>
                    ))}

                    <div className="sim-output-row sim-output-total-row" style={{ opacity: result?.hasAny ? 1 : 0.3 }}>
                      <span className="sim-output-row-label sim-output-total-label">Potencial OPEX integral</span>
                      <span className="sim-output-row-value sim-output-total-value">{result?.hasAny ? fmt(result.integral) + ' / año' : '— / año'}</span>
                    </div>

                    <div className="sim-esg">
                      <p className="sim-esg-title">Ahorro de emisiones o ESG potencial</p>
                      {result?.co2Line ? (
                        <>
                          <p className="sim-esg-value">{result.co2Line}</p>
                          {result.equiv && <p className="sim-esg-equiv">{result.equiv}</p>}
                        </>
                      ) : (
                        <p className="sim-esg-value" style={{ opacity: 0.3, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
                          Ingresa tus consumos para ver el impacto en CO₂.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/contacto" className="sim-cta" style={{ marginTop: '0.875rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
                ¿Cuánto puedo optimizar de mi operación?
              </Link>

              <p className="sim-disclaimer">
                Estimación orientativa · Sin compromiso<br/>
                Los valores reales se validan mediante diagnóstico técnico
              </p>

              <details className="sim-assumptions">
                <summary>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                  </svg>
                  Supuestos de cálculo
                </summary>
                <div className="sim-assumptions-body">
                  Los costos base convierten el ahorro económico en consumo estimado para calcular el impacto ambiental potencial. El diagnóstico técnico valida tarifa real, demanda, horarios, factor de carga, recibos, equipos y condiciones de operación.
                  <span className="sim-acc-section">Electricidad</span>
                  <table>
                    <tbody>
                      <tr><td>Corporativos y empresas</td><td>$3.20 MXN/kWh</td></tr>
                      <tr><td>Industrial y manufactura</td><td>$2.70 MXN/kWh</td></tr>
                      <tr><td>Hoteles, hospitales y clubes</td><td>$3.00 MXN/kWh</td></tr>
                      <tr><td>Residencial y pequeños negocios</td><td>$6.20 MXN/kWh</td></tr>
                    </tbody>
                  </table>
                  <span className="sim-acc-section">Gas térmico</span>
                  <table>
                    <tbody>
                      <tr><td>Gas natural</td><td>$140 MXN/GJ</td></tr>
                      <tr><td>Caldera de condensación</td><td>14% reducción referencial</td></tr>
                    </tbody>
                  </table>
                </div>
              </details>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
