import Link from 'next/link'

export const metadata = {
  title: 'Cotizador solar',
  robots: { index: false, follow: false },
}

export default function CotizadorPage({ searchParams }) {
  const id = searchParams?.id
  const src = id ? `/cotizador/app.html?id=${encodeURIComponent(id)}` : '/cotizador/app.html'

  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <Link
        href="/cotizaciones"
        className="fixed top-3 right-3 z-[101] px-3.5 py-2 rounded-lg bg-black/80 text-white text-xs font-bold hover:bg-black transition-colors shadow-lg"
      >
        📋 Cotizaciones
      </Link>
      <iframe
        src={src}
        title="Cotizador solar TELOS"
        className="w-full h-full border-0"
      />
    </div>
  )
}
