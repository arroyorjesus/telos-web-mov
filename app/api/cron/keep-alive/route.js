import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/db'

// Consulta que Vercel Cron dispara cada día para que Supabase (plan gratis) no
// pause el proyecto por 7 días sin actividad. No expone datos.
//
// - force-dynamic + fetch sin caché (ver lib/db.js): la consulta SIEMPRE llega a
//   Supabase; antes se podía contestar "ok" sin tocar la base.
// - Si falla responde 503 y lo deja en los logs, para que Vercel lo marque como
//   cron fallido en vez de aparentar que todo está bien.
export const dynamic = 'force-dynamic'

export async function GET() {
  const checkedAt = new Date().toISOString()
  const db = getSupabase()

  if (!db) {
    console.error('[keep-alive] Supabase no configurado')
    return NextResponse.json({ ok: false, reason: 'Supabase no configurado', checkedAt }, { status: 503 })
  }

  // head + count: consulta real a la tabla sin traer filas.
  const { error } = await db.from('cotizaciones').select('id', { count: 'exact', head: true })

  if (error) {
    console.error('[keep-alive] Supabase NO responde:', error.message || error)
    return NextResponse.json({ ok: false, reason: error.message || 'error', checkedAt }, { status: 503 })
  }

  // No se devuelve ningún dato de la base: este endpoint es público.
  return NextResponse.json({ ok: true, checkedAt })
}
