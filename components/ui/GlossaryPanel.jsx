'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { GLOSSARY, GLOSSARY_BY_PAGE, CATEGORY_LABELS, CATEGORY_ORDER } from '@/data/glossary'

/**
 * GlossaryPanel — Glosario contextual inteligente.
 *
 * • Botón flotante fijo (bottom-right), siempre activo.
 * • Detecta la página actual via usePathname() y filtra términos relevantes.
 * • Vista filtrada (términos de la página) → "Explorar glosario completo" → vista completa.
 * • Punto verde en términos que aparecen inline en la página (inlinedOn).
 * • LayoutGroup para transiciones fluidas al cambiar entre vistas.
 * • Se oculta si la ruta no tiene términos (home sin inicio, contacto, etc.).
 *
 * Vive en app/layout.js — una sola instancia para todo el sitio.
 */
export default function GlossaryPanel() {
  const pathname  = usePathname()
  const [open, setOpen]         = useState(false)
  const [showAll, setShowAll]   = useState(false)
  const [openCats, setOpenCats] = useState({})

  // '/' → 'inicio', '/nosotros' → 'nosotros', etc.
  const page      = pathname === '/' ? 'inicio' : (pathname?.split('/').filter(Boolean)[0] ?? '')
  const pageTerms = GLOSSARY_BY_PAGE(page)
  const terms     = showAll ? GLOSSARY : pageTerms

  // Reset completo al navegar
  useEffect(() => {
    setOpen(false)
    setOpenCats({})
    setShowAll(false)
  }, [pathname])

  // Escape para cerrar
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // No renderizar si la ruta no tiene términos
  if (!pageTerms.length) return null

  /* ── Agrupar por categoría ── */
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const catTerms = terms.filter((t) => t.category === cat)
    if (catTerms.length) acc[cat] = catTerms
    return acc
  }, {})

  const isCatOpen = (cat) => openCats[cat] !== false
  const toggleCat = (cat) =>
    setOpenCats((prev) => ({ ...prev, [cat]: !isCatOpen(cat) }))

  const counterLabel = showAll
    ? `${GLOSSARY.length} términos`
    : `${pageTerms.length} relevantes en esta sección`

  /* ── Handlers de vista ── */
  const handleShowAll = () => { setShowAll(true);  setOpenCats({}) }
  const handleShowPage = () => { setShowAll(false); setOpenCats({}) }

  return (
    <>
      {/* ── Panel ───────────────────────────────────────── */}
      <div
        className={`gloss-panel${open ? ' gloss-open' : ''}`}
        role="dialog"
        aria-label="Glosario de términos técnicos"
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="gloss-panel-header">
          <div className="gloss-panel-header-icon" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
          </div>
          <span className="gloss-panel-title">Glosario estratégico</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={counterLabel}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.2 }}
              className="gloss-panel-count"
            >
              {counterLabel}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Body */}
        <div className="gloss-panel-body">
          <LayoutGroup id="glossary-panel">

            {/* Categorías */}
            {Object.entries(grouped).map(([cat, catTerms]) => (
              <motion.div
                key={`${cat}-${showAll ? 'all' : page}`}
                layout="position"
                className="gloss-cat"
              >
                <button
                  className="gloss-cat-btn"
                  onClick={() => toggleCat(cat)}
                  aria-expanded={isCatOpen(cat)}
                >
                  <span className="gloss-cat-label">{CATEGORY_LABELS[cat]}</span>
                  <span className="gloss-cat-count-badge">{catTerms.length}</span>
                  <svg
                    width="10" height="10" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"
                    style={{
                      marginLeft: 'auto',
                      flexShrink: 0,
                      opacity: 0.35,
                      transition: 'transform 220ms ease',
                      transform: isCatOpen(cat) ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isCatOpen(cat) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="gloss-cat-terms">
                        {catTerms.map((t) => {
                          const isInlined = t.inlinedOn?.includes(page)
                          return (
                            <div key={t.id} className="gloss-item">
                              <div className="gloss-item-head">
                                {isInlined && (
                                  <span
                                    className="gloss-inline-dot"
                                    title="Término referenciado en esta página"
                                    aria-label="Referenciado en esta página"
                                  />
                                )}
                                <span className="gloss-term">{t.term}</span>
                                {t.fullTerm !== t.term && (
                                  <span className="gloss-full-term">{t.fullTerm}</span>
                                )}
                              </div>
                              <p className="gloss-def">{t.definition}</p>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Botón explorar / volver */}
            <motion.div layout="position" className="gloss-explore-wrap">
              <AnimatePresence mode="wait">
                {!showAll ? (
                  <motion.button
                    key="show-all"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="gloss-explore-btn"
                    onClick={handleShowAll}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    Explorar glosario completo
                  </motion.button>
                ) : (
                  <motion.button
                    key="show-page"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="gloss-explore-btn gloss-explore-back"
                    onClick={handleShowPage}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      strokeLinejoin="round" aria-hidden="true">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                    Solo términos de esta sección
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

          </LayoutGroup>
        </div>
      </div>

      {/* ── Botón flotante ──────────────────────────────── */}
      <button
        className={`gloss-btn${open ? ' gloss-btn-active' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        title="Glosario técnico"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
        Glosario
        <span className="gloss-btn-badge">{pageTerms.length}</span>
      </button>
    </>
  )
}
