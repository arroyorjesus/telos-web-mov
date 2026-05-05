import { createClient } from '@supabase/supabase-js'

let supabase = null

export function getSupabase() {
  if (supabase) return supabase

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) return null

  supabase = createClient(url, key, {
    auth: { persistSession: false },
  })

  return supabase
}

export async function saveLead(data) {
  const db = getSupabase()

  if (!db) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[DB mock] Lead would be saved:', data)
    }
    return { data: { id: 'mock-id' }, error: null }
  }

  return db.from('leads').insert([data]).select('id').single()
}

// SQL to create the leads table in Supabase:
/*
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT NOT NULL,
  empresa TEXT NOT NULL,
  ciudad TEXT,
  tipo_operacion TEXT,
  principal_consumo TEXT,
  gasto_mensual TEXT,
  objetivo TEXT,
  mensaje TEXT,
  source TEXT DEFAULT 'telos.com.mx',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: only service role can read/write
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
*/
