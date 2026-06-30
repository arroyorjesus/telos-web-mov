import { listCotizaciones } from '@/lib/db'
import CotizacionesClient from './CotizacionesClient'

export const metadata = {
  title: 'CRM Cotizaciones',
  robots: { index: false, follow: false },
}

// Siempre dinámico: la lista cambia con cada cotización guardada.
export const dynamic = 'force-dynamic'

export default async function CotizacionesPage() {
  const { data, error } = await listCotizaciones()

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-auto">
      <CotizacionesClient
        initial={data || []}
        error={error ? error.message || 'Error al cargar' : null}
      />
    </div>
  )
}
