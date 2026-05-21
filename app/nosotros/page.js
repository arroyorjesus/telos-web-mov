import NosotrosHero from '@/components/sections/nosotros/NosotrosHero'
import QuienesSomos from '@/components/sections/nosotros/QuienesSomos'
import SolucionesInteractivas from '@/components/sections/nosotros/SolucionesInteractivas'
import Certificaciones from '@/components/sections/nosotros/Certificaciones'
import CompromisoTelos from '@/components/sections/nosotros/CompromisoTelos'
import NosotrosCTA from '@/components/sections/nosotros/NosotrosCTA'
import JsonLd from '@/components/ui/JsonLd'
import { buildMetadata, buildBreadcrumbSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Empresa de Ingeniería Energética Certificada',
  description:
    'Firma de ingeniería energética con +9 años en México. Cuadrillas propias certificadas NOM/ANCE/STPS. Activos en agua, gas y electricidad que se pagan solos. Cobertura nacional.',
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
