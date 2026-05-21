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
  title: 'Ellos — Comparativa del mercado energético',
  description:
    'El mercado tiene muchas opciones. Pocas resuelven el problema completo. Compara a TELOS con proveedores de solar, equipo y plataformas digitales antes de decidir.',
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
