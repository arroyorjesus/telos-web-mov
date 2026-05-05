const LABELS = {
  tipo_operacion: {
    hotel: 'Hotel / Hospitalidad',
    industria: 'Industria / Manufactura',
    corporativo: 'Corporativo / Oficinas',
    desarrollo: 'Desarrollo / Parque comercial',
    deportivo: 'Centro deportivo / Fitness',
    residencial: 'Residencial alto consumo',
    otro: 'Otro',
  },
  principal_consumo: {
    electricidad: 'Electricidad',
    gas: 'Gas térmico',
    agua: 'Agua',
    todos: 'Los tres (agua, gas, electricidad)',
  },
  gasto_mensual: {
    menos_50k: 'Menos de $50,000 MXN',
    '50k_150k': '$50,000 – $150,000 MXN',
    '150k_500k': '$150,000 – $500,000 MXN',
    mas_500k: 'Más de $500,000 MXN',
    no_se: 'No lo sé',
  },
  objetivo: {
    reducir_factura: 'Reducir factura energética',
    resolver_desabasto: 'Resolver desabasto de agua',
    modernizar: 'Modernizar equipos',
    mejorar_roi: 'Mejorar ROI operativo',
    normatividad: 'Cumplir normatividad',
    otro: 'Otro',
  },
}

const label = (map, key) => (key && map[key]) || key || '—'

