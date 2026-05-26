import Link from 'next/link'
import { SITE } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Aviso de Privacidad',
  description:
    'Aviso de Privacidad de TELOS conforme a la LFPDPPP. Consulta el tratamiento de datos personales, derechos ARCO y uso de cookies.',
  path: '/privacidad',
})

const SECTIONS = [
  {
    title: '1. Responsable del tratamiento de datos personales',
    body: [
      `${SITE.legalName} ("TELOS"), con domicilio en ${SITE.address}, es responsable del tratamiento y protección de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del Aviso de Privacidad.`,
    ],
  },
  {
    title: '2. Datos personales que recabamos',
    body: [
      'Para las finalidades descritas en este aviso, podemos recabar las siguientes categorías de datos personales:',
    ],
    list: [
      'Datos de identificación y contacto: nombre, empresa, puesto, correo electrónico y número telefónico.',
      'Datos sobre tu operación: tipo de instalación, consumos de electricidad, gas y agua, y demás información técnica que nos compartas para elaborar un diagnóstico.',
      'Datos de navegación: dirección IP, tipo de dispositivo y páginas visitadas, recabados mediante tecnologías de rastreo.',
    ],
    after: ['No recabamos datos personales sensibles.'],
  },
  {
    title: '3. Finalidades del tratamiento',
    body: ['Tus datos personales serán utilizados para las siguientes finalidades primarias:'],
    list: [
      'Atender tus solicitudes de contacto, cotización y diagnóstico energético.',
      'Elaborar propuestas técnicas y financieras de eficiencia energética.',
      'Dar seguimiento a la relación comercial y prestar nuestros servicios.',
      'Cumplir obligaciones legales, fiscales y contractuales.',
    ],
    after: [
      'De forma adicional, y siempre que no te opongas, podremos usar tus datos para finalidades secundarias como el envío de información sobre servicios, contenidos y novedades de TELOS. Puedes manifestar tu negativa a estas finalidades escribiendo a ' + SITE.email + '.',
    ],
  },
  {
    title: '4. Transferencias de datos',
    body: [
      'TELOS no transfiere tus datos personales a terceros sin tu consentimiento, salvo en los casos previstos por el artículo 37 de la LFPDPPP (por ejemplo, cuando la transferencia sea necesaria por mandato de autoridad competente). Los proveedores tecnológicos que nos asisten en la operación del sitio actúan como encargados y están obligados a mantener la confidencialidad de tu información.',
    ],
  },
  {
    title: '5. Medios para ejercer tus derechos ARCO',
    body: [
      'Tienes derecho a Acceder, Rectificar y Cancelar tus datos personales, así como a Oponerte a su tratamiento o revocar el consentimiento otorgado (derechos ARCO). Para ejercerlos, envía tu solicitud al correo ' + SITE.email + ' indicando tu nombre, el derecho que deseas ejercer y los datos involucrados. Daremos respuesta en los plazos que marca la ley.',
    ],
  },
  {
    title: '6. Uso de cookies y tecnologías de rastreo',
    body: [
      'Este sitio utiliza cookies y tecnologías similares para mejorar tu experiencia de navegación y obtener estadísticas de uso de forma agregada. Puedes deshabilitar las cookies desde la configuración de tu navegador; ten en cuenta que algunas funciones del sitio podrían verse afectadas.',
    ],
  },
  {
    title: '7. Cambios al Aviso de Privacidad',
    body: [
      'Este Aviso de Privacidad puede ser modificado para atender novedades legislativas, políticas internas o nuevos requerimientos. Cualquier cambio será publicado en esta misma página, por lo que te recomendamos revisarla periódicamente.',
    ],
  },
]

export default function PrivacidadPage() {
  return (
    <main className="page-dark-gradient">
      <section className="relative mx-auto max-w-3xl px-5 sm:px-6 pt-32 pb-24">

        <span className="section-badge badge-blue" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          Legal
        </span>

        <h1 className="section-h2" style={{ color: '#ffffff', marginBottom: '0.75rem' }}>
          Aviso de Privacidad
        </h1>
        <p className="section-sub" style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2.5rem' }}>
          Última actualización: 21 de mayo de 2026 · Conforme a la LFPDPPP.
        </p>

        <div className="flex flex-col gap-9">
          {SECTIONS.map((s) => (
            <article key={s.title}>
              <h2 className="text-white font-semibold text-lg mb-3 font-grotesk">
                {s.title}
              </h2>
              {s.body?.map((p, i) => (
                <p key={i} className="text-white/60 leading-relaxed text-[0.95rem] mb-3">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="flex flex-col gap-2 mb-3 mt-1">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-2.5 text-white/60 leading-relaxed text-[0.95rem]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0d5c91]" />
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.after?.map((p, i) => (
                <p key={i} className="text-white/60 leading-relaxed text-[0.95rem] mb-3">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-white font-semibold mb-1">¿Dudas sobre el tratamiento de tus datos?</p>
          <p className="text-white/55 text-[0.95rem] mb-4">
            Escríbenos a{' '}
            <a href={`mailto:${SITE.email}`} className="text-[#2b8fd4] hover:underline">
              {SITE.email}
            </a>{' '}
            y con gusto te atendemos.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-xl bg-telos-green px-5 py-3 text-sm font-bold text-black transition-all duration-200 hover:bg-telos-green-light"
          >
            Ir a Contacto
          </Link>
        </div>

      </section>
    </main>
  )
}
