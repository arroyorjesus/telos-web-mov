import Link from 'next/link'
import { SITE } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Términos y Condiciones',
  description:
    'Términos y Condiciones de uso del sitio web de TELOS: alcance de la información, propiedad intelectual, solicitudes de diagnóstico y limitación de responsabilidad.',
  path: '/terminos',
})

const SECTIONS = [
  {
    title: '1. Aceptación de los términos',
    body: [
      `Al acceder y utilizar este sitio web, operado por ${SITE.legalName} ("TELOS"), aceptas estos Términos y Condiciones. Si no estás de acuerdo con ellos, te pedimos que no utilices el sitio.`,
    ],
  },
  {
    title: '2. Naturaleza informativa del sitio',
    body: [
      'El contenido de este sitio tiene carácter informativo y comercial. Describe de forma general los servicios de eficiencia energética que ofrece TELOS en electricidad, gas térmico y agua, y no constituye una oferta vinculante ni una propuesta técnica o económica.',
      'Cualquier proyecto, alcance, precio, plazo o condición se formaliza únicamente mediante una propuesta o contrato por escrito, firmado por TELOS y por el cliente.',
    ],
  },
  {
    title: '3. Estimaciones de ahorro y retorno de inversión',
    body: [
      'Las cifras de ahorro, retorno de inversión (ROI) y demás resultados que aparecen en el sitio, incluidos los generados por calculadoras o cuestionarios de diagnóstico, son estimaciones con fines orientativos. Dependen de las condiciones reales de cada instalación, de los consumos, de las tarifas vigentes y de otros factores externos.',
      'Dichas estimaciones no constituyen una garantía de resultados. Solo un diagnóstico técnico y una propuesta formal pueden establecer valores aplicables a un caso concreto.',
    ],
  },
  {
    title: '4. Solicitudes de contacto y diagnóstico',
    body: [
      'Al enviar el formulario de contacto, el cuestionario de diagnóstico o escribirnos por WhatsApp, correo o teléfono, te comprometes a proporcionar información veraz y actualizada. El envío de una solicitud no genera por sí mismo una relación contractual ni la obligación de TELOS de emitir una propuesta.',
      'El tratamiento de los datos personales que nos compartas se rige por nuestro Aviso de Privacidad.',
    ],
    link: { href: '/privacidad', label: 'Consultar el Aviso de Privacidad' },
  },
  {
    title: '5. Uso adecuado del sitio',
    body: ['Te comprometes a utilizar el sitio de manera lícita y a no:'],
    list: [
      'Intentar acceder sin autorización a áreas restringidas, sistemas o bases de datos de TELOS.',
      'Introducir código malicioso, o realizar acciones que afecten la disponibilidad o el rendimiento del sitio.',
      'Enviar de forma automatizada o masiva formularios, solicitudes o mensajes (spam).',
      'Suplantar la identidad de otra persona o proporcionar datos de terceros sin su consentimiento.',
    ],
  },
  {
    title: '6. Propiedad intelectual',
    body: [
      'Los textos, imágenes, logotipos, marcas, diseños, gráficos y demás contenidos del sitio son propiedad de TELOS o se utilizan con la debida autorización, y están protegidos por la legislación mexicana e internacional en materia de propiedad intelectual.',
      'Queda prohibida su reproducción, distribución, modificación o uso comercial sin autorización previa y por escrito de TELOS.',
    ],
  },
  {
    title: '7. Enlaces a terceros',
    body: [
      'El sitio puede contener enlaces a servicios o sitios de terceros (por ejemplo, WhatsApp). TELOS no controla ni es responsable de su contenido, disponibilidad o políticas de privacidad.',
    ],
  },
  {
    title: '8. Limitación de responsabilidad',
    body: [
      'TELOS procura que la información del sitio sea correcta y esté actualizada, pero no garantiza que esté libre de errores u omisiones, ni que el sitio funcione de manera ininterrumpida. En la medida permitida por la ley, TELOS no será responsable por daños derivados del uso del sitio o de decisiones tomadas con base exclusivamente en su contenido.',
    ],
  },
  {
    title: '9. Modificaciones',
    body: [
      'TELOS puede modificar estos Términos y Condiciones en cualquier momento. La versión vigente será la publicada en esta página, con su fecha de última actualización. El uso continuado del sitio implica la aceptación de los cambios.',
    ],
  },
  {
    title: '10. Legislación aplicable y jurisdicción',
    body: [
      'Estos Términos y Condiciones se rigen por las leyes de los Estados Unidos Mexicanos. Para su interpretación y cumplimiento, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles por razón de su domicilio presente o futuro.',
    ],
  },
]

export default function TerminosPage() {
  return (
    <main className="page-dark-gradient">
      <section className="relative mx-auto max-w-3xl px-5 sm:px-6 pt-32 pb-24">

        <span className="section-badge badge-blue" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          Legal
        </span>

        <h1 className="section-h2" style={{ color: '#ffffff', marginBottom: '0.75rem' }}>
          Términos y Condiciones
        </h1>
        <p className="section-sub" style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2.5rem' }}>
          Última actualización: 6 de octubre de 2026.
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
              {s.link && (
                <Link href={s.link.href} className="text-[#2b8fd4] hover:underline text-[0.95rem]">
                  {s.link.label}
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <p className="text-white font-semibold mb-1">¿Dudas sobre estos términos?</p>
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
