import Reveal from '@/components/ui/Reveal'
import { CASE_STUDIES_ELECTRICIDAD } from '@/data/caseStudies'

// Verde Telos
const GREEN = '#2d802a'

const STATS = [
  { num: '637 kWp',     label: 'capacidad fotovoltaica instalada' },
  { num: '$8.3M MXN',  label: 'OPEX optimizado / año en portafolio' },
  { num: '≤36 meses',  label: 'payback promedio garantizado' },
  { num: '−2,195t',    label: 'CO₂ evitadas acumuladas' },
]

function toResultCard(cs) {
  const mxn = (cs.savingsNum / 1_000_000).toFixed(1)

  const DESCS = {
    'cedis-puebla':      'Blindaje energético completo. El ahorro mensual de $325K MXN se convierte en flujo de caja directo para la operación. BESS garantiza continuidad ante cortes de red.',
    'parque-amozoc':     'Control total del costo eléctrico. $283K MXN/mes que antes iban a CFE ahora fortalecen el margen operativo. Operación continua incluso sin suministro externo.',
    'corporativo-cdmx':  'Energía propia para una torre corporativa. El sistema se paga solo en menos de 36 meses y protege contra aumentos de tarifa eléctrica indefinidamente.',
  }

  return {
    id:        cs.id,
    vertical:  'OPTIMIZACIÓN ELÉCTRICA',
    metric:    `$${mxn}M`,
    metricSub: `MXN optimizados / año · ${cs.capacity} instalados · Payback ≤ 36 meses`,
    project:   cs.title,
    desc:      DESCS[cs.id] ?? `${cs.subtitle}. ${cs.detail}.`,
    tags:      cs.tags,
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
              Optimización eléctrica · Energía propia
            </span>
          </Reveal>

          <h2 className="section-h2 reveal-heading" style={{ '--i': 1, marginBottom: '0.875rem' }}>
            Energía propia.{' '}
            <span style={{ color: GREEN }}>Control total de tu costo eléctrico.</span>
          </h2>

          <p className="section-sub reveal" style={{ '--i': 2 }}>
            Deja de pagar renta a la red. Produce tu propia energía con sistemas inteligentes
            de almacenamiento y rompe la dependencia de las tarifas externas.
          </p>
        </div>

        {/* ── Cards grid ─────────────────────────────────── */}
        <div className="results-grid">

          {/* Featured hero card */}
          <div className="result-card result-card-hero reveal-card" style={{ '--i': 3 }}>
            <div className="result-card-bar" style={{ background: `linear-gradient(to bottom, ${GREEN}, #1e5c1d)` }} />

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
              <div className="result-card-bar" style={{ background: `linear-gradient(to bottom, ${GREEN}, #1e5c1d)` }} />
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
