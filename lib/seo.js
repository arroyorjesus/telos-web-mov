import { SITE } from '@/data/site'

export const DEFAULT_OG = {
  title: 'TELOS | Eficiencia energética integral para empresas en México',
  description:
    'Diseñamos e implementamos proyectos de eficiencia energética en electricidad, gas térmico y agua para hoteles, industrias y empresas con alto consumo. Diagnóstico gratuito.',
  images: [{ url: `${SITE.url}/og-image.png`, width: 1200, height: 630 }],
}

export function buildMetadata({
  title,
  description,
  path = '',
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | TELOS`
    : 'TELOS | Eficiencia energética integral para empresas en México'
  const desc = description || DEFAULT_OG.description
  const url = `${SITE.url}${path}`

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: 'TELOS',
      locale: 'es_MX',
      type: 'website',
      images: DEFAULT_OG.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: DEFAULT_OG.images.map((i) => i.url),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export const SCHEMA_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TELOS',
  description:
    'Empresa mexicana de eficiencia energética integral en agua, gas térmico y electricidad.',
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  foundingDate: '2017',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pedregal 44, PH',
    addressLocality: 'Lomas de Chapultepec',
    addressRegion: 'CDMX',
    postalCode: '11000',
    addressCountry: 'MX',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Mexico',
  },
  sameAs: [SITE.social?.linkedin, SITE.social?.instagram].filter(Boolean),
}

export const SCHEMA_LOCAL_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TELOS Eficiencia Energética',
  description: SCHEMA_ORGANIZATION.description,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: SCHEMA_ORGANIZATION.address,
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
  priceRange: '$$$',
}

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
