#!/usr/bin/env node
// Crea (si no existe) el bucket privado de Storage "auditorias" para los
// archivos subidos desde /diagnostico (facturas, excel, fotos).
//
// Uso:
//   node --env-file=.env.local scripts/setup-supabase-storage.mjs

import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY en el entorno.')
  process.exit(1)
}

const supabase = createClient(url, key)

const { data: buckets, error: listError } = await supabase.storage.listBuckets()
if (listError) {
  console.error('No se pudo listar buckets:', listError.message)
  process.exit(1)
}

if (buckets.some((b) => b.name === 'auditorias')) {
  console.log('El bucket "auditorias" ya existe. Nada que hacer.')
  process.exit(0)
}

const { error } = await supabase.storage.createBucket('auditorias', {
  public: false,
  fileSizeLimit: '20MB',
})

if (error) {
  console.error('No se pudo crear el bucket:', error.message)
  process.exit(1)
}

console.log('Bucket "auditorias" creado correctamente (privado).')
