'use client'

import { useMemo, useState } from 'react'
import { FileDropzone } from '@/components/diagnostico/FileDropzone'
import { QuestionField } from '@/components/diagnostico/QuestionField'
import { StepIndicator } from '@/components/diagnostico/StepIndicator'
import { DOCUMENT_CATEGORIES, SECTIONS } from '@/lib/diagnostico'

// Paleta clara, aislada del tema oscuro del resto del sitio vía variables CSS
// inline — así no choca con las clases de Tailwind usadas en telos.com.mx.
const theme = {
  '--color-primary': '#094c88',
  '--color-primary-hover': '#073c6b',
  '--color-primary-light': '#e8eff6',
  '--color-navy': '#0f172a',
  '--color-muted': '#475569',
  '--color-border': '#e2e8f0',
  background: '#f3f5f8',
  color: '#0f172a',
}

const primaryButtonClass =
  'inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg bg-[var(--color-primary)] px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[var(--color-primary)]'

const secondaryButtonClass =
  'inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-lg border border-[var(--color-border)] px-5 text-sm font-semibold text-[var(--color-muted)] transition-colors duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-navy)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40'

const textareaClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-3 text-[15px] text-[var(--color-navy)] outline-none transition-colors duration-200 placeholder:text-[var(--color-muted)]/60 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30'

