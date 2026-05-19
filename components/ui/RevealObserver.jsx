'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    // Wait for hydration to complete by checking if interactive elements are ready
    const startObserving = () => {
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

      const selector = '.reveal:not(.in), .reveal-card:not(.in), .reveal-heading:not(.in)'
      const observeAll = () => {
        document.querySelectorAll(selector).forEach((el) => observer.observe(el))
      }

      observeAll()

      const mutation = new MutationObserver(() => observeAll())
      mutation.observe(document.body, { childList: true, subtree: true })

      return () => {
        observer.disconnect()
        mutation.disconnect()
      }
    }

    // Use multiple RAF to ensure we're well after hydration
    let rafId1 = requestAnimationFrame(() => {
      let rafId2 = requestAnimationFrame(() => {
        startObserving()
      })
    })

    return () => {
      cancelAnimationFrame(rafId1)
    }
  }, [pathname])

  return null
}
