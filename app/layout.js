import './globals.css'
import { Space_Grotesk, Outfit, JetBrains_Mono } from 'next/font/google'
import { SITE } from '@/data/site'
import { SCHEMA_BUSINESS, OG_IMAGE } from '@/lib/seo'
import JsonLd from '@/components/ui/JsonLd'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GlossaryPanel from '@/components/ui/GlossaryPanel'
import RevealObserver from '@/components/ui/RevealObserver'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'TELOS | Eficiencia energética para empresas en México',
    template: '%s | TELOS',
  },
  description:
    'Diseñamos e implementamos proyectos de eficiencia energética en electricidad, gas térmico y agua para hoteles, industrias y empresas con alto consumo. Diagnóstico técnico gratuito.',
  alternates: { canonical: SITE.url },
  keywords: [
    'eficiencia energética',
    'ahorro energético empresas',
    'paneles solares industriales',
    'calderas de condensación',
    'tratamiento de agua industrial',
    'fotovoltaico México',
    'ROI energético',
    'ahorro en CFE',
  ],
  authors: [{ name: 'TELOS', url: SITE.url }],
  creator: 'TELOS',
  publisher: 'TELOS',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE.url,
    siteName: 'TELOS',
    title: 'TELOS | Eficiencia energética integral para empresas en México',
    description:
      'Eficiencia energética en agua, gas y electricidad para hoteles, industrias y corporativos. Diagnóstico gratuito.',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TELOS | Eficiencia energética integral',
    description:
      'Eficiencia energética en agua, gas y electricidad para empresas en México.',
    images: [OG_IMAGE.url],
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
}

export default function RootLayout({ children }) {
  return (
    <html lang="es-MX" className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable}`}>
      <head>
        <JsonLd data={SCHEMA_BUSINESS} />
      </head>
      <body>
        <RevealObserver />
        <Navbar />
        <main id="contenido-principal">{children}</main>
        <Footer />
        <GlossaryPanel />
      </body>
    </html>
  )
}
