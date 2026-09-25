'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/auditorias'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auditorias-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, next }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'No se pudo iniciar sesión')
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
        <div className="w-14 h-14 rounded-2xl bg-telos-blue/10 border border-telos-blue/20 flex items-center justify-center mx-auto mb-6">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-telos-blue">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-white text-center mb-1">Auditorías TELOS</h1>
        <p className="text-gray-muted text-sm text-center mb-6">Acceso de colaboradores</p>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.12] text-white placeholder:text-gray-muted focus:outline-none focus:border-telos-blue/60 transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.12] text-white placeholder:text-gray-muted focus:outline-none focus:border-telos-blue/60 transition-colors"
          />
        </div>

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full mt-5 px-6 py-3 rounded-xl bg-telos-blue text-black font-bold text-sm hover:bg-telos-blue-light transition-all disabled:opacity-50"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default function AuditoriasLoginPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 z-[100] bg-black" />}>
      <LoginForm />
    </Suspense>
  )
}