export default function DiagnosticoPage() {
  const [started, setStarted] = useState(false)
  const [values, setValues] = useState({})
  const [stepIndex, setStepIndex] = useState(0)
  const [files, setFiles] = useState({})
  const [notas, setNotas] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const visibleSections = useMemo(
    () => SECTIONS.filter((section) => !section.showIf || section.showIf(values)),
    [values]
  )

  // Paso 2 = subir documentos/fotos (justo después de "Datos generales").
  // El resto de las secciones ocupan las demás posiciones, en orden.
  const totalSteps = visibleSections.length + 1
  const currentIndex = Math.min(stepIndex, totalSteps - 1)
  const isUploadStep = currentIndex === 1
  const currentSection = isUploadStep ? null : visibleSections[currentIndex > 1 ? currentIndex - 1 : currentIndex]
  const isLastStep = currentIndex === totalSteps - 1

  const visibleQuestions = useMemo(() => {
    if (!currentSection) return []
    return currentSection.questions.filter((q) => !q.showIf || q.showIf(values))
  }, [currentSection, values])

  const canAdvance = useMemo(() => {
    if (!currentSection) return true
    return visibleQuestions
      .filter((q) => q.required)
      .every((q) => {
        const v = values[q.key]
        return Array.isArray(v) ? v.length > 0 : Boolean(v && v.trim().length > 0)
      })
  }, [currentSection, visibleQuestions, values])

  const totalFiles = useMemo(
    () => Object.values(files).reduce((sum, list) => sum + list.length, 0),
    [files]
  )

  function updateValue(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)
    try {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v))
        } else if (value) {
          formData.append(key, value)
        }
      })
      if (notas.trim()) formData.append('notas', notas.trim())
      formData.append('sitio_web', honeypot)

      Object.entries(files).forEach(([category, list]) => {
        list.forEach((file) => formData.append(`file_${category}`, file))
      })

      const res = await fetch('/api/diagnostico', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('No se pudo enviar el formulario.')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[100] overflow-auto" style={theme}>
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-10 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)] text-2xl text-white">
              ✓
            </div>
            <h1 className="text-2xl font-semibold text-[var(--color-navy)]">¡Listo, recibimos tu información!</h1>
            <p className="text-[var(--color-muted)]">
              Nuestro equipo va a revisar tus respuestas y preparar tu diagnóstico. Si hace falta algo más, te
              contactaremos directamente.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-auto" style={theme}>
      <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-4 py-10 sm:px-6">
        <header
          className="rounded-2xl overflow-hidden shadow-sm flex flex-col items-center gap-3 text-center px-6 py-8 sm:px-10 sm:py-10"
          style={{ background: 'linear-gradient(135deg, #0d5c91 0%, #0a2540 100%)' }}
        >
          <img src="/logo-blanco.png" alt="TELOS" style={{ width: '150px', height: 'auto' }} />
          <h1 className="text-xl sm:text-2xl font-bold text-white">Diagnóstico energético</h1>
          {!started && (
            <p className="text-white/80 text-sm max-w-sm">
              Cuéntanos cómo opera tu propiedad y te preparamos una proyección de ahorro en electricidad, agua y
              gas.
            </p>
          )}
        </header>

        {!started ? (
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm sm:p-8 flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">⏱️</span>
              <p className="text-sm text-[var(--color-navy)]">
                <strong>~5 minutos</strong> — preguntas sobre tu operación y consumos de energía, agua y gas.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">📎</span>
              <p className="text-sm text-[var(--color-navy)]">
                <strong>Tus facturas de CFE, agua y gas son clave</strong> — con ellas calculamos tu ahorro real, no
                solo un estimado. Súbelas cuando lleguemos a ese paso.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">📩</span>
              <p className="text-sm text-[var(--color-navy)]">
                Nuestro equipo revisa tus respuestas y te contacta en <strong>24–48 horas</strong> con tu
                diagnóstico.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStarted(true)}
              className={`${primaryButtonClass} mt-2 w-full sm:w-auto self-center px-8`}
            >
              Comenzar diagnóstico →
            </button>
          </div>
        ) : (
        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm sm:p-8">
          <input
            type="text"
            name="sitio_web"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
          />
          <StepIndicator current={currentIndex + 1} total={totalSteps} />

          {isUploadStep && (
            <section className="mt-6 flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-navy)]">Documentos y fotos</h2>
                <p className="text-sm text-[var(--color-muted)]">
                  Esta es la parte más importante: tus facturas de CFE, agua y gas (o un Excel de consumos) son lo
                  que nos permite calcular tu ahorro real, no solo un estimado. Si no las tienes a la mano en este
                  momento, puedes continuar y enviarlas después por correo.
                </p>
              </div>

              {DOCUMENT_CATEGORIES.map((category) => (
                <FileDropzone
                  key={category.key}
                  label={category.label}
                  helper={category.helper}
                  accept={category.accept}
                  files={files[category.key] ?? []}
                  onChange={(next) => setFiles((prev) => ({ ...prev, [category.key]: next }))}
                />
              ))}

              {totalFiles > 0 && (
                <p className="text-xs text-[var(--color-muted)]">{totalFiles} archivo(s) listo(s) para enviar.</p>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStepIndex(Math.max(0, currentIndex - 1))}
                  className={secondaryButtonClass}
                >
                  Atrás
                </button>
                <button type="button" onClick={() => setStepIndex(currentIndex + 1)} className={primaryButtonClass}>
                  Siguiente
                </button>
              </div>
            </section>
          )}

          {!isUploadStep && currentSection && (
            <section className="mt-6 flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-semibold text-[var(--color-navy)]">{currentSection.title}</h2>
                {currentSection.subtitle && (
                  <p className="text-sm text-[var(--color-muted)]">{currentSection.subtitle}</p>
                )}
              </div>

              {visibleQuestions.map((question) => (
                <QuestionField key={question.key} question={question} values={values} onChange={updateValue} />
              ))}

              {isLastStep && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-[var(--color-navy)]">
                    ¿Algo más que debamos saber sobre tus instalaciones?
                  </span>
                  <textarea
                    className={textareaClass}
                    rows={3}
                    placeholder="Opcional"
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                  />
                </div>
              )}

              {isLastStep && error && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              )}

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStepIndex(Math.max(0, currentIndex - 1))}
                  className={secondaryButtonClass}
                >
                  Atrás
                </button>
                {isLastStep ? (
                  <button type="button" onClick={handleSubmit} disabled={submitting || !canAdvance} className={primaryButtonClass}>
                    {submitting ? 'Enviando...' : 'Enviar'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setStepIndex(currentIndex + 1)}
                    disabled={!canAdvance}
                    className={primaryButtonClass}
                  >
                    Siguiente
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
        )}
      </main>
    </div>
  )
}
