import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCotizacion } from '@/lib/db'
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
