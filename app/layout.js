import { Inter, Exo_2 } from 'next/font/google'
import './globals.css'
import { SITE } from '@/data/site'
import { SCHEMA_ORGANIZATION } from '@/lib/seo'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  weight: ['700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'TELOS | Eficiencia energética integral para empresas en México',
    template: '%s | TELOS',
  },
  description:
    'Diseñamos e implementamos proyectos de eficiencia energética en electricidad, gas térmico y agua para hoteles, industrias y empresas con alto consumo. Diagnóstico técnico gratuito.',
  keywords: [
    'eficiencia energética',
    'ahorro energético',
    'paneles solares industriales',
    'calderas de condensación',
    'tratamiento de agua',
    'fotovoltaico México',
    'ROI energético',
    'ahorro en CFE',
  ],
  authors: [{ name: 'TELOS', url: SITE.url }],
  creator: 'TELOS',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE.url,
    siteName: 'TELOS',
    title: 'TELOS | Eficiencia energética integral para empresas en México',
    description:
      'Eficiencia energética en agua, gas y electricidad para hoteles, industrias y corporativos. Diagnóstico gratuito.',
    images: [
      {
        url: `${SITE.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'TELOS — Eficiencia energética integral',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TELOS | Eficiencia energética integral',
    description:
      'Eficiencia energética en agua, gas y electricidad para empresas en México.',
    images: [`${SITE.url}/og-image.png`],
  },
  robots: {
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${exo2.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SCHEMA_ORGANIZATION),
          }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
