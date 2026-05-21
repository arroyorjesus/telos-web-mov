import NosotrosHero from '@/components/sections/nosotros/NosotrosHero'
import QuienesSomos from '@/components/sections/nosotros/QuienesSomos'
import SolucionesInteractivas from '@/components/sections/nosotros/SolucionesInteractivas'
import Certificaciones from '@/components/sections/nosotros/Certificaciones'
import CompromisoTelos from '@/components/sections/nosotros/CompromisoTelos'
import NosotrosCTA from '@/components/sections/nosotros/NosotrosCTA'
import JsonLd from '@/components/ui/JsonLd'
import { buildMetadata, buildBreadcrumbSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Nosotros — Ingeniería de capital energético',
  description:
    'Firma de ingeniería estratégica desde 2017. Transformamos el gasto energético ineficiente en utilidad neta. No vendemos equipos — desarrollamos activos que se pagan solos. Agua, gas y electricidad.',
  path: '/nosotros',
})

export default function NosotrosPage() {
  return (
    <div className="page-dark-gradient">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', path: '' },
          { name: 'Nosotros', path: '/nosotros' },
        ])}
      />
      <NosotrosHero />
      <QuienesSomos />
      <SolucionesInteractivas />
      <Certificaciones />
      <CompromisoTelos />
      <NosotrosCTA />
    </div>
  )
}
