import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const INPUTS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5ba3d6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
        <path d="M9 7h6M9 11h4"/>
      </svg>
    ),
    iconStyle: { background: 'rgba(13,92,145,0.15)', border: '1px solid rgba(13,92,145,0.3)' },
    title: 'Recibos y facturas',
    desc: 'Electricidad, gas, agua — histórico 12–24 meses',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
      </svg>
    ),
    iconStyle: { background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.25)' },
    title: 'Históricos de demanda',
    desc: 'Perfiles de carga, picos de demanda, factor de potencia',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    iconStyle: { background: 'rgba(45,128,42,0.12)', border: '1px solid rgba(45,128,42,0.25)' },
    title: 'Condiciones operativas',
    desc: 'Horarios, procesos térmicos, cargas críticas, paros',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    iconStyle: { background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' },
    title: 'Infraestructura instalada',
    desc: 'Equipos térmicos, tableros, sistemas hídricos existentes',
  },
]

const CheckIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

export default function DatosSection() {
  return (
    <section className="datos-section" id="metodologia-datos" aria-labelledby="datos-heading">
      <div className="datos-inner">

        {/* LEFT: copy */}
        <div>
          <Reveal className="datos-badge reveal" style={{ '--i': 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
            </svg>
            Nuestro punto de partida
          </Reveal>

          <h2 id="datos-heading" className="datos-h2 reveal-heading" style={{ '--i': 1 }}>
            Tu operación ya genera la información.<br/><em>Nosotros sabemos qué hacer con ella.</em>
          </h2>

          <p className="datos-sub reveal" style={{ '--i': 2 }}>
            Recibos, históricos de consumo, demanda registrada y condiciones reales de infraestructura.<br/>
            Con esa base construimos el análisis técnico-financiero antes de proponer cualquier intervención.
          </p>

          <ul className="datos-bullets reveal" style={{ '--i': 3 }}>
            {[
              'Sin depender de hardware adicional en la fase inicial',
              'Sin fricción operativa en tu planta o instalación',
              'Análisis basado en datos reales de tu operación — no estimaciones genéricas',
              'Priorización por impacto real en OPEX, resiliencia y cumplimiento',
            ].map((item) => (
              <li key={item}>
                <span className="datos-check"><CheckIcon /></span>
                {item}
              </li>
            ))}
            <li>
              <span className="datos-check"><CheckIcon /></span>
              Propuesta técnico-financiera antes de comprometer{' '}
              <span className="tt-tap">CAPEX<span className="tt-pop">Inversión de capital: el dinero que desembolsas de una sola vez para comprar un equipo o sistema.</span></span>
            </li>
          </ul>

          <Reveal className="reveal" style={{ '--i': 4 }}>
            <Link href="/contacto" className="datos-cta">
              Evaluar mi infraestructura
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </Reveal>
        </div>

        {/* RIGHT: data visual */}
        <Reveal className="datos-visual reveal" style={{ '--i': 2 }}>
          <p className="datos-visual-label">Información que ya tienes</p>

          {INPUTS.map(({ icon, iconStyle, title, desc }) => (
            <div key={title} className="datos-input-card">
              <div className="datos-input-icon" style={iconStyle}>{icon}</div>
              <div className="datos-input-text">
                <p className="datos-input-title">{title}</p>
                <p className="datos-input-desc">{desc}</p>
              </div>
            </div>
          ))}

          <div className="datos-arrow">
            <div className="datos-arrow-line"></div>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#2d802a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>

          <div className="datos-arrow-output">
            <div className="datos-input-icon" style={{ background: 'rgba(45,128,42,0.15)', border: '1px solid rgba(45,128,42,0.3)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2d802a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
            </div>
            <div>
              <span className="datos-output-label">Output TELOS</span>
              <p className="datos-output-title">Análisis técnico-financiero de oportunidades de OPEX</p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
