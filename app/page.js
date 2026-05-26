import HeroSection from '@/components/sections/home/HeroSection'
import ProblemSection from '@/components/sections/home/ProblemSection'
import DatosSection from '@/components/sections/home/DatosSection'
import SolucionesSection from '@/components/sections/home/SolucionesSection'
import ImpactoAmbientalHome from '@/components/sections/home/ImpactoAmbientalHome'
import HowWeWorkSection from '@/components/sections/home/HowWeWorkSection'
import ResultsSection from '@/components/sections/home/ResultsSection'
import HomeCTA from '@/components/sections/home/HomeCTA'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Ahorro Energético y Resiliencia Operativa en México',
  description:
    'Eficiencia energética para reducir OPEX y ahorrar en electricidad, gas y agua. Soluciones para hoteles, industrias, corporativos y casas con ROI menor a 36 meses.',
  path: '',
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="gradient-zone">
        <ProblemSection />
        <DatosSection />
        <SolucionesSection />
        <ImpactoAmbientalHome />
        <HowWeWorkSection />
        <ResultsSection />
      </div>
      <HomeCTA />
    </>
  )
}
