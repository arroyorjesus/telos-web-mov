import { SITE } from '@/data/site'

export default function sitemap() {
  const base = SITE.url
  const now = new Date().toISOString()

  const pages = [
    { url: `${base}/`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${base}/nosotros`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${base}/ustedes`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/ellos`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${base}/contacto`, priority: 0.9, changeFrequency: 'monthly' },
  ]

  return pages.map((page) => ({
    ...page,
    lastModified: now,
  }))
}
