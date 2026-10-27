'use client'

import { useEffect, useMemo, useState } from 'react'

const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100
const money = (n) =>
  '$ ' +
  round2(n).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const pad = (n) => String(n).padStart(2, '0')
const hoyISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
const fechaDMA = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '')
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso || ''
}
const folioNuevo = () => {
  const d = new Date()
  return `COT-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`
}

const CUENTA_VACIA = { id: '', alias: '', titular: '', banco: '', pais: '', cuenta: '', clabe: '', swift: '', extra: '' }

// Líneas de una cuenta para mostrar en la hoja (solo las que tengan dato).
const lineasCuenta = (c) =>
  c
    ? [
        c.titular && `Beneficiario: ${c.titular}`,
        c.banco && `Banco: ${c.banco}`,
        c.pais && `País del banco: ${c.pais}`,
        c.cuenta && `Número de cuenta: ${c.cuenta}`,
        c.swift && `SWIFT/BIC: ${c.swift}`,
        c.clabe && `CLABE: ${c.clabe}`,
        ...(c.extra || '').split('\n').filter((l) => l.trim()),
      ].filter(Boolean)
    : []

let _k = 0
const nuevoItem = () => ({ k: ++_k, desc: '', periodo: '', cantidad: 1, precio: 0 })

const input =
  'w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.12] text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-telos-green/60'
const label = 'block text-[0.7rem] font-semibold uppercase tracking-wide text-white/50 mb-1'

// Estilos que solo aplican al imprimir / guardar como PDF: solo se ve la hoja.
const PRINT_CSS = `
@page { size: A4; margin: 0; }
@media print {
  html, body { background: #fff !important; height: auto !important; }
  body * { visibility: hidden !important; }
  .simple-overlay { position: absolute !important; inset: auto !important; top: 0 !important; left: 0 !important;
    width: 100% !important; height: auto !important; overflow: visible !important; background: #fff !important; }
  .print-sheet, .print-sheet * { visibility: visible !important; }
  .no-print { display: none !important; }
  .print-grid { display: block !important; padding: 0 !important; }
  .print-wrap { overflow: visible !important; }
  .print-sheet { box-shadow: none !important; margin: 0 !important; width: 210mm !important; min-height: 297mm !important; }
}`

