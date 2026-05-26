import NosotrosHero from '@/components/sections/nosotros/NosotrosHero'
import QuienesSomos from '@/components/sections/nosotros/QuienesSomos'
import SolucionesInteractivas from '@/components/sections/nosotros/SolucionesInteractivas'
import Certificaciones from '@/components/sections/nosotros/Certificaciones'
import CompromisoTelos from '@/components/sections/nosotros/CompromisoTelos'
import NosotrosCTA from '@/components/sections/nosotros/NosotrosCTA'
import JsonLd from '@/components/ui/JsonLd'
import { buildMetadata, buildBreadcrumbSchema } from '@/lib/seo'

const SCHEMA_NOSOTROS = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://telos.com.mx/#business',
  name: 'TELOS Ingeniería Energética',
  foundingDate: '2017',
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 50, maxValue: 100 },
  knowsAbout: [
    'Energía solar fotovoltaica industrial en México',
    'Almacenamiento de energía BESS para industria',
    'Calderas de condensación para hoteles e industria',
    'Tratamiento y reutilización de agua industrial',
    'Variadores de frecuencia VFD eficiencia eléctrica',
    'Compensación reactiva factor de potencia',
    'Infraestructura energética para plantas de nearshoring en México',
    'Reducción de OPEX en electricidad gas y agua',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certificación',
      name: 'NOM-001-SEDE Instalaciones eléctricas',
      description: 'Cumplimiento de Norma Oficial Mexicana para instalaciones eléctricas industriales y comerciales',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certificación',
      name: 'ANCE Certificación de equipo eléctrico',
      description: 'Certificación de equipo eléctrico bajo estándares ANCE',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Normativa',
      name: 'STPS Seguridad en trabajos en alturas y espacios confinados',
      description: 'Cumplimiento de normativa STPS para operaciones en altura y espacios confinados',
    },
  ],
  slogan: 'Desarrollamos activos energéticos. No vendemos equipos.',
  areaServed: [
    { '@type': 'State', name: 'Ciudad de México', containedInPlace: { '@type': 'Country', name: 'México' } },
    { '@type': 'State', name: 'Puebla', containedInPlace: { '@type': 'Country', name: 'México' } },
    { '@type': 'State', name: 'Estado de México', containedInPlace: { '@type': 'Country', name: 'México' } },
    { '@type': 'State', name: 'Nuevo León', containedInPlace: { '@type': 'Country', name: 'México' } },
    { '@type': 'State', name: 'Jalisco', containedInPlace: { '@type': 'Country', name: 'México' } },
    { '@type': 'State', name: 'Baja California Sur', containedInPlace: { '@type': 'Country', name: 'México' } },
    { '@type': 'State', name: 'Quintana Roo', containedInPlace: { '@type': 'Country', name: 'México' } },
  ],
}

export const metadata = buildMetadata({
  title: 'Empresa de Ingeniería Energética Certificada',
  description:
    'Firma de ingeniería energética con +9 años en México. Cuadrillas certificadas NOM/ANCE/STPS y proyectos en agua, gas y electricidad con cobertura nacional.',
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
      <JsonLd data={SCHEMA_NOSOTROS} />
      <NosotrosHero />
      <QuienesSomos />
      <SolucionesInteractivas />
      <Certificaciones />
      <CompromisoTelos />
      <NosotrosCTA />
    </div>
  )
}
