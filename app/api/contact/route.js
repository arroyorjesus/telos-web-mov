import { NextResponse } from 'next/server'
import { contactSchema, sanitizeContactData } from '@/lib/validation'
import { rateLimit, clientIp } from '@/lib/rateLimit'
import { saveLead } from '@/lib/db'
import { buildInternalEmail, buildConfirmationEmail, sendEmail } from '@/lib/email'
import { hashString } from '@/lib/utils'

export async function POST(request) {
  try {
    // Rate limiting
    const ip = clientIp(request)
    const rl = rateLimit(`contact:${ip}`, { max: 5, windowMs: 15 * 60 * 1000 })
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rl.retryAfterMs || 0) / 1000)),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }

    // Parse body
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Formato de solicitud inválido.' }, { status: 400 })
    }

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true }) // Silently reject bots
    }

    // Validate
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Datos inválidos.', fields: fieldErrors },
        { status: 422 }
      )
    }

    // Sanitize
    const clean = sanitizeContactData(parsed.data)

    // Enrich with metadata
    const leadData = {
      ...clean,
      source: 'telos.com.mx',
      utm_source: request.headers.get('referer') || null,
      utm_medium: null,
      utm_campaign: null,
      ip_hash: ip !== 'unknown' ? hashString(ip) : null,
      user_agent: request.headers.get('user-agent')?.slice(0, 200) || null,
    }

    // Save to DB (non-blocking on error)
    let savedId = null
    try {
      const { data, error } = await saveLead(leadData)
      if (!error && data) savedId = data.id
    } catch (dbErr) {
      // Log but don't fail the request
      if (process.env.NODE_ENV !== 'production') {
        console.error('[DB error]', dbErr)
      }
    }

    // Send emails (non-blocking on error)
    const emailTo = process.env.EMAIL_TO || 'contacto@telos.com.mx'
    try {
      const { subject: internalSubject, html: internalHtml } = buildInternalEmail({
        ...leadData,
        id: savedId,
      })
      await sendEmail({ to: emailTo, subject: internalSubject, html: internalHtml })
    } catch (emailErr) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Email internal error]', emailErr)
      }
    }

    try {
      const { subject: confirmSubject, html: confirmHtml } = buildConfirmationEmail(clean)
      await sendEmail({ to: clean.email, subject: confirmSubject, html: confirmHtml })
    } catch (emailErr) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Email confirmation error]', emailErr)
      }
    }

    return NextResponse.json({ success: true, id: savedId }, { status: 200 })
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[Contact API error]', err)
    }
    return NextResponse.json(
      { error: 'Error interno. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json({ error: 'Método no permitido.' }, { status: 405 })
}
