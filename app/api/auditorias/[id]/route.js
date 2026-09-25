import { NextResponse } from 'next/server'
import { updateAuditoria } from '@/lib/db'

export async function PATCH(request, { params }) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Formato inválido' }, { status: 400 })
  }

  const patch = {}
  if (typeof body.estado === 'string') patch.estado = body.estado.slice(0, 40)
  if (typeof body.notas === 'string') patch.notas = body.notas.slice(0, 5000)

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Nada que actualizar' }, { status: 422 })
  }

  const { data, error } = await updateAuditoria(params.id, patch)
  if (error) {
    return NextResponse.json({ error: error.message || 'Error al actualizar' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data?.id })
}
