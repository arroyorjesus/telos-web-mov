'use client'

/**
 * VideoLoop — video de fondo con loop infinito garantizado.
 *
 * Problema: iOS Safari y algunos Chromium ignoran el atributo `loop`
 * cuando el video está en bajo consumo, la pestaña pierde foco, o el
 * buffer se interrumpe entre iteraciones.
 *
 * Solución:
 * 1. `loop` nativo como fallback para la mayoría de browsers.
 * 2. `onEnded` → reset manual a 0 y replay (cubre iOS Safari).
 * 3. `visibilitychange` → reanuda si el video se pausó al volver al tab.
 * 4. `preload="auto"` → el video está en buffer antes de reproducirse.
 * 5. `onSuspend` → fuerza play si el browser suspende la carga.
 */

import { useRef, useEffect } from 'react'

export default function VideoLoop({ src, className, style }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const play = () => video.play().catch(() => {})

    // Cuando termina — reinicia inmediatamente (iOS Safari fix)
    const onEnded = () => {
      video.currentTime = 0
      play()
    }

    // Cuando el tab vuelve a estar visible — reanuda si se pausó
    const onVisibility = () => {
      if (!document.hidden && video.paused) play()
    }

    // Si el browser suspende la carga — fuerza play
    const onSuspend = () => play()

    video.addEventListener('ended', onEnded)
    video.addEventListener('suspend', onSuspend)
    document.addEventListener('visibilitychange', onVisibility)

    // Intento inicial de play (necesario en algunos browsers móviles)
    play()

    return () => {
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('suspend', onSuspend)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
      style={style}
      aria-hidden="true"
    />
  )
}
