import { SITE } from '@/data/site'

/** Imagen Open Graph compartida — ruta dinámica app/opengraph-image.jsx. */
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'TELOS — Eficiencia energética integral para empresas en México',
}

/**
 * buildMetadata — generador único de metadata por página.
 *
 * • title se devuelve como { absolute } para evitar que el template
 *   '%s | TELOS' del layout lo duplique.
 * • openGraph.images se declara explícitamente: la convención de archivo
 *   no cascadea a rutas anidadas, así que se referencia /opengraph-image
 *   (resuelto a absoluto por metadataBase del layout).
 * • alternates.canonical se resuelve contra metadataBase del layout.
 */
export function buildMetadata({
  title,
  description,
  path = '',
  noIndex = false,
} = {}) {
  const fullTitle = title
    ? `${title} | TELOS`
    : 'TELOS | Eficiencia energética integral para empresas en México'
  const desc = description || SITE.description
  const url = `${SITE.url}${path}`

  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: 'TELOS',
      locale: 'es_MX',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [OG_IMAGE.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  }
}

/**
 * SCHEMA_BUSINESS — entidad única del negocio.
 * ProfessionalService hereda de LocalBusiness → de Organization,
 * así una sola entidad cubre knowledge panel + local pack sin duplicar.
 */
export const SCHEMA_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE.url}/#business`,
  name: 'TELOS',
  legalName: SITE.legalName,
  description:
    'Empresa mexicana de eficiencia energética integral en agua, gas térmico y electricidad. Diagnóstico técnico, ejecución llave en mano y resultados medibles.',
  url: SITE.url,
  logo: `${SITE.url}/logo-azul.png`,
  image: `${SITE.url}/opengraph-image`,
  email: SITE.email,
  telephone: SITE.phoneRaw,
  foundingDate: '2017',
  priceRange: '$$$',
  currenciesAccepted: 'MXN',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vosgos 230-B, Lomas de Chapultepec',
    addressLocality: 'Miguel Hidalgo',
    addressRegion: 'Ciudad de México',
    postalCode: '11000',
    addressCountry: 'MX',
  },
  areaServed: {
    '@type': 'Country',
    name: 'México',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.phoneRaw,
    contactType: 'sales',
    areaServed: 'MX',
    availableLanguage: ['Spanish'],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '14:00',
    },
  ],
  sameAs: [SITE.social?.linkedin, SITE.social?.instagram].filter(Boolean),
}

/** Compatibilidad: alias del schema de negocio. */
export const SCHEMA_ORGANIZATION = SCHEMA_BUSINESS

/** BreadcrumbList — migas de pan para páginas internas. */
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  }
}

/** FAQPage — preguntas frecuentes. */
export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
