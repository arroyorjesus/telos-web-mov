import Link from 'next/link'

export const metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 pt-24">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <p className="text-[8rem] font-black text-black-card leading-none select-none">404</p>
          <p className="absolute inset-0 flex items-center justify-center text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent leading-none select-none">
            404
          </p>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Página no encontrada</h1>
        <p className="text-gray-muted mb-8 leading-relaxed">
          La página que buscas no existe o fue movida. Navega de regreso o contáctanos directamente.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all"
          >
            ← Ir al inicio
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.1] transition-all"
          >
            Ir a Contacto
          </Link>
        </div>
      </div>
    </div>
  )
}
