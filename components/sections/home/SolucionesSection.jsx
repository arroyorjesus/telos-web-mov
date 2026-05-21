import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'

const SOLUTIONS = [
  {
    num: '01/',
    area: 'Optimización eléctrica',
    title: 'Reducción de demanda\ny generación distribuida',
    descJsx: true,
    desc: null,
    tags: ['Solar fotovoltaico', 'BESS', 'Optimización de demanda CFE', 'Factor de potencia', 'Generación distribuida'],
    img: '/images/sectores/electrica.jpg',
    alt: 'Proyecto eléctrico TELOS',
    style: { '--i': 0 },
  },
  {
    num: '02/',
    area: 'Ingeniería térmica',
    title: 'Modernización de\ninfraestructura térmica',
    desc: 'Sustituimos infraestructura térmica obsoleta por sistemas de alta eficiencia — calderas de condensación, cogeneración y recuperación de calor — con impacto directo en OPEX y emisiones.',
    tags: ['Calderas de condensación', 'Cogeneración', 'Heat pumps', 'Recuperación de calor', 'ACS solar térmica'],
    img: '/images/sectores/termica.jpg',
    alt: 'Proyecto de gas térmico TELOS',
    style: { '--i': 1 },
  },
  {
    num: '03/',
    area: 'Estrategia hídrica',
    title: 'Resiliencia hídrica\ny reducción de OPEX',
    desc: 'Eliminamos la dependencia de pipas, reducimos el costo hídrico y garantizamos continuidad operativa mediante tratamiento, reúso y gestión técnica del recurso.',
    tags: ['Tratamiento y reúso', 'Ósmosis inversa', 'Captación pluvial', 'Presurización eficiente', 'Gestión hídrica'],
    img: '/images/sectores/hidrica.jpg',
    alt: 'Proyecto de agua TELOS',
    style: { '--i': 2 },
  },
  {
    num: '04/',
    area: 'Infraestructura integral',
    title: 'Estructuración\ntécnico-financiera integral.',
    desc: 'Eléctrica, térmica e hídrica bajo una sola estrategia técnica y financiera. Un interlocutor, ingeniería integrada, impacto verificable en OPEX y ESG.',
    tags: [],
    cta: true,
    img: '/images/sectores/infraestructura.jpg',
    alt: 'Estrategia integral TELOS',
    overlay: 'rgba(0,0,0,0.50)',
    style: { '--i': 3 },
  },
]

export default function SolucionesSection() {
  return (
    <section className="solutions-section" id="soluciones" aria-labelledby="sol-heading">

      <div className="sol-header-row">
        <div className="sol-header-left reveal" style={{ '--i': 0 }} suppressHydrationWarning>
          <span className="sol-badge-blue">Capacidades</span>
          <h2 id="sol-heading" className="sol-h2">
            Cuatro especialidades.<br/>
            <em>Una sola firma.</em>
          </h2>
          <p className="sol-subtitle">
            No un catálogo de tecnología.<br/>Proyectos diseñados a la medida de tu operación con impacto en margen, resiliencia y desempeño{' '}
            <span className="tt-tap">ESG<span className="tt-pop" style={{ color: '#1e293b' }}>Ambiental, Social y Gobernanza: los criterios que reportas a corporativos, bancos e inversionistas para demostrar operación responsable.</span></span>
            {' '}documentado.
          </p>
        </div>
        <Link href="/contacto" className="sol-know-more reveal" style={{ '--i': 1 }} suppressHydrationWarning>
          Evaluar mi infraestructura &rarr;
        </Link>
      </div>

      <div className="sol-grid-main">
        {SOLUTIONS.map((sol) => (
          <article key={sol.num} className="sol-card reveal" style={sol.style} aria-label={`Solución ${sol.area}`} suppressHydrationWarning>
            <Image
              className="sol-card-img"
              src={sol.img}
              alt={sol.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="sol-card-dark-overlay" style={sol.overlay ? { background: sol.overlay } : undefined}></div>
            <div className="sol-card-inner">
              <div className="sol-card-num-row">
                <span>{sol.num}</span>
                <span>{sol.area}</span>
              </div>
              <div className="sol-card-spacer"></div>
              <div className="sol-card-bottom" style={sol.num === '02/' ? { maxWidth: 560 } : undefined}>
                <h3 className="sol-card-title">
                  {sol.title.split('\n').map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br/>}</span>
                  ))}
                </h3>
                <div className="sol-card-divider"></div>
                {sol.descJsx ? (
                  <p className="sol-card-desc">
                    Diseñamos sistemas fotovoltaicos,{' '}
                    <span className="tt-tap">BESS<span className="tt-pop">Baterías inteligentes que almacenan energía en horas baratas y la usan en horas pico — sin depender de la red.</span></span>
                    {' '}y estrategias de optimización de demanda CFE que reducen el OPEX eléctrico y mejoran la resiliencia del activo.
                  </p>
                ) : (
                  <p className="sol-card-desc">{sol.desc}</p>
                )}
                {sol.tags.length > 0 && (
                  <div className="sol-tech-tags">
                    {sol.tags.map((t) => <span key={t} className="sol-tech-tag">{t}</span>)}
                  </div>
                )}
                {sol.cta && (
                  <Link href="/contacto" className="sol-integral-btn">
                    ¿Cuánto puedo optimizar de mi operación? &rarr;
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

    </section>
  )
}
