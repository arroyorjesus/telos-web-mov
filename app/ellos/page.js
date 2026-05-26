import EllosHero from '@/components/sections/ellos/EllosHero'
import PanoramaMercado from '@/components/sections/ellos/PanoramaMercado'
import TablaComparativa from '@/components/sections/ellos/TablaComparativa'
import BeneficiosIntegral from '@/components/sections/ellos/BeneficiosIntegral'
import EscenariosReales from '@/components/sections/ellos/EscenariosReales'
import TecnologiaInternacional from '@/components/sections/ellos/TecnologiaInternacional'
import FAQEllos from '@/components/sections/ellos/FAQEllos'
import EllosCTA from '@/components/sections/ellos/EllosCTA'
import JsonLd from '@/components/ui/JsonLd'
import { buildMetadata, buildBreadcrumbSchema, buildFAQSchema } from '@/lib/seo'

const FAQS_DATA = [
  { question: '¿Por qué sigue subiendo mi factura de CFE aunque ya tengo paneles solares?', answer: 'Los paneles solares reducen el consumo energético, pero no eliminan los cargos por demanda máxima ni las penalizaciones por factor de potencia. Para reducir la factura de CFE de forma integral se requiere también compensación reactiva, variadores de frecuencia (VFDs) y, en muchos casos, un sistema BESS que gestione la demanda en las horas pico. TELOS analiza los tres vectores — generación, consumo y demanda — para encontrar el verdadero origen del gasto.' },
  { question: '¿Cuánto tiempo tarda el retorno de inversión en un proyecto de eficiencia energética?', answer: 'En los proyectos que ejecuta TELOS el retorno de inversión (ROI) se garantiza por contrato en menos de 3 años. El plazo varía según el tipo de instalación: proyectos solares con BESS logran payback en 24–36 meses, modernización de calderas de condensación en 18–30 meses, y sistemas de tratamiento de agua entre 12 y 36 meses. El diagnóstico técnico gratuito determina el escenario exacto para tu operación.' },
  { question: '¿Qué diferencia hay entre TELOS y una empresa instaladora de paneles solares?', answer: 'Una empresa instaladora de paneles solares atiende únicamente el vector eléctrico. TELOS es una firma de ingeniería energética integral que resuelve electricidad (solar, BESS, VFDs), gas térmico (calderas de condensación, heat pumps, recuperadores de calor) y agua (ósmosis inversa, captación pluvial, tratamiento y reuso). Esto permite identificar dónde realmente se pierde dinero en la operación y ejecutar proyectos que ningún proveedor de una sola vertical puede ofrecer.' },
  { question: '¿TELOS trabaja con plantas de nearshoring y empresas internacionales en México?', answer: 'Sí. Empresas internacionales que establecen operaciones en México enfrentan infraestructura energética antigua y tarifas industriales complejas. TELOS diseña e implementa la infraestructura de agua, gas y electricidad con cumplimiento de normas NOM, ANCE y STPS. Operamos en todo México incluyendo los corredores industriales del Bajío, Monterrey, Guadalajara y Puebla.' },
  { question: '¿Puedo financiar o arrendar los equipos en lugar de comprarlos?', answer: 'Sí. TELOS ofrece esquemas de financiamiento y arrendamiento para que la inversión en infraestructura energética no comprometa el capital de trabajo. En la modalidad de arrendamiento, el ahorro generado por el sistema cubre la renta mensual desde el primer mes — en muchos casos con flujo de caja positivo desde el arranque.' },
  { question: '¿Qué normas y certificaciones cumple TELOS?', answer: 'TELOS opera bajo estricto cumplimiento de NOM-001-SEDE (instalaciones eléctricas), certificación ANCE (equipo eléctrico) y normativa STPS (seguridad en trabajos en alturas y espacios confinados). Cada instalación se entrega con documentación técnica completa, eliminando cualquier pasivo contingente por incumplimiento.' },
  { question: '¿En qué estados de México opera TELOS?', answer: 'TELOS tiene cobertura nacional. Hemos ejecutado proyectos en Ciudad de México, Puebla, Estado de México, Baja California Sur (Los Cabos), Jalisco, Quintana Roo, Nuevo León y más estados. Contamos con hasta 8 cuadrillas propias para ejecutar instalaciones simultáneas sin subcontratar.' },
]

export const metadata = buildMetadata({
  title: 'Comparativa de Proveedores Energéticos en México',
  description:
    'Compara proveedores tradicionales con TELOS: eficiencia energética en agua, gas y electricidad, certificaciones NOM/ANCE y opciones de financiamiento.',
  path: '/ellos',
})

export default function EllosPage() {
  return (
    <div className="page-dark-gradient">
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Inicio', path: '' },
        { name: 'Ellos', path: '/ellos' },
      ])} />
      <JsonLd data={buildFAQSchema(FAQS_DATA)} />
      <EllosHero />
      <PanoramaMercado />
      <TablaComparativa />
      <BeneficiosIntegral />
      <EscenariosReales />
      <TecnologiaInternacional />
      <FAQEllos />
      <EllosCTA />
    </div>
  )
}
