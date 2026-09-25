import { notFound } from 'next/navigation'
import { getAuditoria, getCotizacion, getSupabase } from '@/lib/db'
import AuditoriaDetailClient from './AuditoriaDetailClient'

export const metadata = {
  title: 'Auditoría',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

async function withSignedUrls(archivos) {
  if (!archivos?.length) return []
  const db = getSupabase()
  if (!db) return archivos.map((a) => ({ ...a, url: null }))
  return Promise.all(
    archivos.map(async (a) => {
      const { data } = await db.storage.from('auditorias').createSignedUrl(a.path, 60 * 60)
      return { ...a, url: data?.signedUrl || null }
    })
  )
}

export default async function AuditoriaDetailPage({ params }) {
  const { data: auditoria, error } = await getAuditoria(params.id)
  if (error || !auditoria) notFound()

  const archivos = await withSignedUrls(auditoria.archivos)

  let cotizacion = null
  if (auditoria.cotizacion_id) {
    const { data } = await getCotizacion(auditoria.cotizacion_id)
    cotizacion = data || null
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-auto">
      <AuditoriaDetailClient auditoria={{ ...auditoria, archivos }} cotizacion={cotizacion} />
    </div>
  )
}
