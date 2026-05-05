import UstedesHero from '@/components/sections/ustedes/UstedesHero'
import ElectricidadCases from '@/components/sections/ustedes/ElectricidadCases'
import AguaCases from '@/components/sections/ustedes/AguaCases'
import GasCases from '@/components/sections/ustedes/GasCases'
import UstedesCTA from '@/components/sections/ustedes/UstedesCTA'

export const metadata = {
  title: 'Ustedes | Casos reales de ahorro energético',
  description:
    'Proyectos reales de eficiencia energética sin nombres, con números. Agua, gas y electricidad optimizados en empresas, hoteles, centros deportivos e industrias a lo largo del país.',
}

export default function UstedesPage() {
  return (
    <>
      <UstedesHero />
      <ElectricidadCases />
      <AguaCases />
      <GasCases />
      <UstedesCTA />
    </>
  )
}
