import Reveal from '@/components/ui/Reveal'

const RESULTS = [
  {
    type: 'Electricidad', typeColor: '#0d5c91',
    metric: '$3.9M', metricSub: 'MXN en OPEX optimizado / año · 340 kWp instalados',
    project: 'CEDIS · Puebla',
    desc: 'Centro de distribución logístico. 540 paneles de 630W en azotea. Sistema conectado a red sin baterías. El proyecto más grande de la cartera ejecutada.',
    tags: ['Logística', 'Industrial', 'Fotovoltaico'],
    hero: true,
    style: { '--i': 1 },
  },
  {
    type: 'Gas térmico', typeColor: '#f97316',
    metric: '50%', metricSub: 'menos en factura mensual de gas · -80% CO₂',
    project: 'Centro deportivo · CDMX',
    desc: '7 calderas de condensación sustituyen sistema convencional completo. $500k → ~$250k MXN / mes.',
    tags: ['Deportivo', '7 calderas', 'Condensación'],
    style: { '--i': 2 },
  },
  {
    type: 'Agua', typeColor: '#06b6d4',
    metric: '30%', metricSub: 'agua recuperada que antes se desechaba · 0 paros',
    project: 'Hotel · Los Cabos, BCS',
    desc: 'Planta de ósmosis inversa 1 L/seg. Dependencia total de agua desalada eliminada. Cero paros por desabasto.',
    tags: ['Hotelería', 'Ósmosis inversa', '1 L/seg'],
    style: { '--i': 3 },
  },
  {
    type: 'Gas térmico', typeColor: '#f97316',
    metric: '-70%', metricSub: 'emisiones CO₂ · -3,300 toneladas evitadas',
    project: 'Hotel 190 hab · Los Cabos, BCS',
    desc: '13 calderas + 6 tanques ACS + intercambiadores de calor para albercas. 30% ahorro en factura.',
    tags: ['Hotelería', '13 calderas', 'ACS'],
    style: { '--i': 4 },
  },
  {
    type: 'Electricidad', typeColor: '#0d5c91',
    metric: '$3.4M', metricSub: 'MXN en OPEX optimizado / año · 297 kWp instalados',
    project: 'Parque industrial · Amozoc, Puebla',
    desc: 'Parque industrial multi-nave. 540 paneles de 550W distribuidos. Sistema unificado de medición.',
    tags: ['Industrial', 'Multi-nave', 'Fotovoltaico'],
    style: { '--i': 5 },
  },
]

const STATBAR = [
  { num: '150+', color: '#0d5c91', label: 'Proyectos ejecutados' },
  { num: '$23.5M', color: '#f97316', label: 'MXN en OPEX optimizado / año · portafolio activo' },
  { num: '2,195+', color: '#2d802a', label: 'tCO₂e evitadas acumuladas' },
  { num: '9', color: null, label: 'Estados de la República' },
]

export default function ResultsSection() {
  return (
    <section className="results-section" id="resultados" aria-labelledby="results-heading">
      <div className="results-inner">

        <Reveal style={{ '--i': 0, textAlign: 'center', marginBottom: '2.75rem' }}>
          <span className="section-badge badge-orange" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Proyectos ejecutados</span>
          <h2 id="results-heading" className="section-h2" style={{ marginBottom: '0.75rem', marginTop: '0.75rem' }}>
            Proyectos reales.<br/><span style={{ color: '#0d5c91' }}>Números reales.</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '36rem' }}>
            Resultados documentados en proyectos ejecutados.<br/>Sin estimaciones genéricas.<br/>Sin promesas sin respaldo.
          </p>
        </Reveal>

        <div className="results-grid">
          {RESULTS.map((r) => (
            <div
              key={r.project}
              className={`result-card${r.hero ? ' result-card-hero' : ''} reveal`}
              style={r.style}
            >
              <div className="result-card-bar" style={{ background: r.typeColor }}></div>
              {r.hero ? (
                <div className="result-hero-left">
                  <div className="result-card-vert" style={{ color: r.typeColor }}>
                    <span className="result-card-dot" style={{ background: r.typeColor }}></span>
                    {r.type}
                  </div>
                  <p className="result-metric" style={{ color: r.typeColor }}>{r.metric}</p>
                  <p className="result-metric-sub">{r.metricSub}</p>
                </div>
              ) : (
                <>
                  <div className="result-card-vert" style={{ color: r.typeColor }}>
                    <span className="result-card-dot" style={{ background: r.typeColor }}></span>
                    {r.type}
                  </div>
                  <p className="result-metric" style={{ color: r.typeColor }}>{r.metric}</p>
                  <p className="result-metric-sub">{r.metricSub}</p>
                </>
              )}
              <div>
                <div className="result-divider"></div>
                <p className="result-project">{r.project}</p>
                <p className="result-desc">{r.desc}</p>
                <div className="result-tags">
                  {r.tags.map((t) => <span key={t} className="result-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Reveal className="results-statbar reveal" style={{ '--i': 7 }}>
          {STATBAR.map(({ num, color, label }) => (
            <div key={label} className="results-statbar-item">
              <span className="results-statbar-num" style={color ? { color } : undefined}>{num}</span>
              <span className="results-statbar-label">{label}</span>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  )
}
