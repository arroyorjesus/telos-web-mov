import { SITE } from '@/data/site'

/**
 * Sitemap. lastModified usa fechas reales por página (no la fecha de build)
 * para que Google confíe en la señal lastmod.
 * /calculadora se omite a propósito: tiene noindex.
 */
export default function sitemap() {
  const base = SITE.url

  return [
    { url: base,                 lastModified: '2026-05-25', changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/ustedes`,    lastModified: '2026-05-25', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contacto`,   lastModified: '2026-05-25', changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/nosotros`,   lastModified: '2026-05-25', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/ellos`,      lastModified: '2026-05-25', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacidad`, lastModified: '2026-05-25', changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
