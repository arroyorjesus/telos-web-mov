import EllosHero from '@/components/sections/ellos/EllosHero'
import PanoramaMercado from '@/components/sections/ellos/PanoramaMercado'
import TablaComparativa from '@/components/sections/ellos/TablaComparativa'
import BeneficiosIntegral from '@/components/sections/ellos/BeneficiosIntegral'
import EscenariosReales from '@/components/sections/ellos/EscenariosReales'
import TecnologiaInternacional from '@/components/sections/ellos/TecnologiaInternacional'
import EllosCTA from '@/components/sections/ellos/EllosCTA'
import JsonLd from '@/components/ui/JsonLd'
import { buildMetadata, buildBreadcrumbSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Comparativa de Proveedores Energéticos en México',
  description:
    'Proveedores que resuelven agua, gas y electricidad con ahorro real. Financiamiento y arrendamiento disponibles. Ingeniería integral certificada NOM/ANCE vs proveedores de una sola vertical.',
  path: '/ellos',
})

export default function EllosPage() {
  return (
    <div className="page-dark-gradient">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', path: '' },
          { name: 'Ellos', path: '/ellos' },
        ])}
      />
      <EllosHero />
      <PanoramaMercado />
      <TablaComparativa />
      <BeneficiosIntegral />
      <EscenariosReales />
      <TecnologiaInternacional />
      <EllosCTA />
    </div>
  )
}
