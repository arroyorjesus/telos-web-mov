'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const selector = '.reveal:not(.in), .reveal-card:not(.in), .reveal-heading:not(.in)'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    )

    const observeAll = () => {
      document.querySelectorAll(selector).forEach((el) => {
        const rect = el.getBoundingClientRect()
        // Already in viewport — add 'in' immediately without waiting for observer
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in')
        } else {
          observer.observe(el)
        }
      })
    }

    // Two RAF cycles to ensure layout is painted before measuring
    let mutation = null
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        observeAll()
        mutation = new MutationObserver(observeAll)
        mutation.observe(document.body, { childList: true, subtree: true })
      })
    })

    return () => {
      cancelAnimationFrame(id)
      observer.disconnect()
      mutation?.disconnect()
    }
  }, [pathname])

  return null
}
