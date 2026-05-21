import Reveal from '@/components/ui/Reveal'
import { CASE_STUDIES_AGUA } from '@/data/caseStudies'

// Azul Telos
const BLUE = '#0d5c91'

const STATS = [
  { num: '3 sistemas',    label: 'ósmosis · tratamiento · captación pluvial' },
  { num: '+84,000 L',     label: 'capacidad hídrica adicional en portafolio' },
  { num: '−11 pipas/mes', label: 'eliminadas del costo operativo mensual' },
  { num: '100%',          label: 'tasa de reuso en captación pluvial' },
]

function toResultCard(cs) {
  const CARDS = {
    'hotel-los-cabos': {
      metric:    '30%',
      metricSub: 'agua recuperada · Autonomía total · Payback ≤ 36 meses',
      desc:      'Autonomía hídrica total en zona de alta escasez. El 30% del agua desechada ahora se recupera. Cero paros operativos por desabasto. Cero estrés logístico por pipas.',
    },
    'hotel-190-cdmx': {
      metric:    '−3 pipas',
      metricSub: 'al mes eliminadas · +60,000 L disponibles · Hotel 190 hab',
      desc:      'Blindaje hídrico en operación hotelera de alta ocupación. Sin dependencia del suministro municipal. El ahorro en pipas se convierte en flujo de caja inmediato.',
    },
    'corporativo-captacion': {
      metric:    '−5 pipas',
      metricSub: 'al mes eliminadas · 24,000 L captación pluvial · CDMX',
      desc:      'Inversión neta cero: el sistema se paga con el ahorro en pipas evitadas. 100% del agua pluvial capturada regresa directamente a cisterna. Riesgo sanitario eliminado.',
    },
  }
  const c = CARDS[cs.id] ?? { metric: cs.highlight, metricSub: cs.subtitle, desc: cs.result }
  return {
    id:        cs.id,
    vertical:  'ESTRATEGIA HÍDRICA',
    metric:    c.metric,
    metricSub: c.metricSub,
    project:   cs.title,
    desc:      c.desc,
    tags:      cs.metrics,
  }
}

export default function AguaCases() {
  const [hero, ...rest] = CASE_STUDIES_AGUA.map(toResultCard)

  return (
    <section id="agua" className="results-section">
      <div className="results-inner">

        {/* ── Header ──────────────────────────────────────── */}
        <div style={{ marginBottom: '3rem' }}>
          <Reveal style={{ '--i': 0 }}>
            <span className="section-badge badge-blue" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              Estrategia hídrica · Continuidad operativa
            </span>
          </Reveal>

          <h2 className="section-h2 reveal-heading" style={{ '--i': 1, marginBottom: '0.875rem' }}>
            Blindaje hídrico.{' '}
            <span style={{ color: BLUE }}>Tu operación nunca se detiene.</span>
          </h2>

          <p className="section-sub reveal" style={{ '--i': 2 }}>
            Elimina el riesgo de falta de suministro. Tratamos, reusamos y capturamos agua
            para que tu negocio sea 100% autónomo, eliminando el costo y estrés de las pipas.
          </p>
        </div>

        {/* ── Cards grid ─────────────────────────────────── */}
        <div className="results-grid">

          {/* Featured hero card */}
          <div className="result-card result-card-hero reveal-card" style={{ '--i': 3 }}>
            <div className="result-card-bar" style={{ background: `linear-gradient(to bottom, ${BLUE}, #094a77)` }} />

            {/* Left: big metric */}
            <div className="result-hero-left">
              <div className="result-card-vert">
                <span className="result-card-dot" style={{ background: BLUE }} />
                {hero.vertical}
              </div>
              <div className="result-metric" style={{ color: BLUE }}>{hero.metric}</div>
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
              <div className="result-card-bar" style={{ background: `linear-gradient(to bottom, ${BLUE}, #094a77)` }} />
              <div className="result-card-vert">
                <span className="result-card-dot" style={{ background: BLUE }} />
                {cs.vertical}
              </div>
              <div className="result-metric" style={{ color: BLUE }}>{cs.metric}</div>
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
