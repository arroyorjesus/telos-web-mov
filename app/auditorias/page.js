import { listAuditorias } from '@/lib/db'
import AuditoriasClient from './AuditoriasClient'

export const metadata = {
  title: 'Auditorías',
  robots: { index: false, follow: false },
}

// Siempre dinámico: la lista cambia con cada cuestionario recibido.
export const dynamic = 'force-dynamic'

export default async function AuditoriasPage() {
  const { data, error } = await listAuditorias()

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-auto">
      <AuditoriasClient initial={data || []} error={error ? error.message || 'Error al cargar' : null} />
    </div>
  )
}
