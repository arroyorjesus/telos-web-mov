'use client'

import { useEffect, useRef } from 'react'

export default function Reveal({
  children,
  className = 'reveal',
  style,
  as: Tag = 'div',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -28px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}
