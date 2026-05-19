import Reveal from '@/components/ui/Reveal'

const STEPS = [
  {
    phase: 'Análisis', phaseColor: '#2d802a', num: '01',
    title: 'Lectura operativa y financiera',
    desc: 'Analizamos tu información existente — recibos, históricos de consumo, demanda registrada, procesos térmicos y condiciones de infraestructura — sin instalar hardware adicional ni interrumpir tu operación.',
  },
  {
    phase: 'Diagnóstico', phaseColor: '#0d5c91', num: '02',
    title: 'Baseline de consumo y desempeño',
    desc: 'Establecemos la línea base técnica de tu operación: intensidad energética por proceso, eficiencia por sistema, comparativa sectorial y huella de carbono actual verificable.',
  },
  {
    phase: 'Ingeniería', phaseColor: '#0d5c91', num: '03',
    title: 'Ingeniería de oportunidades',
    desc: 'Identificamos y priorizamos intervenciones por impacto en OPEX, complejidad técnica y payback proyectado. Cada oportunidad se cuantifica en MXN, tCO₂e y meses de retorno.',
  },
  {
    phase: 'Estructuración', phaseColor: '#f97316', num: '04',
    title: 'Estructuración técnica y financiera',
    descJsx: true,
  },
  {
    phase: 'Ejecución', phaseColor: '#f97316', num: '05',
    title: 'Implementación llave en mano',
    desc: 'Ejecutamos el proyecto completo: gestión de permisos, suministro de equipos, instalación certificada (ANCE · STPS · NOM) y puesta en marcha documentada contra el baseline establecido.',
  },
  {
    phase: 'Verificación', phaseColor: '#2d802a', num: '06',
    title: 'Verificación de impacto',
    desc: 'Documentamos el impacto real contra la línea base con reportes de desempeño operativo, seguimiento continuo de los sistemas instalados y soporte técnico sostenido. No desaparecemos.',
  },
]

export default function HowWeWorkSection() {
  return (
    <section className="method-section" id="como-trabajamos" aria-labelledby="method-heading">
      <div className="method-inner">

        <Reveal className="method-header reveal" style={{ '--i': 0 }}>
          <span className="section-badge" style={{
            border: '1px solid rgba(13,92,145,0.2)',
            background: 'rgba(13,92,145,0.07)',
            color: '#0d5c91',
            marginBottom: '1rem',
            display: 'inline-flex',
          }}>
            Método TELOS
          </span>
          <h2 id="method-heading" className="section-h2" style={{ marginBottom: '0.75rem', marginTop: '0.75rem' }}>
            Seis fases.<br/>Sin improviso.
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '38rem' }}>
            Cada proyecto sigue seis etapas de rigor técnico y financiero.<br/>
            Diagnóstico preciso, ejecución eficiente, impacto documentado.
          </p>
        </Reveal>

        <Reveal className="method-grid reveal" style={{ '--i': 1 }}>
          {STEPS.map((step) => (
            <div key={step.num} className="method-step">
              <span className="method-step-phase" style={{ color: step.phaseColor }}>{step.phase}</span>
              <span className="method-step-num" style={{ color: step.phaseColor }}>{step.num}</span>
              <h3 className="method-step-title">{step.title}</h3>
              {step.descJsx ? (
                <p className="method-step-desc">
                  Diseñamos la solución con ingeniería de detalle, análisis de{' '}
                  <span className="tt-tap">TIR<span className="tt-pop">Tasa Interna de Retorno: qué tan rentable es la inversión expresado en % anual. Si la TIR supera tu costo de capital, el proyecto se aprueba solo.</span></span>
                  ,{' '}
                  <span className="tt-tap">payback<span className="tt-pop">Tiempo de recuperación: en cuántos meses los ahorros generados pagan la inversión inicial. En nuestros proyectos típicamente entre 18 y 36 meses.</span></span>
                  , estructura de{' '}
                  <span className="tt-tap">CAPEX<span className="tt-pop">Inversión de capital: el dinero que desembolsas de una sola vez para comprar un equipo o sistema.</span></span>
                  {' '}evitado y opciones de financiamiento cuando aplica. Sin sorpresas en la implementación.
                </p>
              ) : (
                <p className="method-step-desc">{step.desc}</p>
              )}
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  )
}
