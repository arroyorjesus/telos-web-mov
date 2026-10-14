'use client'

import { useMemo, useState } from 'react'

const money = (n) =>
  n == null
    ? '—'
    : new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 0,
      }).format(n)

const num = (n, d = 0) =>
  n == null
    ? '—'
    : new Intl.NumberFormat('es-MX', { maximumFractionDigits: d }).format(n)

const fecha = (iso) => {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return '—'
  }
}

const SEG_LABEL = {
  residencial: 'Residencial',
  comercial: 'Comercial',
  industrial: 'Industrial',
}

export default function CotizacionesClient({ initial, error }) {
  const [items, setItems] = useState(initial)
  const [deletingId, setDeletingId] = useState(null)
  const [notice, setNotice] = useState(null) // { type: 'ok' | 'error', text }
  const [q, setQ] = useState('')
  const [seg, setSeg] = useState('')
  const [ciudad, setCiudad] = useState('')

  const ciudades = useMemo(
    () => [...new Set(items.map((c) => c.ciudad).filter(Boolean))].sort(),
    [items]
  )

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase()
    return items.filter((c) => {
      if (seg && c.segmento !== seg) return false
      if (ciudad && c.ciudad !== ciudad) return false
      if (term) {
        const hay = `${c.cliente || ''} ${c.proyecto || ''} ${c.atencion || ''}`.toLowerCase()
        if (!hay.includes(term)) return false
      }
      return true
    })
  }, [items, q, seg, ciudad])

  async function eliminar(c) {
    const nombre = [c.cliente, c.proyecto].filter(Boolean).join(' — ') || 'esta cotización'
    const ok = window.confirm(
      `¿Eliminar "${nombre}" (${fecha(c.created_at)})?\n\nEsta acción no se puede deshacer.`
    )
    if (!ok) return

    setDeletingId(c.id)
    setNotice(null)
    try {
      const res = await fetch(`/api/cotizaciones/${encodeURIComponent(c.id)}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (res.status === 404) {
        // Ya no existe en el servidor: la quitamos de la lista igualmente.
        setItems((prev) => prev.filter((x) => x.id !== c.id))
        setNotice({ type: 'ok', text: 'Esa cotización ya no existía; se quitó de la lista.' })
        return
      }
      if (!res.ok) throw new Error(data.error || 'No se pudo eliminar.')
      setItems((prev) => prev.filter((x) => x.id !== c.id))
      setNotice({ type: 'ok', text: `Cotización "${nombre}" eliminada.` })
    } catch (e) {
      setNotice({ type: 'error', text: e.message })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl font-bold text-white">Cotizaciones</h1>
          <p className="text-gray-muted text-sm">
            {rows.length} de {items.length} cotización{items.length === 1 ? '' : 'es'}
          </p>
        </div>
        <a
          href="/cotizador"
          className="px-4 py-2.5 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all"
        >
          + Nueva cotización
        </a>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar cliente o proyecto…"
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white placeholder:text-gray-muted text-sm focus:outline-none focus:border-telos-green/60"
        />
        <select
          value={seg}
          onChange={(e) => setSeg(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white text-sm focus:outline-none focus:border-telos-green/60"
        >
          <option value="">Todos los segmentos</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
          <option value="industrial">Industrial</option>
        </select>
        <select
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white text-sm focus:outline-none focus:border-telos-green/60 max-w-[220px]"
        >
          <option value="">Todas las ciudades</option>
          {ciudades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {notice && (
        <div
          role="status"
          className={`mb-4 p-3 rounded-xl border text-sm ${
            notice.type === 'ok'
              ? 'bg-green-500/10 border-green-500/20 text-green-300'
              : 'bg-red-500/10 border-red-500/20 text-red-300'
          }`}
        >
          {notice.text}
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Tabla */}
      {rows.length === 0 ? (
        <div className="text-center py-20 text-gray-muted">
          {items.length === 0
            ? 'Aún no hay cotizaciones guardadas. Crea una desde el cotizador.'
            : 'Ninguna cotización coincide con los filtros.'}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-muted bg-white/[0.03]">
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Cliente</th>
                <th className="px-4 py-3 font-medium">Proyecto</th>
                <th className="px-4 py-3 font-medium">Segmento</th>
                <th className="px-4 py-3 font-medium">Ciudad</th>
                <th className="px-4 py-3 font-medium text-right">kWp</th>
                <th className="px-4 py-3 font-medium text-right">Paneles</th>
                <th className="px-4 py-3 font-medium text-right">Inversión</th>
                <th className="px-4 py-3 font-medium text-right">ROI</th>
                <th className="px-4 py-3 font-medium text-right">Ahorro/año</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-white/[0.06] hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-4 py-3 text-gray-muted whitespace-nowrap">{fecha(c.created_at)}</td>
                  <td className="px-4 py-3 text-white font-medium">{c.cliente || '—'}</td>
                  <td className="px-4 py-3 text-gray-300">{c.proyecto || '—'}</td>
                  <td className="px-4 py-3 text-gray-300">{SEG_LABEL[c.segmento] || c.segmento || '—'}</td>
                  <td className="px-4 py-3 text-gray-300">{c.ciudad || '—'}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{num(c.kwp, 1)}</td>
                  <td className="px-4 py-3 text-right text-gray-300">{num(c.paneles)}</td>
                  <td className="px-4 py-3 text-right text-gray-300 whitespace-nowrap">{money(c.inversion)}</td>
                  <td className="px-4 py-3 text-right text-gray-300 whitespace-nowrap">
                    {c.roi != null ? `${num(c.roi, 1)} años` : '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-telos-green whitespace-nowrap">{money(c.ahorro_anual)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/cotizador?id=${c.id}`}
                        className="px-3 py-1.5 rounded-lg bg-telos-blue/15 border border-telos-blue/30 text-telos-blue text-xs font-bold hover:bg-telos-blue/25 transition-colors whitespace-nowrap"
                      >
                        Reabrir
                      </a>
                      <button
                        type="button"
                        onClick={() => eliminar(c)}
                        disabled={deletingId === c.id}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold hover:bg-red-500/20 transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === c.id ? 'Eliminando…' : 'Eliminar'}
                      </button>
                    </div>
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
