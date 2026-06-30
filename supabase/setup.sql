-- ════════════════════════════════════════════════════════════════════════════
-- TELOS — Setup de base de datos (Supabase)
-- Pega TODO este archivo en: Supabase → SQL Editor → New query → Run
-- Crea las 2 tablas: leads (formulario de contacto) y cotizaciones (calculadora).
-- ════════════════════════════════════════════════════════════════════════════

-- ─── Tabla LEADS (formulario de contacto de telos.com.mx) ────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre        TEXT NOT NULL,
  email         TEXT NOT NULL,
  telefono      TEXT NOT NULL,
  empresa       TEXT NOT NULL,
  ciudad        TEXT,
  tipo_operacion    TEXT,
  principal_consumo TEXT,
  gasto_mensual     TEXT,
  objetivo      TEXT,
  mensaje       TEXT,
  source        TEXT DEFAULT 'telos.com.mx',
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  ip_hash       TEXT,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- Sin políticas: solo la service_role key (backend) puede leer/escribir. Correcto.


-- ─── Tabla COTIZACIONES (calculadora solar / CRM) ────────────────────────────
CREATE TABLE IF NOT EXISTS cotizaciones (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

ALTER TABLE cotizaciones ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_cotizaciones_created ON cotizaciones (created_at DESC);

-- ✅ Listo. Deberías ver "Success. No rows returned".
