import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getConfig, setConfig } from '@/lib/db'
import { COTIZ_COOKIE, isValidToken } from '@/lib/cotizadorAuth'

// Solo estas claves se pueden leer/escribir.
const CLAVES = new Set(['cuentas', 'emisor'])
const MAX_BYTES = 60_000

const txt = (v, max = 300) => (typeof v === 'string' ? v.slice(0, max) : '')

// Limpia el valor según la clave (nunca se guarda lo que llegue tal cual).
function limpiar(clave, valor) {
  if (clave === 'cuentas') {
    if (!Array.isArray(valor)) return null
    return valor.slice(0, 30).map((c, i) => ({
      id: txt(c?.id, 60) || `c${Date.now()}${i}`,
      alias: txt(c?.alias, 80),
      titular: txt(c?.titular, 150),
      banco: txt(c?.banco, 100),
      pais: txt(c?.pais, 80),
      cuenta: txt(c?.cuenta, 60),
      clabe: txt(c?.clabe, 40),
      swift: txt(c?.swift, 40),
      extra: txt(c?.extra, 300),
    }))
  }
  if (clave === 'emisor') {
    if (!valor || typeof valor !== 'object' || Array.isArray(valor)) return null
    return {
      nombre: txt(valor.nombre, 150),
      direccion: txt(valor.direccion, 400),
      email: txt(valor.email, 150),
      telefono: txt(valor.telefono, 60),
      rfc: txt(valor.rfc, 40),
    }
  }
  return null
}

async function autorizado() {
  return isValidToken(cookies().get(COTIZ_COOKIE)?.value)
}

export async function GET(request) {
  if (!(await autorizado())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const clave = new URL(request.url).searchParams.get('clave')
  if (!CLAVES.has(clave)) return NextResponse.json({ error: 'Clave inválida' }, { status: 400 })

  const { data, error } = await getConfig(clave)
  if (error) {
    console.error('[Config GET]', error.message || error)
    return NextResponse.json(
      { error: 'No se pudo leer la configuración. ¿Ya creaste la tabla cotizador_config en Supabase?' },
      { status: 500 }
    )
  }
  return NextResponse.json({ valor: data })
}

export async function PUT(request) {
  if (!(await autorizado())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Formato inválido' }, { status: 400 })
  }
  if (!CLAVES.has(body?.clave)) return NextResponse.json({ error: 'Clave inválida' }, { status: 400 })
  if (JSON.stringify(body.valor ?? null).length > MAX_BYTES) {
    return NextResponse.json({ error: 'Demasiado grande' }, { status: 413 })
  }

  const valor = limpiar(body.clave, body.valor)
  if (valor === null) return NextResponse.json({ error: 'Valor inválido' }, { status: 422 })

  const { error } = await setConfig(body.clave, valor)
  if (error) {
    console.error('[Config PUT]', error.message || error)
    return NextResponse.json(
      { error: 'No se pudo guardar. ¿Ya creaste la tabla cotizador_config en Supabase?' },
      { status: 500 }
    )
  }
  return NextResponse.json({ ok: true, valor })
}
