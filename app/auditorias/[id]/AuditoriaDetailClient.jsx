'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SECTIONS } from '@/lib/diagnostico'

const money = (n) =>
  n == null
    ? '—'
    : new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n)

const fecha = (iso) => {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch {
    return '—'
  }
}

const ESTADOS = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'en_revision', label: 'En revisión' },
  { value: 'proyeccion_lista', label: 'Proyección lista' },
  { value: 'cerrado', label: 'Cerrado' },
]

// Estimado simple por % del gasto anualizado (mismo enfoque usado por Ontu 360).
const PCT_AHORRO_AGUA = 0.25
const PCT_AHORRO_GAS = 0.25

function formatValue(question, value) {
  if (Array.isArray(value)) return value.join(', ')
  return value
}

export default function AuditoriaDetailClient({ auditoria, cotizacion }) {
  const router = useRouter()
  const reportRef = useRef(null)
  const [estado, setEstado] = useState(auditoria.estado || 'nuevo')
  const [notas, setNotas] = useState(auditoria.notas || '')
  const [savingNotas, setSavingNotas] = useState(false)
  const [generando, setGenerando] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [canvasReady, setCanvasReady] = useState(false)
  const [msg, setMsg] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.html2canvas) {
      setCanvasReady(true)
      return
    }
    const script = document.createElement('script')
    script.src = '/cotizador/html2canvas.min.js'
    script.async = true
    script.onload = () => setCanvasReady(true)
    document.body.appendChild(script)
  }, [])

  const r = auditoria.respuestas || {}
  const gastoAgua = Number(r.gasto_agua) || 0
  const gastoGas = Number(r.gasto_gas) || 0
  const gastoLuz = Number(r.gasto_luz) || 0
  const ahorroAgua = gastoAgua > 0 ? gastoAgua * 12 * PCT_AHORRO_AGUA : null
  const ahorroGas = gastoGas > 0 ? gastoGas * 12 * PCT_AHORRO_GAS : null
  const ahorroLuz = cotizacion?.ahorro_anual ?? null

  async function updateEstado(nextEstado) {
    setEstado(nextEstado)
    await fetch(`/api/auditorias/${auditoria.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nextEstado }),
    })
    router.refresh()
  }

  async function guardarNotas() {
    setSavingNotas(true)
    try {
      const res = await fetch(`/api/auditorias/${auditoria.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notas }),
      })
      if (!res.ok) throw new Error('No se pudieron guardar las notas')
      setMsg({ type: 'ok', text: 'Notas guardadas.' })
    } catch (e) {
      setMsg({ type: 'error', text: e.message })
    } finally {
      setSavingNotas(false)
    }
  }

  async function generarProyeccion() {
    setGenerando(true)
    setMsg(null)
    try {
      const res = await fetch(`/api/auditorias/${auditoria.id}/generar-proyeccion`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'No se pudo generar la proyección')
      setEstado('proyeccion_lista')
      window.open(`/cotizador?id=${data.id}`, '_blank')
      router.refresh()
    } catch (e) {
      setMsg({ type: 'error', text: e.message })
    } finally {
      setGenerando(false)
    }
  }

  async function captureReport() {
    if (!window.html2canvas || !reportRef.current) return null
    return window.html2canvas(reportRef.current, {
      scale: 2,
      backgroundColor: '#0a0a0a',
      useCORS: true,
      logging: false,
      ignoreElements: (el) => el.classList?.contains('report-actions'),
    })
  }

  async function downloadReportPng() {
    setExporting(true)
    setMsg(null)
    try {
      const canvas = await captureReport()
      if (!canvas) throw new Error('No se pudo generar la imagen')
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = `TELOS-Reporte-${(auditoria.empresa || 'diagnostico').replace(/[^a-zA-Z0-9]+/g, '-')}.png`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (e) {
      setMsg({ type: 'error', text: e.message })
    } finally {
      setExporting(false)
    }
  }

  async function copyReportPng() {
    setExporting(true)
    setMsg(null)
    try {
      if (!navigator.clipboard || !window.ClipboardItem) {
        throw new Error('Tu navegador no permite copiar imágenes aquí. Usa el botón PNG para descargar.')
      }
      const canvas = await captureReport()
      if (!canvas) throw new Error('No se pudo generar la imagen')
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      setMsg({ type: 'ok', text: 'Imagen copiada al portapapeles.' })
    } catch (e) {
      setMsg({ type: 'error', text: e.message })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <Link href="/auditorias" className="text-gray-muted text-sm hover:text-white transition-colors">
            ← Auditorías
          </Link>
          <h1 className="text-2xl font-bold text-white mt-1">{auditoria.empresa || 'Sin nombre'}</h1>
          <p className="text-gray-muted text-sm">
            {auditoria.contacto} · {auditoria.correo} · {auditoria.telefono || 'sin teléfono'}
          </p>
          <p className="text-gray-muted text-xs mt-1">Recibido {fecha(auditoria.created_at)}</p>
        </div>
        <select
          value={estado}
          onChange={(e) => updateEstado(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white text-sm focus:outline-none focus:border-telos-blue/60"
        >
          {ESTADOS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reporte de ahorro estimado (exportable) */}
      <div ref={reportRef} className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <h2 className="text-white font-bold text-lg">Reporte de ahorro estimado</h2>
            <p className="text-gray-muted text-xs">
              {auditoria.empresa} · {fecha(auditoria.created_at)}
            </p>
          </div>
          <div className="report-actions flex gap-2">
            <button
              onClick={copyReportPng}
              disabled={!canvasReady || exporting}
              className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-white/[0.15] text-white text-xs font-bold hover:bg-white/[0.14] transition-colors disabled:opacity-40"
            >
              📋 Copiar
            </button>
            <button
              onClick={downloadReportPng}
              disabled={!canvasReady || exporting}
              className="px-3 py-1.5 rounded-lg bg-white/[0.08] border border-white/[0.15] text-white text-xs font-bold hover:bg-white/[0.14] transition-colors disabled:opacity-40"
            >
              📥 PNG
            </button>
          </div>
        </div>

        {/* Gasto reportado */}
        <p className="text-gray-muted text-[11px] uppercase tracking-wide mb-2">Gasto reportado / mes</p>
        <div className="grid sm:grid-cols-4 gap-3 mb-5">
          <div className="rounded-xl bg-white/[0.03] border-l-4 border-telos-blue p-4">
            <p className="text-gray-muted text-[11px] uppercase tracking-wide mb-1">💧 Agua</p>
            <p className="text-white text-xl font-bold">{money(gastoAgua)}</p>
          </div>
          <div className="rounded-xl bg-white/[0.03] border-l-4 border-telos-orange p-4">
            <p className="text-gray-muted text-[11px] uppercase tracking-wide mb-1">🔥 Gas</p>
            <p className="text-white text-xl font-bold">{money(gastoGas)}</p>
          </div>
          <div className="rounded-xl bg-white/[0.03] border-l-4 border-telos-green p-4">
            <p className="text-gray-muted text-[11px] uppercase tracking-wide mb-1">⚡ Electricidad</p>
            <p className="text-white text-xl font-bold">{money(gastoLuz)}</p>
          </div>
          <div className="rounded-xl bg-white/[0.06] border-l-4 border-white p-4">
            <p className="text-gray-muted text-[11px] uppercase tracking-wide mb-1">Total</p>
            <p className="text-white text-xl font-bold">{money(gastoAgua + gastoGas + gastoLuz)}</p>
          </div>
        </div>

        {/* Ahorro estimado */}
        <p className="text-gray-muted text-[11px] uppercase tracking-wide mb-2">Ahorro anual estimado</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-telos-blue/10 border border-telos-blue/25 p-4">
            <p className="text-telos-blue text-xs font-bold mb-1">💧 Agua ({Math.round(PCT_AHORRO_AGUA * 100)}%)</p>
            {ahorroAgua != null ? (
              <p className="text-white text-2xl font-bold">{money(ahorroAgua)}</p>
            ) : (
              <p className="text-gray-muted text-sm">Sin dato reportado</p>
            )}
          </div>
          <div className="rounded-xl bg-telos-orange/10 border border-telos-orange/25 p-4">
            <p className="text-telos-orange text-xs font-bold mb-1">🔥 Gas ({Math.round(PCT_AHORRO_GAS * 100)}%)</p>
            {ahorroGas != null ? (
              <p className="text-white text-2xl font-bold">{money(ahorroGas)}</p>
            ) : (
              <p className="text-gray-muted text-sm">Sin dato reportado</p>
            )}
          </div>
          <div className="rounded-xl bg-telos-green/10 border border-telos-green/25 p-4">
            <p className="text-telos-green text-xs font-bold mb-1">⚡ Electricidad (solar)</p>
            {ahorroLuz != null ? (
              <p className="text-white text-2xl font-bold">{money(ahorroLuz)}</p>
            ) : gastoLuz > 0 ? (
              <button
                onClick={generarProyeccion}
                disabled={generando}
                className="report-actions mt-1 px-3 py-2 rounded-lg bg-telos-green text-black font-bold text-xs hover:bg-telos-green-light transition-all disabled:opacity-50"
              >
                {generando ? 'Generando…' : 'Generar proyección →'}
              </button>
            ) : (
              <p className="text-gray-muted text-sm">Sin dato reportado</p>
            )}
          </div>
        </div>

        <p className="text-gray-muted text-[11px] mt-4">
          Agua y gas: estimado por % del gasto anualizado reportado. Electricidad: proyección calculada con el
          motor solar de TELOS.
        </p>

        {auditoria.cotizacion_id && (
          <Link
            href={`/cotizador?id=${auditoria.cotizacion_id}`}
            target="_blank"
            className="report-actions inline-block mt-3 text-telos-blue text-xs font-bold hover:underline"
          >
            Abrir la proyección solar en el cotizador →
          </Link>
        )}
        {msg && (
          <p className={`report-actions text-xs mt-3 ${msg.type === 'error' ? 'text-red-400' : 'text-telos-green'}`}>
            {msg.text}
          </p>
        )}
      </div>

      {/* Archivos */}
      {auditoria.archivos?.length > 0 && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 mb-6">
          <h2 className="text-white font-bold mb-3">Archivos adjuntos</h2>
          <ul className="flex flex-col gap-2">
            {auditoria.archivos.map((f, i) => (
              <li key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-300">{f.nombre}</span>
                {f.url ? (
                  <a href={f.url} target="_blank" rel="noreferrer" className="text-telos-blue text-xs font-bold hover:underline">
                    Descargar
                  </a>
                ) : (
                  <span className="text-gray-muted text-xs">No disponible</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Respuestas del cuestionario */}
      <div className="flex flex-col gap-4 mb-6">
        {SECTIONS.map((section) => {
          const entries = section.questions
            .map((q) => [q, r[q.key]])
            .filter(([, v]) => v != null && v !== '' && !(Array.isArray(v) && v.length === 0))
          if (entries.length === 0) return null
          return (
            <div key={section.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <h3 className="text-white font-bold mb-3">{section.title}</h3>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {entries.map(([q, v]) => (
                  <div key={q.key}>
                    <dt className="text-gray-muted text-xs">{q.label}</dt>
                    <dd className="text-gray-200 text-sm">{formatValue(q, v)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        })}
        {r.notas && (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
            <h3 className="text-white font-bold mb-2">Notas del cliente</h3>
            <p className="text-gray-300 text-sm whitespace-pre-wrap">{r.notas}</p>
          </div>
        )}
      </div>

      {/* Notas internas */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
        <h2 className="text-white font-bold mb-3">Notas internas</h2>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          rows={4}
          placeholder="Observaciones para el equipo…"
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.12] text-white placeholder:text-gray-muted text-sm focus:outline-none focus:border-telos-blue/60 transition-colors"
        />
        <button
          onClick={guardarNotas}
          disabled={savingNotas}
          className="mt-3 px-4 py-2 rounded-lg bg-telos-blue/15 border border-telos-blue/30 text-telos-blue text-xs font-bold hover:bg-telos-blue/25 transition-colors disabled:opacity-50"
        >
          {savingNotas ? 'Guardando…' : 'Guardar notas'}
        </button>
      </div>
    </div>
  )
}
