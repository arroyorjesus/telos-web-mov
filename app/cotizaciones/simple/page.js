import SimpleQuoteClient from './SimpleQuoteClient'
import { SITE } from '@/data/site'

export const metadata = {
  title: 'Cotización simple',
  robots: { index: false, follow: false },
}

// Siempre dinámico: depende de ?id= y de la sesión del cotizador.
export const dynamic = 'force-dynamic'

export default function CotizacionSimplePage({ searchParams }) {
  const id = typeof searchParams?.id === 'string' ? searchParams.id : null

  // Datos del emisor por defecto (editables dentro de la pantalla).
  const emisor = {
    nombre: SITE.legalName,
    direccion: SITE.address.replace(/, (?=Miguel Hidalgo)/, '\n'),
    email: SITE.email,
    telefono: SITE.phone,
    rfc: '',
  }

  return (
    <div className="simple-overlay fixed inset-0 z-[100] bg-[#0b0d10] overflow-auto">
      <SimpleQuoteClient id={id} emisorDefault={emisor} />
    </div>
  )
}
