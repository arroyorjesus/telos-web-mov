import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'TELOS — Eficiencia energética integral para empresas en México'
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
          background: 'linear-gradient(135deg, #021829 0%, #04243d 60%, #0a3a5c 100%)',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Left accent bar */}
        <div style={{ position: 'absolute', left: 80, top: 80, width: 4, height: 470, background: 'linear-gradient(180deg, #0d5c91, #1a7bc9)', borderRadius: 2 }} />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 60, marginLeft: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: '#0d5c91', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: 32, fontWeight: 900, color: 'white', letterSpacing: 4 }}>TELOS</span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 32 }}>
          <span style={{ fontSize: 60, fontWeight: 800, color: 'white', letterSpacing: -1, lineHeight: 1.1 }}>
            Infraestructura energética
          </span>
          <span style={{ fontSize: 60, fontWeight: 800, color: 'white', letterSpacing: -1, lineHeight: 1.1 }}>
            para operaciones que
          </span>
          <span style={{ fontSize: 60, fontWeight: 800, color: '#4aabee', letterSpacing: -1, lineHeight: 1.1 }}>
            no pueden fallar.
          </span>
        </div>

        {/* Subline */}
        <div style={{ marginLeft: 32, marginTop: 28, fontSize: 22, color: 'rgba(255,255,255,0.55)' }}>
          Electricidad · Gas térmico · Agua · México · Desde 2017
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 16, marginTop: 32, marginLeft: 32 }}>
          {[
            { label: '150+ Proyectos', color: '#0d5c91' },
            { label: 'Payback ≤ 36 meses', color: '#0d5c91' },
            { label: '2,195+ tCO₂e', color: '#2d802a' },
          ].map(({ label, color }) => (
            <div key={label} style={{
              padding: '12px 20px',
              background: `${color}55`,
              border: `1px solid ${color}99`,
              borderRadius: 10,
              color: 'white',
              fontSize: 18,
              fontWeight: 700,
            }}>
              {label}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ position: 'absolute', bottom: 40, right: 80, fontSize: 18, color: 'rgba(255,255,255,0.35)' }}>
          telos.com.mx
        </div>
      </div>
    ),
    { ...size }
  )
}
