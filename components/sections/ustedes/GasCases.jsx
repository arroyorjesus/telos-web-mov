import Reveal from '@/components/ui/Reveal'
import { CASE_STUDIES_GAS } from '@/data/caseStudies'

// Naranja Telos
const ORANGE = '#f97316'

const STATS = [
  { num: '23 calderas',  label: 'de alta eficiencia instaladas en portafolio' },
  { num: '−50%',         label: 'ahorro promedio en factura de gas' },
  { num: '−3,300t',      label: 'CO₂ evitadas · proyecto más grande' },
  { num: '≤36 meses',    label: 'payback garantizado · modernización sin descapitalizar' },
]

function toResultCard(cs) {
  const CARDS = {
    'deportivo-cdmx': {
      metric:    '−50%',
      metricSub: 'en factura de gas · Modernización con inversión neta cero · CDMX',
      desc:      '7 calderas obsoletas reemplazadas. $250,000 MXN/mes de ahorro neto que pagan la inversión. Desperdicio térmico eliminado. La planta se moderniza sin descapitalizarse.',
    },
    'hotel-190-cabos': {
      metric:    '−3,300t',
      metricSub: 'CO₂ evitadas · −70% vs instalación anterior · Los Cabos, BCS',
      desc:      '13 calderas de condensación + 6 tanques ACS + intercambiadores para albercas. Tecnología obsoleta sustituida. El ahorro generado financia la modernización completa.',
    },
    'gimnasio-edomex': {
      metric:    '−40%',
      metricSub: 'en factura · 3 calderas TELOS reemplazan 8 · Desperdicio cero · Edomex',
      desc:      'Modernización inteligente: 3 equipos de alta eficiencia reemplazan 8 unidades obsoletas. −90% en emisiones CO₂. El sistema se paga solo antes de los 36 meses.',
    },
  }
  const c = CARDS[cs.id] ?? { metric: `−${cs.savingsPct}%`, metricSub: cs.subtitle, desc: cs.savings }
  return {
    id:        cs.id,
    vertical:  'INGENIERÍA TÉRMICA',
    metric:    c.metric,
    metricSub: c.metricSub,
    project:   cs.title,
    desc:      c.desc,
    tags:      cs.metrics,
  }
}

export default function GasCases() {
  const [hero, ...rest] = CASE_STUDIES_GAS.map(toResultCard)

  return (
    <section id="gas" className="results-section">
      <div className="results-inner">

        {/* ── Header ──────────────────────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>
          <Reveal style={{ '--i': 0 }}>
            <span className="section-badge badge-orange" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              Ingeniería térmica · Alta eficiencia
            </span>
          </Reveal>

          <h2 className="section-h2 reveal-heading" style={{ '--i': 1, marginBottom: '0.875rem' }}>
            Calor inteligente.{' '}
            <span style={{ color: ORANGE }}>Corta el consumo de gas a la mitad.</span>
          </h2>

          <p className="section-sub reveal" style={{ '--i': 2 }}>
            Sustituye tecnología obsoleta por sistemas de alta eficiencia. El ahorro generado
            paga la inversión, modernizando tu planta sin descapitalizarte.
          </p>
        </div>

        {/* ── Cards grid ─────────────────────────────────── */}
        <div className="results-grid">

          {/* Featured hero card */}
          <div className="result-card result-card-hero reveal-card" style={{ '--i': 3 }}>
            <div className="result-card-bar" style={{ background: `linear-gradient(to bottom, ${ORANGE}, #ea580c)` }} />

            {/* Left: big metric */}
            <div className="result-hero-left">
              <div className="result-card-vert">
                <span className="result-card-dot" style={{ background: ORANGE }} />
                {hero.vertical}
              </div>
              <div className="result-metric" style={{ color: ORANGE }}>{hero.metric}</div>
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
              <div className="result-card-bar" style={{ background: `linear-gradient(to bottom, ${ORANGE}, #ea580c)` }} />
              <div className="result-card-vert">
                <span className="result-card-dot" style={{ background: ORANGE }} />
                {cs.vertical}
              </div>
              <div className="result-metric" style={{ color: ORANGE }}>{cs.metric}</div>
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
