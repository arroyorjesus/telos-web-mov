'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

const fecha = (iso) => {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return '—'
  }
}

const ESTADO_LABEL = {
  nuevo: 'Nuevo',
  en_revision: 'En revisión',
  proyeccion_lista: 'Proyección lista',
  cerrado: 'Cerrado',
}

const ESTADO_COLOR = {
  nuevo: 'bg-telos-blue/15 border-telos-blue/30 text-telos-blue',
  en_revision: 'bg-telos-gold/15 border-telos-gold/30 text-telos-gold',
  proyeccion_lista: 'bg-telos-green/15 border-telos-green/30 text-telos-green',
  cerrado: 'bg-white/[0.08] border-white/[0.15] text-gray-muted',
}

export default function AuditoriasClient({ initial, error }) {
  const [q, setQ] = useState('')
  const [sector, setSector] = useState('')

  const sectores = useMemo(
    () => [...new Set(initial.map((a) => a.tipo_propiedad).filter(Boolean))].sort(),
    [initial]
  )

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase()
    return initial.filter((a) => {
      if (sector && a.tipo_propiedad !== sector) return false
      if (term) {
        const hay = `${a.empresa || ''} ${a.contacto || ''} ${a.correo || ''}`.toLowerCase()
        if (!hay.includes(term)) return false
      }
      return true
    })
  }, [initial, q, sector])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Auditorías</h1>
          <p className="text-gray-muted text-sm">
            {rows.length} de {initial.length} cuestionario{initial.length === 1 ? '' : 's'} recibido
            {initial.length === 1 ? '' : 's'}
          </p>
        </div>
        <Link
          href="/diagnostico"
          target="_blank"
          className="px-4 py-2.5 rounded-xl bg-telos-blue text-black font-bold text-sm hover:bg-telos-blue-light transition-all"
        >
          Ver formulario público ↗
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar empresa, contacto o correo…"
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white placeholder:text-gray-muted text-sm focus:outline-none focus:border-telos-blue/60"
        />
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white text-sm focus:outline-none focus:border-telos-blue/60 max-w-[280px]"
        >
          <option value="">Todos los sectores</option>
          {sectores.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">{error}</div>
      )}

      {rows.length === 0 ? (
        <div className="text-center py-20 text-gray-muted">
          {initial.length === 0
            ? 'Aún no hay cuestionarios recibidos. Comparte el link de /diagnostico con tus clientes.'
            : 'Ningún cuestionario coincide con los filtros.'}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-muted bg-white/[0.03]">
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Empresa</th>
                <th className="px-4 py-3 font-medium">Contacto</th>
                <th className="px-4 py-3 font-medium">Sector</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-t border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                  <td className="px-4 py-3 text-gray-muted whitespace-nowrap">{fecha(a.created_at)}</td>
                  <td className="px-4 py-3 text-white font-medium">{a.empresa || '—'}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {a.contacto || '—'}
                    <br />
                    <span className="text-xs text-gray-muted">{a.correo}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{a.tipo_propiedad || '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full border text-xs font-bold whitespace-nowrap ${
                        ESTADO_COLOR[a.estado] || ESTADO_COLOR.nuevo
                      }`}
                    >
                      {ESTADO_LABEL[a.estado] || a.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/auditorias/${a.id}`}
                      className="px-3 py-1.5 rounded-lg bg-telos-blue/15 border border-telos-blue/30 text-telos-blue text-xs font-bold hover:bg-telos-blue/25 transition-colors whitespace-nowrap"
                    >
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
