import Reveal from '@/components/ui/Reveal'
import { CASE_STUDIES_ELECTRICIDAD } from '@/data/caseStudies'

const GREEN = '#22c55e'

// Aggregate stats for the bottom bar
const STATS = [
  { num: '637 kWp',      label: 'capacidad fotovoltaica instalada' },
  { num: '$8.3M MXN',   label: 'OPEX optimizado / año en portafolio' },
  { num: '≤36 meses',   label: 'payback promedio garantizado' },
  { num: '−2,195t',     label: 'CO₂ evitadas acumuladas' },
]

// Map data for result-card format
function toResultCard(cs) {
  const mxn = (cs.savingsNum / 1_000_000).toFixed(1)
  return {
    id:       cs.id,
    vertical: 'ELECTRICIDAD',
    metric:   `$${mxn}M`,
    metricSub:`MXN en OPEX optimizado / año · ${cs.capacity} instalados`,
    project:  cs.title,
    desc:     `${cs.subtitle}. ${cs.detail}.`,
    tags:     cs.tags,
  }
}

export default function ElectricidadCases() {
  const [hero, ...rest] = CASE_STUDIES_ELECTRICIDAD.map(toResultCard)

  return (
    <section id="electricidad" className="results-section">
      <div className="results-inner">

        {/* ── Header ──────────────────────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>
          <Reveal style={{ '--i': 0 }}>
            <span className="section-badge badge-green" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              Electricidad · Energía solar fotovoltaica
            </span>
          </Reveal>

          <h2 className="section-h2 reveal-heading" style={{ '--i': 1, marginBottom: '0.875rem' }}>
            Generación distribuida.{' '}
            <span style={{ color: GREEN }}>Independencia de CFE.</span>
          </h2>

          <p className="section-sub reveal" style={{ '--i': 2 }}>
            Sistemas fotovoltaicos con BESS para operaciones de alto consumo.
            ROI garantizado en ≤&nbsp;36 meses. Sin depender de la red.
          </p>
        </div>

        {/* ── Cards grid ─────────────────────────────────── */}
        <div className="results-grid">

          {/* Featured hero card */}
          <div className="result-card result-card-hero reveal-card" style={{ '--i': 3 }}>
            <div className="result-card-bar" style={{ background: `linear-gradient(to bottom, ${GREEN}, #16a34a)` }} />

            {/* Left: big metric */}
            <div className="result-hero-left">
              <div className="result-card-vert">
                <span className="result-card-dot" style={{ background: GREEN }} />
                {hero.vertical}
              </div>
              <div className="result-metric" style={{ color: GREEN }}>{hero.metric}</div>
              <div className="result-metric-sub">{hero.metricSub}</div>
            </div>

            {/* Right: project detail */}
            <div>
              <div className="result-divider" />
              <div className="result-project">{hero.project}</div>
              <div className="result-desc">{hero.desc}</div>
              <div className="result-tags">
                {hero.tags.map(t => <span key={t} className="result-tag">{t}</span>)}
              </div>
            </div>
          </div>

          {/* Secondary cards */}
          {rest.map((cs, i) => (
            <div key={cs.id} className="result-card reveal-card" style={{ '--i': 4 + i }}>
              <div className="result-card-bar" style={{ background: `linear-gradient(to bottom, ${GREEN}, #16a34a)` }} />
              <div className="result-card-vert">
                <span className="result-card-dot" style={{ background: GREEN }} />
                {cs.vertical}
              </div>
              <div className="result-metric" style={{ color: GREEN }}>{cs.metric}</div>
              <div className="result-metric-sub">{cs.metricSub}</div>
              <div className="result-divider" />
              <div className="result-project">{cs.project}</div>
              <div className="result-desc">{cs.desc}</div>
              <div className="result-tags">
                {cs.tags.map(t => <span key={t} className="result-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom stat bar ─────────────────────────────── */}
        <Reveal className="results-statbar" style={{ '--i': 7 }}>
          {STATS.map(s => (
            <div key={s.num} className="results-statbar-item">
              <span className="results-statbar-num">{s.num}</span>
              <span className="results-statbar-label">{s.label}</span>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  )
}
