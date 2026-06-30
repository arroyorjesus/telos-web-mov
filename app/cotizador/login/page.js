'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/cotizador'
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/cotizador-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, next }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Contraseña incorrecta')
        setLoading(false)
        return
      }
      router.replace(data.next || next)
    } catch {
      setError('Error de conexión')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white/[0.04] border border-white/[0.1] rounded-2xl p-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-telos-green/10 border border-telos-green/20 flex items-center justify-center mx-auto mb-6">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-telos-green">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-white text-center mb-1">Cotizador TELOS</h1>
        <p className="text-gray-muted text-sm text-center mb-6">Acceso restringido</p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.12] text-white placeholder:text-gray-muted focus:outline-none focus:border-telos-green/60 transition-colors"
        />

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full mt-5 px-6 py-3 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all disabled:opacity-50"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default function CotizadorLoginPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 z-[100] bg-black" />}>
      <LoginForm />
    </Suspense>
  )
}
