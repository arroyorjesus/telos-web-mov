import Link from 'next/link'
import Reveal from '@/components/ui/Reveal'

const TRUST = [
  'Comparativa basada en oferta pública',
  '4 modelos de mercado analizados',
  'Sin nombres · Solo hechos',
  'Decisión informada, no presionada',
]

const CheckCircle = () => (
  <svg
    className="final-cta-trust-check"
    width="14" height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
)

export default function EllosCTA() {
  return (
    <section className="final-cta-section cta-blue" id="ellos-cta" aria-labelledby="ellos-cta-heading">
      <div className="final-cta-inner">

        <Reveal style={{ '--i': 0 }}>
          <span className="final-cta-badge">
            <span className="final-cta-badge-dot" />
            Comparativa honesta · Sin compromiso inicial
          </span>
        </Reveal>

        <h2 id="ellos-cta-heading" className="final-cta-h2 reveal-heading" style={{ '--i': 1 }}>
          Compara con datos reales,<br/><em>no con promesas.</em>
        </h2>

        <p className="final-cta-sub reveal" style={{ '--i': 2 }}>
          Evaluamos tus opciones con información de tu propia operación:<br/>
          consumo, ROI, ahorro potencial y complejidad técnica.
        </p>

        <Reveal className="final-cta-buttons" style={{ '--i': 3 }}>
          <Link href="/contacto" className="final-cta-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
            Solicitar análisis comparativo
          </Link>
          <a
            href="https://wa.me/525544517101?text=Hola%2C%20quiero%20un%20an%C3%A1lisis%20comparativo%20de%20mi%20operaci%C3%B3n%20energ%C3%A9tica."
            className="final-cta-wa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar a TELOS por WhatsApp"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </Reveal>

        <p className="final-cta-micro reveal" style={{ '--i': 4 }}>
          Sin compromisos · Respuesta en menos de 24 horas hábiles<br/>
          Tu información es confidencial y no se comparte con terceros
        </p>

        <Reveal className="final-cta-trust" style={{ '--i': 5 }}>
          {TRUST.map((t) => (
            <span key={t} className="final-cta-trust-item">
              <CheckCircle />
              {t}
            </span>
          ))}
        </Reveal>

      </div>
    </section>
  )
}
