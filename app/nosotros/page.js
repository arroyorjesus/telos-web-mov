import NosotrosHero from '@/components/sections/nosotros/NosotrosHero'
import QuienesSomos from '@/components/sections/nosotros/QuienesSomos'
import SolucionesInteractivas from '@/components/sections/nosotros/SolucionesInteractivas'
import ImpactoAmbiental from '@/components/sections/nosotros/ImpactoAmbiental'
import Certificaciones from '@/components/sections/nosotros/Certificaciones'
import ValoresSection from '@/components/sections/nosotros/ValoresSection'
import NosotrosCTA from '@/components/sections/nosotros/NosotrosCTA'

export const metadata = {
  title: 'Nosotros | Ingeniería energética integral en México',
  description:
    'Somos una firma especializada en el desarrollo e implementación de proyectos integrales de eficiencia energética. Con visión técnica, financiera y operativa de largo plazo. Desarrollamos activos energéticos. No vendemos equipos.',
}

export default function NosotrosPage() {
  return (
    <>
      <NosotrosHero />
      <QuienesSomos />
      <SolucionesInteractivas />
      <ImpactoAmbiental />
      <Certificaciones />
      <ValoresSection />
      <NosotrosCTA />
    </>
  )
}
