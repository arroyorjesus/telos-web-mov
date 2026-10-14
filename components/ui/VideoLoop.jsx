'use client'

/**
 * VideoLoop — video de fondo con loop infinito garantizado.
 *
 * Carga diferida: el video NO se descarga hasta que la tarjeta está a punto de
 * entrar en pantalla (300 px antes), y se pausa al salir. Antes los 4 videos
 * de la portada se bajaban completos (~4.5 MB) aunque nadie los viera.
 *
 * Fix de iOS Safari: escuchar `canplay` y llamar play() explícito, porque
 * ignora `autoPlay` solo; y reiniciar en `ended` por el modo de bajo consumo.
 */

import { useRef, useEffect, useState } from 'react'

export default function VideoLoop({ src, className, style }) {
  const ref = useRef(null)
  const visibleRef = useRef(false)
  const [active, setActive] = useState(false) // ya se pidió descargar

  useEffect(() => {
    const video = ref.current
    if (!video) return undefined

    const play = () => {
      if (visibleRef.current) video.play().catch(() => {})
    }

    // El browser tiene suficiente buffer — arranca (si está a la vista)
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

    let observer = null
    if (typeof IntersectionObserver === 'undefined') {
      // Navegador muy viejo: comportamiento anterior (carga y reproduce).
      visibleRef.current = true
      setActive(true)
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting
          if (entry.isIntersecting) {
            setActive(true) // dispara la descarga la primera vez
            play()
          } else {
            video.pause() // fuera de pantalla: ahorra CPU y batería
          }
        },
        { rootMargin: '300px 0px' }
      )
      observer.observe(video)
    }

    return () => {
      observer?.disconnect()
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('ended', onEnded)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <video
      ref={ref}
      src={active ? src : undefined}
      autoPlay
      muted
      loop
      playsInline
      preload={active ? 'auto' : 'none'}
      className={className}
      style={style}
      aria-hidden="true"
    />
  )
}
