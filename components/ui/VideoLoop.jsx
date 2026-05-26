'use client'

/**
 * VideoLoop — video de fondo con loop infinito garantizado.
 *
 * Fix principal: escuchar `canplay` para forzar play cuando el browser
 * tiene suficiente buffer. iOS Safari y algunos Chromium no respetan
 * el atributo `autoPlay` solo — necesitan el call explícito a play().
 */

import { useRef, useEffect } from 'react'

export default function VideoLoop({ src, className, style }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const play = () => video.play().catch(() => {})

    // El browser tiene suficiente buffer — arranca
    const onCanPlay = () => play()

    // Terminó — reinicia (fix iOS Safari que ignora loop en bajo consumo)
    const onEnded = () => {
      video.currentTime = 0
      play()
    }

    // Vuelves al tab — reanuda si se pausó
    const onVisibility = () => {
      if (!document.hidden && video.paused) play()
    }

    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('ended', onEnded)
    document.addEventListener('visibilitychange', onVisibility)

    // Intento inmediato — por si el video ya está en cache
    play()

    return () => {
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('ended', onEnded)
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
