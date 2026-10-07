'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const STORAGE_KEY = 'telos-cookie-consent'

function readConsent() {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

function saveConsent(value) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* modo privado o storage bloqueado: la decisión vale solo en esta sesión */
  }
}

/**
 * Google Analytics 4 + banner de cookies.
 * - Sin NEXT_PUBLIC_GA_MEASUREMENT_ID no hace nada (ni banner ni scripts).
 * - GA solo se carga si el visitante pulsa "Aceptar"; hasta entonces no hay
 *   ninguna petición a Google ni cookies de analítica.
 * - Registra clics en WhatsApp, teléfono y correo como eventos.
 */
export default function Analytics() {
  const [consent, setConsent] = useState(undefined) // undefined = aún no leído (evita desajuste de hidratación)

  useEffect(() => {
    setConsent(readConsent())
  }, [])

  useEffect(() => {
    if (!GA_ID || consent !== 'granted') return undefined

    const onClick = (e) => {
      const a = e.target.closest?.('a[href]')
      if (!a || typeof window.gtag !== 'function') return
      const href = a.getAttribute('href') || ''
      let type = null
      if (href.includes('wa.me') || href.includes('api.whatsapp.com')) type = 'whatsapp'
      else if (href.startsWith('tel:')) type = 'telefono'
      else if (href.startsWith('mailto:')) type = 'correo'
      if (type) {
        window.gtag('event', 'contacto_click', { medio: type, pagina: window.location.pathname })
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [consent])

  if (!GA_ID) return null

  const decide = (value) => {
    saveConsent(value)
    setConsent(value)
  }

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}

      {consent === null && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          className="fixed inset-x-3 bottom-3 z-[500] mx-auto max-w-xl rounded-2xl border border-white/12 bg-[#0b1220]/95 p-4 shadow-2xl backdrop-blur sm:p-5"
        >
          <p className="text-[0.82rem] leading-relaxed text-white/70">
            Usamos cookies de analítica (Google Analytics) para entender cómo se usa el sitio y mejorarlo. Solo se
            activan si las aceptas.{' '}
            <Link href="/privacidad" className="text-[#2b8fd4] underline-offset-2 hover:underline">
              Más información
            </Link>
          </p>
          <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => decide('denied')}
              className="h-10 rounded-xl border border-white/15 px-5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/[0.06]"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => decide('granted')}
              className="h-10 rounded-xl bg-telos-green px-5 text-sm font-bold text-black transition-all duration-200 hover:bg-telos-green-light"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
