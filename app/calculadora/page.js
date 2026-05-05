import Link from 'next/link'

export const metadata = {
  title: 'Calculadora de ahorro energético',
  description: 'Estima tu ahorro potencial en electricidad, gas y agua. Calculadora en desarrollo — solicita tu diagnóstico gratuito mientras tanto.',
  robots: { index: false, follow: false },
}

export default function CalculadoraPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 pt-24 pb-16">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 rounded-2xl bg-telos-green/10 border border-telos-green/20 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-telos-green">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>

        <span className="badge-green px-3 py-1.5 rounded-full text-xs font-medium mb-4 inline-block">
          Fase 2 · En desarrollo
        </span>

        <h1 className="text-3xl font-bold text-white mb-4 text-balance">
          Calculadora de ahorro energético
        </h1>
        <p className="text-gray-muted leading-relaxed mb-8">
          Estamos construyendo una calculadora que te permita estimar tu ahorro potencial en electricidad, gas y agua con unos pocos datos de tu operación.
        </p>
        <p className="text-gray-muted leading-relaxed mb-8">
          Mientras tanto, el diagnóstico gratuito te da los números reales de tu operación específica.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all shadow-green-glow"
          >
            Solicitar diagnóstico gratuito
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white font-medium text-sm hover:bg-white/[0.1] transition-all"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
