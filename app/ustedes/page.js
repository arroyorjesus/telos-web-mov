import UstedesHero from '@/components/sections/ustedes/UstedesHero'
import ElectricidadCases from '@/components/sections/ustedes/ElectricidadCases'
import AguaCases from '@/components/sections/ustedes/AguaCases'
import GasCases from '@/components/sections/ustedes/GasCases'
import UstedesCTA from '@/components/sections/ustedes/UstedesCTA'
import JsonLd from '@/components/ui/JsonLd'
import { buildMetadata, buildBreadcrumbSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Solar, BESS y Tratamiento de Agua: Casos Reales',
  description:
    'Proyectos en hoteles, industrias, corporativos y casas de alto consumo: solar, BESS, calderas y tratamiento de agua. TELOS, empresa confiable de ingeniería energética en México.',
  path: '/ustedes',
})

export default function UstedesPage() {
  return (
    <div className="page-dark-gradient">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Inicio', path: '' },
          { name: 'Ustedes', path: '/ustedes' },
        ])}
      />
      <UstedesHero />
      <ElectricidadCases />
      <AguaCases />
      <GasCases />
      <UstedesCTA />
    </div>
  )
}
