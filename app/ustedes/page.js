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
    'Proyectos reales de eficiencia energética sin nombres, con números. Agua, gas y electricidad optimizados en empresas, hoteles, centros deportivos e industrias a lo largo del país.',
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
