import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COTIZ_COOKIE, isValidToken } from '@/lib/cotizadorAuth'

// Tipo de cambio USD→MXN para el cotizador.
// Fuente principal: valor del DOF (Diario Oficial de la Federación) tal como lo
// publica eldolar.info. El DOF publica cada día hábil el FIX de Banxico del día
// hábil anterior; ese es el TC "para solventar obligaciones en dólares".
// Respaldo: referencia internacional (BCE vía frankfurter), marcada como NO oficial.
//
// El servidor lo guarda en caché 1 hora, así que muchas consultas = 1 sola
// petición a la fuente.

const ELDOLAR_URL = 'https://www.eldolar.info/es-MX/mexico/dia/hoy'
const REVALIDATE_DOF = 3600
const TC_MIN = 10
const TC_MAX = 40

const hoyCDMX = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'America/Mexico_City' }) // YYYY-MM-DD

function validar(v) {
  if (!Number.isFinite(v) || v < TC_MIN || v > TC_MAX) {
    throw new Error(`TC fuera de rango: ${v}`)
  }
  return v
}

async function desdeDOF() {
  const res = await fetch(ELDOLAR_URL, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; TELOS-cotizador)',
      'accept-language': 'es-MX,es;q=0.9',
    },
    next: { revalidate: REVALIDATE_DOF },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`eldolar.info HTTP ${res.status}`)
  const html = await res.text()

  // <span class=small-hide>DOF, Diario Oficial de la Federación</span> … class=xTimes>18.3528<
  const m = html.match(
    /DOF, Diario Oficial de la Federaci[oó]n<\/span>[\s\S]{0,500}?class=xTimes>\s*([0-9]+(?:\.[0-9]+)?)\s*</
  )
  if (!m) throw new Error('No se encontró el valor DOF en la página')
  return validar(parseFloat(m[1]))
}

async function desdeReferencia() {
  const res = await fetch('https://api.frankfurter.app/latest?from=USD&to=MXN', {
    next: { revalidate: REVALIDATE_DOF },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) throw new Error(`frankfurter HTTP ${res.status}`)
  const j = await res.json()
  return { tc: validar(Number(j?.rates?.MXN)), fecha: j?.date || hoyCDMX() }
}

export async function GET() {
  const token = cookies().get(COTIZ_COOKIE)?.value
  if (!(await isValidToken(token))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const tc = await desdeDOF()
    return NextResponse.json({
      tc,
      oficial: true,
      fuente: 'DOF (Diario Oficial de la Federación)',
      fecha: hoyCDMX(),
    })
  } catch (e) {
    console.error('[TC DOF]', e?.message || e)
  }

  try {
    const { tc, fecha } = await desdeReferencia()
    return NextResponse.json({
      tc,
      oficial: false,
      fuente: 'Referencia internacional (BCE), no es el TC oficial DOF',
      fecha,
    })
  } catch (e) {
    console.error('[TC referencia]', e?.message || e)
  }

  return NextResponse.json(
    { error: 'No se pudo obtener el tipo de cambio. Captúralo manualmente.' },
    { status: 502 }
  )
}