export function buildInternalEmail(data) {
  const subject = `Nuevo diagnóstico TELOS: ${data.empresa} (${data.nombre})`

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
  body { font-family: -apple-system, Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .container { background: white; border-radius: 8px; padding: 32px; max-width: 600px; margin: 0 auto; }
  h1 { color: #111; font-size: 20px; margin-bottom: 8px; }
  .badge { display: inline-block; background: #dcfce7; color: #16a34a; border-radius: 4px; padding: 3px 10px; font-size: 12px; font-weight: 600; margin-bottom: 24px; }
  .field { border-bottom: 1px solid #f0f0f0; padding: 12px 0; }
  .field:last-child { border-bottom: none; }
  .label { color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
  .value { color: #111; font-size: 15px; font-weight: 500; }
  .mensaje { background: #f9fafb; border-radius: 6px; padding: 16px; margin-top: 4px; color: #374151; font-style: italic; }
  .footer { color: #9ca3af; font-size: 12px; margin-top: 24px; border-top: 1px solid #f0f0f0; padding-top: 16px; }
  .cta { display: inline-block; background: #22c55e; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 20px; }
</style>
</head>
<body>
<div class="container">
  <h1>Nuevo diagnóstico energético</h1>
  <span class="badge">Lead calificado · TELOS.com.mx</span>

  <div class="field">
    <div class="label">Nombre</div>
    <div class="value">${data.nombre}</div>
  </div>
  <div class="field">
    <div class="label">Empresa</div>
    <div class="value">${data.empresa}</div>
  </div>
  <div class="field">
    <div class="label">Email</div>
    <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
  </div>
  <div class="field">
    <div class="label">Teléfono / WhatsApp</div>
    <div class="value">${data.telefono}</div>
  </div>
  ${data.ciudad ? `
  <div class="field">
    <div class="label">Ciudad / Estado</div>
    <div class="value">${data.ciudad}</div>
  </div>` : ''}
  ${data.tipo_operacion ? `
  <div class="field">
    <div class="label">Tipo de operación</div>
    <div class="value">${label(LABELS.tipo_operacion, data.tipo_operacion)}</div>
  </div>` : ''}
  ${data.principal_consumo ? `
  <div class="field">
    <div class="label">Principal consumo</div>
    <div class="value">${label(LABELS.principal_consumo, data.principal_consumo)}</div>
  </div>` : ''}
  ${data.gasto_mensual ? `
  <div class="field">
    <div class="label">Gasto mensual aproximado</div>
    <div class="value">${label(LABELS.gasto_mensual, data.gasto_mensual)}</div>
  </div>` : ''}
  ${data.objetivo ? `
  <div class="field">
    <div class="label">Principal objetivo</div>
    <div class="value">${label(LABELS.objetivo, data.objetivo)}</div>
  </div>` : ''}
  ${data.mensaje ? `
  <div class="field">
    <div class="label">Mensaje</div>
    <div class="mensaje">${data.mensaje}</div>
  </div>` : ''}

  <a href="https://wa.me/525544517101?text=Hola%20${encodeURIComponent(data.nombre)}%2C%20recib%C3%AD%20tu%20solicitud%20de%20diagn%C3%B3stico%20energ%C3%A9tico%20para%20${encodeURIComponent(data.empresa)}." class="cta">Responder por WhatsApp</a>

  <div class="footer">
    <p>Lead ID: ${data.id || 'N/A'} · Fuente: ${data.source || 'telos.com.mx'} · ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</p>
  </div>
</div>
</body>
</html>`

  return { subject, html }
}

export function buildConfirmationEmail(data) {
  const subject = `Recibimos tu solicitud, ${data.nombre.split(' ')[0]} — TELOS`

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<style>
  body { font-family: -apple-system, Arial, sans-serif; background: #0a0a0a; margin: 0; padding: 20px; }
  .container { background: #141414; border: 1px solid #1e1e1e; border-radius: 12px; padding: 40px; max-width: 560px; margin: 0 auto; }
  h1 { color: #f9fafb; font-size: 22px; margin-bottom: 8px; }
  p { color: #9ca3af; font-size: 15px; line-height: 1.6; }
  .highlight { color: #22c55e; font-weight: 600; }
  .divider { border: none; border-top: 1px solid #1e1e1e; margin: 24px 0; }
  .step { display: flex; gap: 12px; margin-bottom: 16px; }
  .step-num { background: #1e1e1e; color: #22c55e; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; }
  .step-text { color: #9ca3af; font-size: 14px; padding-top: 4px; }
  .cta { display: inline-block; background: #22c55e; color: #0a0a0a; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 15px; margin-top: 8px; }
  .footer { color: #4b5563; font-size: 12px; margin-top: 32px; border-top: 1px solid #1e1e1e; padding-top: 20px; }
</style>
</head>
<body>
<div class="container">
  <h1>Hola, ${data.nombre.split(' ')[0]}.</h1>
  <p>Recibimos tu solicitud de diagnóstico energético para <span class="highlight">${data.empresa}</span>.</p>
  <p style="margin-top: 12px;">Te contactaremos en <span class="highlight">menos de 24 horas hábiles</span> para coordinar los detalles.</p>

  <hr class="divider">
  <p style="color: #e5e7eb; font-weight: 600; margin-bottom: 16px;">¿Qué sigue?</p>

  <div class="step">
    <div class="step-num">01</div>
    <div class="step-text">Revisamos tu solicitud y preparamos preguntas específicas sobre tu operación.</div>
  </div>
  <div class="step">
    <div class="step-num">02</div>
    <div class="step-text">Te contactamos por email o WhatsApp para agendar una llamada inicial.</div>
  </div>
  <div class="step">
    <div class="step-num">03</div>
    <div class="step-text">Realizamos el diagnóstico técnico gratuito en tu instalación.</div>
  </div>

  <hr class="divider">
  <p>Si prefieres contactarnos directamente:</p>
  <a href="https://wa.me/525544517101?text=Hola%2C%20acabo%20de%20enviar%20mi%20solicitud%20de%20diagn%C3%B3stico%20para%20${encodeURIComponent(data.empresa)}" class="cta">WhatsApp directo</a>

  <div class="footer">
    <p>TELOS · Eficiencia energética integral · contacto@telos.com.mx</p>
    <p style="margin-top: 4px;">Pedregal 44, PH. Lomas de Chapultepec, CDMX</p>
    <p style="margin-top: 8px; color: #374151;">No respondas a este email. Escríbenos directamente a contacto@telos.com.mx</p>
  </div>
</div>
</body>
</html>`

  return { subject, html }
}

export async function sendEmail({ to, subject, html }) {
  const provider = process.env.EMAIL_PROVIDER || 'resend'

  if (provider === 'resend') {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    return resend.emails.send({
      from: process.env.EMAIL_FROM || 'TELOS <noreply@telos.com.mx>',
      to,
      subject,
      html,
    })
  }

  if (provider === 'nodemailer') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const nodemailer = await import(/* webpackIgnore: true */ 'nodemailer').catch(() => null)
    if (!nodemailer) throw new Error('nodemailer not installed. Run: npm install nodemailer')
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    return transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    })
  }

  // Log only in development if no provider
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Email mock]', { to, subject })
  }

  return { id: 'mock' }
}
