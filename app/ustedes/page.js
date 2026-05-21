import UstedesHero from '@/components/sections/ustedes/UstedesHero'
import ElectricidadCases from '@/components/sections/ustedes/ElectricidadCases'
import AguaCases from '@/components/sections/ustedes/AguaCases'
import GasCases from '@/components/sections/ustedes/GasCases'
import UstedesCTA from '@/components/sections/ustedes/UstedesCTA'
import JsonLd from '@/components/ui/JsonLd'
import { buildMetadata, buildBreadcrumbSchema } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Ustedes — Casos reales de ahorro energético',
  description:
    'Proyectos reales de eficiencia energética con números, sin nombres. Agua, gas y electricidad optimizados en hoteles, industrias y corporativos en todo México.',
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
