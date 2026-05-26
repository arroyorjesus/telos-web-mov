import ContactoHero from '@/components/sections/contacto/ContactoHero'
import ContactFormSection from '@/components/sections/contacto/ContactFormSection'
import ContactoDirecto from '@/components/sections/contacto/ContactoDirecto'
import FAQSection from '@/components/sections/contacto/FAQSection'
import ContactoCTA from '@/components/sections/contacto/ContactoCTA'
import JsonLd from '@/components/ui/JsonLd'
import { buildMetadata, buildBreadcrumbSchema, buildFAQSchema } from '@/lib/seo'
import { FAQS } from '@/data/faqs'

export const metadata = buildMetadata({
  title: 'Solicita tu diagnóstico energético gratuito',
  description:
    'Agenda una conversación con TELOS para identificar oportunidades de ahorro en electricidad, gas y agua. Diagnóstico inicial para hoteles e industrias.',
  path: '/contacto',
})

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={buildFAQSchema(FAQS)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', path: '' },
          { name: 'Contacto', path: '/contacto' },
        ])}
      />
      <ContactoHero />
      <ContactFormSection />
      <ContactoDirecto />
      <FAQSection />
      <ContactoCTA />
    </>
  )
}
