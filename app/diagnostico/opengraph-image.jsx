import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Diagnóstico energético gratuito — TELOS'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d5c91 0%, #0a2540 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '80px',
        }}
      >
        <span style={{ fontSize: 34, fontWeight: 900, color: 'white', letterSpacing: 4, marginBottom: 36 }}>
          TELOS
        </span>

        <span
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: 'white',
            letterSpacing: -1,
            lineHeight: 1.1,
            textAlign: 'center',
          }}
        >
          Diagnóstico energético
        </span>

        <span
          style={{
            fontSize: 26,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 28,
            maxWidth: 820,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Cuéntanos cómo opera tu propiedad y te preparamos una proyección de ahorro en
          electricidad, agua y gas.
        </span>

        <div style={{ display: 'flex', gap: 16, marginTop: 44 }}>
          {['⏱️ ~5 minutos', '📩 Respuesta en 24–48 h'].map((label) => (
            <div
              key={label}
              style={{
                padding: '12px 22px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 10,
                color: 'white',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: 40, fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>
          telos.com.mx/diagnostico
        </div>
      </div>
    ),
    { ...size }
  )
}
