import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/db'

// Consulta trivial que Vercel Cron dispara periódicamente para evitar que
// Supabase pause el proyecto por inactividad (plan free: pausa a los 7 días
// sin actividad). No expone datos, solo confirma que la conexión responde.
//
// force-dynamic: sin esto, Next.js la trata como estática (sin params ni
// fetch dinámico detectado) y cachea la primera respuesta para siempre.
export const dynamic = 'force-dynamic'

export async function GET() {
  const db = getSupabase()

  if (!db) {
    return NextResponse.json({ ok: false, reason: 'Supabase no configurado' })
  }

  const { error } = await db.from('cotizaciones').select('id').limit(1)

  return NextResponse.json({ ok: !error, checkedAt: new Date().toISOString() })
}