export default function SimpleQuoteClient({ id: idInicial, emisorDefault }) {
  const [id, setId] = useState(idInicial)
  const [cargando, setCargando] = useState(Boolean(idInicial))
  const [aviso, setAviso] = useState(null) // { tipo: 'ok'|'error', texto }
  const [guardando, setGuardando] = useState(false)

  const [emisor, setEmisor] = useState(emisorDefault)
  const [cliente, setCliente] = useState({ nombre: '', atencion: '', direccion: '', email: '', rfc: '' })
  const [doc, setDoc] = useState({ folio: '', fecha: '', vigencia: 15, asunto: '' })
  const [items, setItems] = useState([nuevoItem()])
  const [iva, setIva] = useState(true)
  const [terminos, setTerminos] = useState('')
  const [notas, setNotas] = useState('')
  const [datosPago, setDatosPago] = useState('')
  const [titulo, setTitulo] = useState('Cotización')
  const [ivaPct, setIvaPct] = useState(16)
  const [cuentas, setCuentas] = useState([]) // lista guardada (configuración)
  const [cuentaSel, setCuentaSel] = useState(null) // cuenta elegida para ESTA cotización (copia)
  const [cuentasError, setCuentasError] = useState(null)
  const [adminAbierto, setAdminAbierto] = useState(false)
  const [formCuenta, setFormCuenta] = useState(CUENTA_VACIA)
  const [guardandoCfg, setGuardandoCfg] = useState(false)

  // Folio y fecha por defecto (en el cliente, para no desajustar la hidratación).
  useEffect(() => {
    if (!idInicial) setDoc((d) => ({ ...d, folio: folioNuevo(), fecha: hoyISO() }))
  }, [idInicial])

  // Cuentas bancarias guardadas y emisor predeterminado.
  useEffect(() => {
    let vivo = true
    ;(async () => {
      try {
        const r = await fetch('/api/cotizador-config?clave=cuentas', { cache: 'no-store' })
        const d = await r.json().catch(() => ({}))
        if (!r.ok) throw new Error(d.error || 'No se pudieron cargar las cuentas.')
        if (vivo && Array.isArray(d.valor)) setCuentas(d.valor)
      } catch (e) {
        if (vivo) setCuentasError(e.message)
      }
      if (idInicial) return // una cotización guardada conserva su emisor
      try {
        const r = await fetch('/api/cotizador-config?clave=emisor', { cache: 'no-store' })
        const d = await r.json().catch(() => ({}))
        if (r.ok && d.valor && vivo) setEmisor((e) => ({ ...e, ...d.valor }))
      } catch {
        /* se queda con el emisor por defecto */
      }
    })()
    return () => {
      vivo = false
    }
  }, [idInicial])

  // Reabrir una cotización guardada.
  useEffect(() => {
    if (!idInicial) return
    let vivo = true
    ;(async () => {
      try {
        const res = await fetch(`/api/cotizaciones/${encodeURIComponent(idInicial)}`, { cache: 'no-store' })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data.error || 'No se pudo cargar la cotización.')
        const p = data.cotizacion?.payload
        if (!p || p.tipo !== 'simple') {
          throw new Error('Esa cotización es del cotizador solar. Ábrela desde "Reabrir" en la lista.')
        }
        if (!vivo) return
        setEmisor((e) => ({ ...e, ...(p.emisor || {}) }))
        setCliente((c) => ({ ...c, ...(p.cliente || {}) }))
        setDoc((d) => ({ ...d, ...(p.doc || {}) }))
        setItems((p.items?.length ? p.items : [{}]).map((it) => ({ ...nuevoItem(), ...it, k: ++_k })))
        setIva(p.iva !== false)
        setTerminos(p.terminos || '')
        setNotas(p.notas || '')
        setDatosPago(p.datosPago || '')
        setTitulo(p.titulo || 'Cotización')
        setIvaPct(p.ivaPct ?? 16)
        setCuentaSel(p.cuenta || null)
      } catch (e) {
        if (vivo) setAviso({ tipo: 'error', texto: e.message })
      } finally {
        if (vivo) setCargando(false)
      }
    })()
    return () => {
      vivo = false
    }
  }, [idInicial])

  const calc = useMemo(() => {
    const filas = items.map((it) => ({ ...it, total: round2((Number(it.cantidad) || 0) * (Number(it.precio) || 0)) }))
    const subtotal = round2(filas.reduce((a, f) => a + f.total, 0))
    const ivaMonto = iva ? round2(subtotal * ((Number(ivaPct) || 0) / 100)) : 0
    return { filas, subtotal, ivaMonto, total: round2(subtotal + ivaMonto) }
  }, [items, iva, ivaPct])

  const hayPeriodo = items.some((it) => (it.periodo || '').trim())

  const setItem = (k, campo, valor) =>
    setItems((prev) => prev.map((it) => (it.k === k ? { ...it, [campo]: valor } : it)))
  const quitarItem = (k) => setItems((prev) => (prev.length > 1 ? prev.filter((it) => it.k !== k) : prev))

  async function guardar(comoNueva) {
    if (!cliente.nombre.trim() && !doc.asunto.trim()) {
      setAviso({ tipo: 'error', texto: 'Captura al menos el nombre del cliente o el asunto antes de guardar.' })
      return
    }
    if (!items.some((it) => (it.desc || '').trim())) {
      setAviso({ tipo: 'error', texto: 'Agrega al menos un concepto con descripción.' })
      return
    }
    setGuardando(true)
    setAviso(null)
    try {
      const body = {
        ...(!comoNueva && id ? { id } : {}),
        cliente: cliente.nombre.trim(),
        proyecto: doc.asunto.trim(),
        atencion: cliente.atencion.trim(),
        segmento: 'simple',
        inversion: calc.total,
        estado: 'borrador',
        payload: {
          tipo: 'simple',
          version: 1,
          emisor,
          cliente,
          doc,
          items: items.map(({ desc, periodo, cantidad, precio }) => ({ desc, periodo, cantidad, precio })),
          iva,
          terminos,
          notas,
          datosPago,
          titulo,
          ivaPct: Number(ivaPct) || 0,
          cuenta: cuentaSel, // copia: la cotización no cambia si luego editas la cuenta
        },
      }
      const res = await fetch('/api/cotizaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'No se pudo guardar.')
      if (data.id && (comoNueva || !id)) {
        setId(data.id)
        window.history.replaceState(null, '', `/cotizaciones/simple?id=${encodeURIComponent(data.id)}`)
      }
      setAviso({
        tipo: 'ok',
        texto: !comoNueva && id ? 'Cambios guardados.' : 'Cotización guardada. Ya aparece en la lista de cotizaciones.',
      })
    } catch (e) {
      setAviso({ tipo: 'error', texto: e.message })
    } finally {
      setGuardando(false)
    }
  }

  async function guardarCuentas(nuevaLista) {
    setCuentasError(null)
    try {
      const res = await fetch('/api/cotizador-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clave: 'cuentas', valor: nuevaLista }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(d.error || 'No se pudo guardar la cuenta.')
      setCuentas(d.valor)
      // Si la cuenta elegida se editó o se borró, reflejarlo en esta cotización.
      setCuentaSel((sel) => (sel ? d.valor.find((c) => c.id === sel.id) || sel : sel))
      return true
    } catch (e) {
      setCuentasError(e.message)
      return false
    }
  }

  async function guardarCuentaForm() {
    const f = formCuenta
    if (!f.alias.trim()) {
      setCuentasError('Ponle un nombre corto a la cuenta (ej. "BBVA pesos").')
      return
    }
    const lista = f.id
      ? cuentas.map((c) => (c.id === f.id ? f : c))
      : [...cuentas, { ...f, id: `c${Date.now()}` }]
    if (await guardarCuentas(lista)) setFormCuenta(CUENTA_VACIA)
  }

  async function borrarCuenta(c) {
    if (!window.confirm(`¿Borrar la cuenta "${c.alias}"?\n\nLas cotizaciones ya guardadas conservan sus datos.`)) return
    await guardarCuentas(cuentas.filter((x) => x.id !== c.id))
    if (formCuenta.id === c.id) setFormCuenta(CUENTA_VACIA)
  }

  async function guardarEmisorPredeterminado() {
    setGuardandoCfg(true)
    setAviso(null)
    try {
      const res = await fetch('/api/cotizador-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clave: 'emisor', valor: emisor }),
      })
      const d = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(d.error || 'No se pudo guardar.')
      setAviso({ tipo: 'ok', texto: 'Datos del emisor guardados como predeterminados para las cotizaciones nuevas.' })
    } catch (e) {
      setAviso({ tipo: 'error', texto: e.message })
    } finally {
      setGuardandoCfg(false)
    }
  }

  const lineas = (txt) => (txt || '').split('\n').filter((l) => l.trim())

  return (
    <div className="min-h-full text-white">
      <style>{PRINT_CSS}</style>

      {/* Barra superior */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <a href="/cotizaciones" className="text-sm text-white/60 hover:text-white">
            ← Cotizaciones
          </a>
          <h1 className="text-lg font-bold">Cotización simple</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {id && (
            <button
              type="button"
              onClick={() => guardar(true)}
              disabled={guardando || cargando}
              className="px-3.5 py-2 rounded-xl border border-white/15 text-sm font-semibold text-white/80 hover:bg-white/[0.06] disabled:opacity-50"
            >
              Guardar como nueva
            </button>
          )}
          <button
            type="button"
            onClick={() => guardar(false)}
            disabled={guardando || cargando}
            className="px-4 py-2 rounded-xl bg-telos-green text-black text-sm font-bold hover:bg-telos-green-light disabled:opacity-50"
          >
            {guardando ? 'Guardando…' : id ? 'Guardar cambios' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-sm font-bold hover:bg-white/15"
          >
            Descargar PDF
          </button>
        </div>
      </div>

      {aviso && (
        <div
          role="status"
          className={`no-print mx-4 mt-3 p-3 rounded-xl border text-sm ${
            aviso.tipo === 'ok'
              ? 'bg-green-500/10 border-green-500/20 text-green-300'
              : 'bg-red-500/10 border-red-500/20 text-red-300'
          }`}
        >
          {aviso.texto}
        </div>
      )}

      <div className="print-grid grid gap-6 p-4 lg:grid-cols-[minmax(320px,420px)_1fr] items-start">
        {/* ───────── Formulario ───────── */}
        <div className="no-print space-y-5">
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white/80">Documento</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className={label}>Folio</span>
                <input className={input} value={doc.folio} onChange={(e) => setDoc({ ...doc, folio: e.target.value })} />
              </div>
              <div>
                <span className={label}>Fecha</span>
                <input type="date" className={input} value={doc.fecha} onChange={(e) => setDoc({ ...doc, fecha: e.target.value })} />
              </div>
              <div className="col-span-2">
                <span className={label}>Título del documento</span>
                <input className={input} value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Cotización, Propuesta, Presupuesto…" />
              </div>
              <div className="col-span-2">
                <span className={label}>Asunto / proyecto (aparece en la lista)</span>
                <input className={input} value={doc.asunto} onChange={(e) => setDoc({ ...doc, asunto: e.target.value })} placeholder="Ej. Servicio de mantenimiento" />
              </div>
              <div>
                <span className={label}>Vigencia (días)</span>
                <input type="number" min="0" className={input} value={doc.vigencia} onChange={(e) => setDoc({ ...doc, vigencia: e.target.value })} />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white/80">Cliente</h2>
            <div>
              <span className={label}>Nombre o empresa</span>
              <input className={input} value={cliente.nombre} onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className={label}>Atención</span>
                <input className={input} value={cliente.atencion} onChange={(e) => setCliente({ ...cliente, atencion: e.target.value })} />
              </div>
              <div>
                <span className={label}>RFC / Tax ID</span>
                <input className={input} value={cliente.rfc} onChange={(e) => setCliente({ ...cliente, rfc: e.target.value })} />
              </div>
            </div>
            <div>
              <span className={label}>Dirección</span>
              <textarea rows={2} className={input} value={cliente.direccion} onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })} />
            </div>
            <div>
              <span className={label}>Correo</span>
              <input type="email" className={input} value={cliente.email} onChange={(e) => setCliente({ ...cliente, email: e.target.value })} />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white/80">Conceptos</h2>
            {items.map((it, i) => (
              <div key={it.k} className="rounded-xl border border-white/[0.1] p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/50">Concepto {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => quitarItem(it.k)}
                    disabled={items.length === 1}
                    className="text-xs text-red-300/80 hover:text-red-300 disabled:opacity-30"
                  >
                    Quitar
                  </button>
                </div>
                <textarea rows={2} className={input} placeholder="Descripción" value={it.desc} onChange={(e) => setItem(it.k, 'desc', e.target.value)} />
                <input className={input} placeholder="Periodo o fecha (opcional)" value={it.periodo} onChange={(e) => setItem(it.k, 'periodo', e.target.value)} />
                <div className="grid grid-cols-3 gap-2 items-end">
                  <div>
                    <span className={label}>Cantidad</span>
                    <input type="number" min="0" step="any" className={input} value={it.cantidad} onChange={(e) => setItem(it.k, 'cantidad', e.target.value)} />
                  </div>
                  <div>
                    <span className={label}>Precio unit.</span>
                    <input type="number" min="0" step="any" className={input} value={it.precio} onChange={(e) => setItem(it.k, 'precio', e.target.value)} />
                  </div>
                  <div className="text-right text-sm text-white/70 pb-2">{money(calc.filas[i]?.total)}</div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setItems((p) => [...p, nuevoItem()])}
              className="w-full py-2 rounded-xl border border-dashed border-white/20 text-sm text-white/70 hover:bg-white/[0.05]"
            >
              + Agregar concepto
            </button>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={iva} onChange={(e) => setIva(e.target.checked)} />
                Incluir IVA
              </label>
              <input
                type="number"
                min="0"
                step="any"
                disabled={!iva}
                className={`${input} !w-20 disabled:opacity-40`}
                value={ivaPct}
                onChange={(e) => setIvaPct(e.target.value)}
                aria-label="Porcentaje de IVA"
              />
              <span>%</span>
            </div>
            <p className="text-xs text-white/40">
              El subtotal, el IVA y el total se calculan solos al cambiar cantidades o precios.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-white/80">Condiciones</h2>
            <div>
              <span className={label}>Términos de pago</span>
              <textarea rows={2} className={input} value={terminos} onChange={(e) => setTerminos(e.target.value)} placeholder="Ej. 50% de anticipo y 50% contra entrega." />
            </div>
            <div className="space-y-2">
              <span className={label}>Cuenta para el pago</span>
              <select
                className={input}
                value={cuentaSel?.id || ''}
                onChange={(e) => setCuentaSel(cuentas.find((c) => c.id === e.target.value) || null)}
              >
                <option value="">— Sin datos bancarios —</option>
                {cuentaSel && !cuentas.some((c) => c.id === cuentaSel.id) && (
                  <option value={cuentaSel.id}>{cuentaSel.alias || 'Cuenta de esta cotización'} (guardada aquí)</option>
                )}
                {cuentas.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.alias}
                    {c.banco ? ` · ${c.banco}` : ''}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setAdminAbierto((v) => !v)}
                className="text-xs font-semibold text-telos-green hover:underline"
              >
                {adminAbierto ? 'Cerrar administrador de cuentas' : 'Administrar cuentas (agregar, editar, borrar)'}
              </button>
              {cuentasError && <p className="text-xs text-red-300">{cuentasError}</p>}

              {adminAbierto && (
                <div className="rounded-xl border border-white/[0.12] p-3 space-y-3 bg-white/[0.02]">
                  {cuentas.length === 0 && <p className="text-xs text-white/50">Aún no hay cuentas guardadas.</p>}
                  {cuentas.map((c) => (
                    <div key={c.id} className="flex items-center justify-between gap-2 text-sm">
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{c.alias}</p>
                        <p className="text-xs text-white/50 truncate">
                          {[c.banco, c.cuenta ? `****${c.cuenta.slice(-4)}` : '', c.clabe ? `CLABE ****${c.clabe.slice(-4)}` : '']
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button type="button" onClick={() => setFormCuenta({ ...CUENTA_VACIA, ...c })} className="text-xs text-white/70 hover:text-white">Editar</button>
                        <button type="button" onClick={() => borrarCuenta(c)} className="text-xs text-red-300/80 hover:text-red-300">Borrar</button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-white/[0.1] pt-3 space-y-2">
                    <p className="text-xs font-bold text-white/60">{formCuenta.id ? 'Editar cuenta' : 'Agregar cuenta'}</p>
                    <input className={input} placeholder='Nombre corto (ej. "BBVA pesos")' value={formCuenta.alias} onChange={(e) => setFormCuenta({ ...formCuenta, alias: e.target.value })} />
                    <input className={input} placeholder="Beneficiario (titular)" value={formCuenta.titular} onChange={(e) => setFormCuenta({ ...formCuenta, titular: e.target.value })} />
                    <div className="grid grid-cols-2 gap-2">
                      <input className={input} placeholder="Banco" value={formCuenta.banco} onChange={(e) => setFormCuenta({ ...formCuenta, banco: e.target.value })} />
                      <input className={input} placeholder="País del banco" value={formCuenta.pais} onChange={(e) => setFormCuenta({ ...formCuenta, pais: e.target.value })} />
                      <input className={input} placeholder="Número de cuenta" value={formCuenta.cuenta} onChange={(e) => setFormCuenta({ ...formCuenta, cuenta: e.target.value })} />
                      <input className={input} placeholder="SWIFT/BIC" value={formCuenta.swift} onChange={(e) => setFormCuenta({ ...formCuenta, swift: e.target.value })} />
                    </div>
                    <input className={input} placeholder="CLABE" value={formCuenta.clabe} onChange={(e) => setFormCuenta({ ...formCuenta, clabe: e.target.value })} />
                    <textarea rows={2} className={input} placeholder="Otros datos (opcional)" value={formCuenta.extra} onChange={(e) => setFormCuenta({ ...formCuenta, extra: e.target.value })} />
                    <div className="flex gap-2">
                      <button type="button" onClick={guardarCuentaForm} className="px-3 py-2 rounded-lg bg-telos-green text-black text-xs font-bold hover:bg-telos-green-light">
                        {formCuenta.id ? 'Guardar cambios de la cuenta' : 'Guardar cuenta'}
                      </button>
                      {(formCuenta.id || formCuenta.alias) && (
                        <button type="button" onClick={() => setFormCuenta(CUENTA_VACIA)} className="px-3 py-2 rounded-lg border border-white/15 text-xs text-white/70">
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <span className={label}>Otros datos de pago (opcional)</span>
              <textarea rows={2} className={input} value={datosPago} onChange={(e) => setDatosPago(e.target.value)} placeholder="Texto libre que salga debajo de la cuenta, ej. referencia de pago." />
            </div>
            <div>
              <span className={label}>Notas (opcional)</span>
              <textarea rows={2} className={input} value={notas} onChange={(e) => setNotas(e.target.value)} />
            </div>
          </section>

          <details open className="rounded-xl border border-white/[0.1] p-3">
            <summary className="cursor-pointer text-sm font-bold text-white/80">Datos del emisor</summary>
            <div className="space-y-3 mt-3">
              <div>
                <span className={label}>Nombre</span>
                <input className={input} value={emisor.nombre} onChange={(e) => setEmisor({ ...emisor, nombre: e.target.value })} />
              </div>
              <div>
                <span className={label}>Dirección</span>
                <textarea rows={2} className={input} value={emisor.direccion} onChange={(e) => setEmisor({ ...emisor, direccion: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className={label}>Correo</span>
                  <input className={input} value={emisor.email} onChange={(e) => setEmisor({ ...emisor, email: e.target.value })} />
                </div>
                <div>
                  <span className={label}>Teléfono</span>
                  <input className={input} value={emisor.telefono} onChange={(e) => setEmisor({ ...emisor, telefono: e.target.value })} />
                </div>
              </div>
              <div>
                <span className={label}>RFC</span>
                <input className={input} value={emisor.rfc} onChange={(e) => setEmisor({ ...emisor, rfc: e.target.value })} />
              </div>
              <button
                type="button"
                onClick={guardarEmisorPredeterminado}
                disabled={guardandoCfg}
                className="px-3 py-2 rounded-lg border border-white/15 text-xs font-semibold text-white/80 hover:bg-white/[0.06] disabled:opacity-50"
              >
                {guardandoCfg ? 'Guardando…' : 'Guardar como predeterminado para cotizaciones nuevas'}
              </button>
            </div>
          </details>
        </div>

        {/* ───────── Hoja (vista previa y PDF) ───────── */}
        <div className="print-wrap overflow-x-auto">
          <div
            className="print-sheet mx-auto bg-white shadow-2xl"
            style={{
              width: '210mm',
              minHeight: '297mm',
              padding: '14mm 14mm 16mm',
              color: '#6a6c6e',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: '10.5px',
              lineHeight: 1.45,
            }}
          >
            {/* Encabezado: cliente (izq.) · emisor + logo (der.) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12mm' }}>
              <div style={{ flex: 1 }}>
                {cliente.nombre && <p style={{ fontWeight: 700, margin: '0 0 6px' }}>{cliente.nombre}</p>}
                {cliente.atencion && <p style={{ fontWeight: 700, margin: '0 0 6px' }}>{cliente.atencion}</p>}
                {lineas(cliente.direccion).map((l, i) => (
                  <p key={i} style={{ margin: 0 }}>{l}</p>
                ))}
                {cliente.email && <p style={{ margin: '8px 0 0' }}>{cliente.email}</p>}
                {cliente.rfc && <p style={{ margin: '8px 0 0' }}>RFC: {cliente.rfc}</p>}
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', gap: '6mm' }}>
                <div>
                  <p style={{ fontWeight: 700, margin: '0 0 6px' }}>{emisor.nombre}</p>
                  {lineas(emisor.direccion).map((l, i) => (
                    <p key={i} style={{ margin: 0 }}>{l}</p>
                  ))}
                  {emisor.email && <p style={{ margin: '8px 0 0' }}>{emisor.email}</p>}
                  {emisor.telefono && <p style={{ margin: 0 }}>{emisor.telefono}</p>}
                  {emisor.rfc && <p style={{ margin: '8px 0 0' }}>RFC: {emisor.rfc}</p>}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo-azul.png" alt="TELOS" style={{ width: '24mm', height: '24mm', objectFit: 'contain' }} />
              </div>
            </div>

            <h2 style={{ fontSize: '15px', fontWeight: 700, margin: '14mm 0 6mm' }}>{titulo || 'Cotización'}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '9mm' }}>
              <span>Folio {doc.folio}</span>
              <span>Fecha: {fechaDMA(doc.fecha)}</span>
            </div>
            {doc.asunto && <p style={{ fontWeight: 700, margin: '-3mm 0 6mm' }}>{doc.asunto}</p>}

            {/* Tabla */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#a6a6a6', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '2px 6px', fontWeight: 400, width: '7%' }}>Pos</th>
                  <th style={{ padding: '2px 6px', fontWeight: 400 }}>Concepto</th>
                  {hayPeriodo && <th style={{ padding: '2px 6px', fontWeight: 400, width: '20%' }}>Periodo</th>}
                  <th style={{ padding: '2px 6px', fontWeight: 400, width: '11%' }}>Cantidad</th>
                  <th style={{ padding: '2px 6px', fontWeight: 400, width: '15%' }}>Precio</th>
                  <th style={{ padding: '2px 6px', fontWeight: 400, width: '16%', textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {calc.filas.map((f, i) => (
                  <tr key={f.k} style={{ borderBottom: '1px solid #e8e8e8', verticalAlign: 'middle' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 700 }}>{i + 1}</td>
                    <td style={{ padding: '10px 6px', whiteSpace: 'pre-line' }}>{f.desc || '—'}</td>
                    {hayPeriodo && <td style={{ padding: '10px 6px' }}>{f.periodo}</td>}
                    <td style={{ padding: '10px 6px' }}>{Number(f.cantidad) || 0}</td>
                    <td style={{ padding: '10px 6px', whiteSpace: 'nowrap' }}>{money(f.precio)}</td>
                    <td style={{ padding: '10px 6px', textAlign: 'right', whiteSpace: 'nowrap' }}>{money(f.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totales */}
            <div style={{ marginTop: '8mm', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4mm' }}>
              <div style={{ display: 'flex', gap: '8mm' }}>
                <span>Subtotal:</span>
                <span style={{ minWidth: '28mm', textAlign: 'right' }}>{money(calc.subtotal)}</span>
              </div>
              {iva && (
                <div style={{ display: 'flex', gap: '8mm' }}>
                  <span>IVA ({Number(ivaPct) || 0}%):</span>
                  <span style={{ minWidth: '28mm', textAlign: 'right' }}>{money(calc.ivaMonto)}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: '8mm', fontWeight: 700 }}>
                <span>Total (MXN):</span>
                <span style={{ minWidth: '28mm', textAlign: 'right' }}>{money(calc.total)}</span>
              </div>
            </div>

            {/* Condiciones */}
            <div style={{ marginTop: '12mm' }}>
              {Number(doc.vigencia) > 0 && (
                <p style={{ margin: '0 0 4mm' }}>
                  <b>Vigencia:</b> {Number(doc.vigencia)} días naturales a partir de la fecha de esta cotización.
                </p>
              )}
              {terminos.trim() && (
                <div style={{ margin: '0 0 4mm' }}>
                  <p style={{ fontWeight: 700, margin: 0 }}>Términos de pago</p>
                  <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{terminos}</p>
                </div>
              )}
              {notas.trim() && (
                <div style={{ margin: '0 0 4mm' }}>
                  <p style={{ fontWeight: 700, margin: 0 }}>Notas</p>
                  <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{notas}</p>
                </div>
              )}
            </div>

            {(cuentaSel || datosPago.trim()) && (
              <div style={{ marginTop: '6mm', paddingTop: '6mm', borderTop: '1px solid #cfcfcf' }}>
                <p style={{ fontWeight: 700, margin: '0 0 2mm' }}>Datos de pago</p>
                {lineasCuenta(cuentaSel).map((l, i) => (
                  <p key={i} style={{ margin: 0 }}>{l}</p>
                ))}
                {datosPago.trim() && (
                  <p style={{ margin: cuentaSel ? '2mm 0 0' : 0, whiteSpace: 'pre-line' }}>{datosPago}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
