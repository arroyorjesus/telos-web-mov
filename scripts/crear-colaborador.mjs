#!/usr/bin/env node
// Crea o actualiza un colaborador con acceso al panel /auditorias.
// La contraseña se hashea localmente (scrypt) — nunca se guarda en texto plano
// ni se imprime en la salida.
//
// Uso:
//   node --env-file=.env.local scripts/crear-colaborador.mjs "correo@telos.com.mx" "contraseña" "Nombre"

import { createClient } from '@supabase/supabase-js'
import { randomBytes, scryptSync } from 'crypto'

const [, , email, password, nombre] = process.argv

if (!email || !password) {
  console.error('Uso: node --env-file=.env.local scripts/crear-colaborador.mjs "correo@telos.com.mx" "contraseña" "Nombre"')
  process.exit(1)
}
if (password.length < 8) {
  console.error('La contraseña debe tener al menos 8 caracteres.')
  process.exit(1)
}

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY en el entorno.')
  process.exit(1)
}

const salt = randomBytes(16).toString('hex')
const hash = scryptSync(password, salt, 64).toString('hex')
const password_hash = `${salt}:${hash}`

const supabase = createClient(url, key)
const { error } = await supabase
  .from('colaboradores')
  .upsert(
    { email: email.toLowerCase().trim(), password_hash, nombre: nombre || email, activo: true },
    { onConflict: 'email' }
  )

if (error) {
  console.error('No se pudo guardar el colaborador:', error.message)
  process.exit(1)
}

console.log(`Colaborador "${email}" listo. Ya puede entrar en /auditorias/login.`)
