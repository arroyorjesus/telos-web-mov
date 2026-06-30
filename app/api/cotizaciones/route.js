import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { saveCotizacion, listCotizaciones } from '@/lib/db'
import { COTIZ_COOKIE, isValidToken } from '@/lib/cotizadorAuth'

async function requireAuth() {
  const token = cookies().get(COTIZ_COOKIE)?.value
  return isValidToken(token)
}

// Campos de resumen permitidos (se extraen del payload para listar/filtrar).
function pickSummary(body) {
  const num = (v) => {
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  }
  return {
    cliente: body.cliente?.toString().slice(0, 200) || null,
    proyecto: body.proyecto?.toString().slice(0, 200) || null,
    atencion: body.atencion?.toString().slice(0, 200) || null,
    segmento: body.segmento?.toString().slice(0, 40) || null,
    ciudad: body.ciudad?.toString().slice(0, 120) || null,
    kwp: num(body.kwp),
    paneles: body.paneles != null ? parseInt(body.paneles, 10) || null : null,
    inversion: num(body.inversion),
    roi: num(body.roi),
    ahorro_anual: num(body.ahorro_anual),
    ahorro_30: num(body.ahorro_30),
    kwh_anual: num(body.kwh_anual),
    pct_ahorro: num(body.pct_ahorro),
    estado: body.estado?.toString().slice(0, 40) || 'borrador',
    payload: body.payload ?? null,
  }
}

export async function POST(request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Formato inválido' }, { status: 400 })
  }

  if (!body.payload) {
    return NextResponse.json({ error: 'Falta el payload de la cotización' }, { status: 422 })
  }

  const row = pickSummary(body)
  if (body.id) row.id = body.id // update existente

  const { data, error } = await saveCotizacion(row)
  if (error) {
    return NextResponse.json({ error: error.message || 'Error al guardar' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data?.id })
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { data, error } = await listCotizaciones()
  if (error) {
    return NextResponse.json({ error: error.message || 'Error al listar' }, { status: 500 })
  }

  return NextResponse.json({ cotizaciones: data || [] })
}
