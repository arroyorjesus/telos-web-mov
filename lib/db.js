import { createClient } from '@supabase/supabase-js'
import { promises as fs } from 'fs'
import path from 'path'

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

// ─── Cotizaciones (calculadora solar / CRM) ──────────────────────────────────
//
// Cuando Supabase está configurado, se usa la tabla `cotizaciones`.
// En desarrollo sin Supabase, se persiste en un JSON local (gitignored) para
// poder probar el flujo completo del CRM.

const MOCK_FILE = path.join(process.cwd(), '.cotizaciones-mock.json')

async function readMock() {
  try {
    const raw = await fs.readFile(MOCK_FILE, 'utf8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeMock(rows) {
  await fs.writeFile(MOCK_FILE, JSON.stringify(rows, null, 2), 'utf8')
}

// Campos resumen que se extraen para listar/filtrar en el CRM.
const SUMMARY_FIELDS = [
  'cliente',
  'proyecto',
  'atencion',
  'segmento',
  'ciudad',
  'kwp',
  'paneles',
  'inversion',
  'roi',
  'ahorro_anual',
  'ahorro_30',
  'kwh_anual',
  'pct_ahorro',
]

export async function saveCotizacion(data) {
  const db = getSupabase()

  if (!db) {
    const rows = await readMock()
    const now = new Date().toISOString()
    if (data.id) {
      // update
      const idx = rows.findIndex((r) => r.id === data.id)
      if (idx === -1) return { data: null, error: { message: 'No encontrada' } }
      rows[idx] = { ...rows[idx], ...data, updated_at: now }
      await writeMock(rows)
      return { data: { id: data.id }, error: null }
    }
    const id =
      globalThis.crypto?.randomUUID?.() || `mock-${Date.now()}-${rows.length}`
    rows.unshift({ id, ...data, created_at: now, updated_at: now })
    await writeMock(rows)
    return { data: { id }, error: null }
  }

  if (data.id) {
    const { id, ...rest } = data
    return db
      .from('cotizaciones')
      .update({ ...rest, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('id')
      .single()
  }

  return db.from('cotizaciones').insert([data]).select('id').single()
}

export async function listCotizaciones() {
  const db = getSupabase()

  if (!db) {
    const rows = await readMock()
    // Devuelve solo el resumen (sin el payload pesado) para la lista.
    return {
      data: rows.map(({ payload, ...summary }) => summary),
      error: null,
    }
  }

  return db
    .from('cotizaciones')
    .select(['id', 'created_at', 'updated_at', 'estado', ...SUMMARY_FIELDS].join(','))
    .order('created_at', { ascending: false })
}

export async function getCotizacion(id) {
  const db = getSupabase()

  if (!db) {
    const rows = await readMock()
    const row = rows.find((r) => r.id === id)
    return { data: row || null, error: row ? null : { message: 'No encontrada' } }
  }

  return db.from('cotizaciones').select('*').eq('id', id).single()
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

// SQL to create the cotizaciones table in Supabase:
/*
CREATE TABLE cotizaciones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente       TEXT,
  proyecto      TEXT,
  atencion      TEXT,
  segmento      TEXT,
  ciudad        TEXT,
  kwp           NUMERIC,
  paneles       INT,
  inversion     NUMERIC,
  roi           NUMERIC,
  ahorro_anual  NUMERIC,
  ahorro_30     NUMERIC,
  kwh_anual     NUMERIC,
  pct_ahorro    NUMERIC,
  estado        TEXT DEFAULT 'borrador',
  payload       JSONB,           -- estado completo de la calc para reabrir
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: only service role can read/write
ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_cotizaciones_created ON cotizaciones (created_at DESC);
*/
