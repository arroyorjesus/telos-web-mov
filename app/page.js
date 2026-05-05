import HeroSection from '@/components/sections/home/HeroSection'
import ForWhomSection from '@/components/sections/home/ForWhomSection'
import ProblemSection from '@/components/sections/home/ProblemSection'
import SolucionesSection from '@/components/sections/home/SolucionesSection'
import HowWeWorkSection from '@/components/sections/home/HowWeWorkSection'
import CalculatorTeaser from '@/components/sections/home/CalculatorTeaser'
import HomeCTA from '@/components/sections/home/HomeCTA'

export const metadata = {
  title: 'TELOS | Eficiencia energética integral para empresas en México',
  description:
    'Diseñamos e implementamos proyectos de eficiencia energética en electricidad, gas térmico y agua para hoteles, industrias y empresas con alto consumo. Diagnóstico técnico gratuito y resultados medibles desde el primer mes.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ForWhomSection />
      <ProblemSection />
      <SolucionesSection />
      <HowWeWorkSection />
      <CalculatorTeaser />
      <HomeCTA />
    </>
  )
}
