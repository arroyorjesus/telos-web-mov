import ContactoHero from '@/components/sections/contacto/ContactoHero'
import ContactFormSection from '@/components/sections/contacto/ContactFormSection'
import ContactoDirecto from '@/components/sections/contacto/ContactoDirecto'
import FAQSection from '@/components/sections/contacto/FAQSection'
import ContactoCTA from '@/components/sections/contacto/ContactoCTA'
import { buildFAQSchema } from '@/lib/seo'
import { FAQS } from '@/data/faqs'

export const metadata = {
  title: 'Solicita diagnóstico energético gratuito',
  description:
    'Hablemos sobre tu potencial de ahorro. Sin compromiso, sin presión. Solo una conversación sobre cómo reducir tus costos de electricidad, gas y agua.',
}

export default function ContactoPage() {
  const faqSchema = buildFAQSchema(FAQS)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ContactoHero />
      <ContactFormSection />
      <ContactoDirecto />
      <FAQSection />
      <ContactoCTA />
    </>
  )
}
