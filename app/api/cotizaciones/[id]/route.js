import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCotizacion, deleteCotizacion } from '@/lib/db'
import { COTIZ_COOKIE, isValidToken } from '@/lib/cotizadorAuth'

export async function GET(request, { params }) {
  const token = cookies().get(COTIZ_COOKIE)?.value
  if (!(await isValidToken(token))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { data, error } = await getCotizacion(params.id)
  if (error || !data) {
    return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
  }

  return NextResponse.json({ cotizacion: data })
}

export async function DELETE(request, { params }) {
  const token = cookies().get(COTIZ_COOKIE)?.value
  if (!(await isValidToken(token))) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { error } = await deleteCotizacion(params.id)
  if (error) {
    if (error.code === 'NOT_FOUND') {
      return NextResponse.json({ error: 'La cotización ya no existe.' }, { status: 404 })
    }
    if (error.code === 'LINKED') {
      return NextResponse.json(
        { error: 'No se puede eliminar: esta cotización está vinculada a una auditoría.' },
        { status: 409 }
      )
    }
    console.error('[Cotizaciones DELETE]', error.message || error)
    return NextResponse.json({ error: 'No se pudo eliminar. Intenta de nuevo.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
