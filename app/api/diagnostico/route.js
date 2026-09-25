import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { getSupabase, createAuditoria } from '@/lib/db'
import { ALL_QUESTIONS, DOCUMENT_CATEGORIES } from '@/lib/diagnostico'
import { clientIp, rateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'

const MAX_TEXT_LEN = 500
const MAX_TEXTAREA_LEN = 3000
const MAX_FILE_BYTES = 15 * 1024 * 1024 // 15 MB
const MAX_FILES_PER_CATEGORY = 5

function safeFileName(name) {
  return name.replace(/[^\w.-]+/g, '_').slice(0, 150)
}

export async function POST(request) {
  // Límite generoso: deja pasar varios envíos legítimos desde una misma red
  // (oficina/hotel compartiendo IP) pero corta el flood automatizado.
  const { allowed } = rateLimit(`diagnostico:${clientIp(request)}`, { max: 20, windowMs: 60 * 60 * 1000 })
  if (!allowed) {
    return NextResponse.json({ error: 'Demasiados envíos. Intenta de nuevo más tarde.' }, { status: 429 })
  }

  let formData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Formato inválido' }, { status: 400 })
  }

  // Campo trampa: invisible para personas, un bot que llene todo el formulario
  // (incluidos los campos ocultos) cae aquí.
  const honeypot = formData.get('sitio_web')
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true, id: randomUUID() })
  }

  const fields = {}
  for (const question of ALL_QUESTIONS) {
    if (question.type === 'chips-multi') {
      const values = formData
        .getAll(question.key)
        .map((v) => String(v).slice(0, MAX_TEXT_LEN))
        .slice(0, 20)
      if (values.length > 0) fields[question.key] = values
    } else {
      const value = formData.get(question.key)
      if (typeof value === 'string' && value.trim().length > 0) {
        const max = question.type === 'textarea' ? MAX_TEXTAREA_LEN : MAX_TEXT_LEN
        fields[question.key] = value.trim().slice(0, max)
      }
    }
  }
  const notas = formData.get('notas')
  if (typeof notas === 'string' && notas.trim().length > 0) {
    fields.notas = notas.trim().slice(0, MAX_TEXTAREA_LEN)
  }

  if (!fields.empresa || !fields.correo) {
    return NextResponse.json({ error: 'Faltan datos obligatorios.' }, { status: 400 })
  }

  const id = randomUUID()
  const db = getSupabase()

  const archivos = []
  if (db) {
    for (const category of DOCUMENT_CATEGORIES) {
      const entries = formData.getAll(`file_${category.key}`).slice(0, MAX_FILES_PER_CATEGORY)
      for (const entry of entries) {
        if (entry instanceof File && entry.size > 0 && entry.size <= MAX_FILE_BYTES) {
          const storagePath = `${id}/${category.key}/${safeFileName(entry.name)}`
          const buffer = Buffer.from(await entry.arrayBuffer())
          const { error: uploadError } = await db.storage
            .from('auditorias')
            .upload(storagePath, buffer, {
              contentType: entry.type || 'application/octet-stream',
              upsert: true,
            })
          if (!uploadError) {
            archivos.push({ categoria: category.key, nombre: entry.name.slice(0, 150), path: storagePath, size: entry.size })
          }
        }
      }
    }
  }

  const row = {
    id,
    empresa: fields.empresa,
    contacto: fields.contacto || null,
    correo: fields.correo,
    telefono: fields.telefono || null,
    tipo_propiedad: fields.tipo_propiedad || null,
    estado: 'nuevo',
    respuestas: fields,
    archivos,
  }

  const { error } = await createAuditoria(row)
  if (error) {
    return NextResponse.json({ error: error.message || 'No se pudo guardar' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id })
}
