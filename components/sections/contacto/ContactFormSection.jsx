'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '@/lib/validation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MotionWrapper from '@/components/ui/MotionWrapper'

const SELECT_OPTIONS = {
  tipo_operacion: [
    { value: '', label: 'Selecciona tipo de operación' },
    { value: 'hotel', label: 'Hotel / Hospitalidad' },
    { value: 'industria', label: 'Industria / Manufactura' },
    { value: 'corporativo', label: 'Corporativo / Oficinas' },
    { value: 'desarrollo', label: 'Desarrollo / Parque comercial' },
    { value: 'deportivo', label: 'Centro deportivo / Fitness' },
    { value: 'residencial', label: 'Residencial alto consumo' },
    { value: 'otro', label: 'Otro' },
  ],
  principal_consumo: [
    { value: '', label: 'Principal consumo energético' },
    { value: 'electricidad', label: 'Electricidad (CFE)' },
    { value: 'gas', label: 'Gas térmico' },
    { value: 'agua', label: 'Agua' },
    { value: 'todos', label: 'Los tres (agua, gas, electricidad)' },
  ],
  gasto_mensual: [
    { value: '', label: 'Gasto mensual aproximado' },
    { value: 'menos_50k', label: 'Menos de $50,000 MXN' },
    { value: '50k_150k', label: '$50,000 – $150,000 MXN' },
    { value: '150k_500k', label: '$150,000 – $500,000 MXN' },
    { value: 'mas_500k', label: 'Más de $500,000 MXN' },
    { value: 'no_se', label: 'No lo sé' },
  ],
  objetivo: [
    { value: '', label: 'Principal objetivo' },
    { value: 'reducir_factura', label: 'Reducir factura energética' },
    { value: 'resolver_desabasto', label: 'Resolver desabasto de agua' },
    { value: 'modernizar', label: 'Modernizar equipos' },
    { value: 'mejorar_roi', label: 'Mejorar ROI operativo' },
    { value: 'normatividad', label: 'Cumplir normatividad' },
    { value: 'otro', label: 'Otro' },
  ],
}

function FormField({ label, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
        {label} {required && <span className="text-telos-green">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-400 mt-0.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const inputClass = (hasError) =>
  `w-full h-11 px-4 text-sm text-white border rounded-xl outline-none transition-all duration-200 placeholder:text-white/30 [&>option]:text-slate-900 ${
    hasError
      ? 'border-red-500/40 focus:border-red-500/60 bg-red-500/5'
      : 'border-white/12 focus:border-[#0d5c91]/70 hover:border-white/20 bg-white/[0.06]'
  }`

export default function ContactFormSection() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: '', email: '', telefono: '', empresa: '',
      ciudad: '', tipo_operacion: '', principal_consumo: '',
      gasto_mensual: '', objetivo: '', mensaje: '', website: '',
    },
  })

  const onSubmit = async (data) => {
    // Don't submit if honeypot is filled
    if (data.website) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative py-section overflow-hidden" id="formulario">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(13,92,145,0.4), transparent)' }} />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionWrapper preset="fadeUp">
          <div className="rounded-3xl p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Formulario de diagnóstico</h2>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Cuéntanos sobre tu operación y te contactamos en menos de 24 horas hábiles.</p>
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 rounded-2xl bg-telos-green/10 border border-telos-green/20 flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-telos-green">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Solicitud enviada</h3>
                <p className="max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Recibimos tu solicitud.
                  <br />
                  Te contactamos en menos de 24 horas hábiles para coordinar el diagnóstico.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                  {...register('website')}
                />

                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Nombre completo" required error={errors.nombre?.message}>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className={inputClass(!!errors.nombre)}
                      autoComplete="name"
                      {...register('nombre')}
                    />
                  </FormField>
                  <FormField label="Email" required error={errors.email?.message}>
                    <input
                      type="email"
                      placeholder="empresa@dominio.com"
                      className={inputClass(!!errors.email)}
                      autoComplete="email"
                      {...register('email')}
                    />
                  </FormField>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Teléfono / WhatsApp" required error={errors.telefono?.message}>
                    <input
                      type="tel"
                      placeholder="+52 55 0000 0000"
                      className={inputClass(!!errors.telefono)}
                      autoComplete="tel"
                      {...register('telefono')}
                    />
                  </FormField>
                  <FormField label="Empresa / Proyecto" required error={errors.empresa?.message}>
                    <input
                      type="text"
                      placeholder="Nombre de tu empresa"
                      className={inputClass(!!errors.empresa)}
                      autoComplete="organization"
                      {...register('empresa')}
                    />
                  </FormField>
                </div>

                {/* Row 3 */}
                <FormField label="Ciudad / Estado" error={errors.ciudad?.message}>
                  <input
                    type="text"
                    placeholder="Ciudad de México, Guadalajara…"
                    className={inputClass(!!errors.ciudad)}
                    {...register('ciudad')}
                  />
                </FormField>

                {/* Row 4 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Tipo de operación" error={errors.tipo_operacion?.message}>
                    <select className={inputClass(!!errors.tipo_operacion)} {...register('tipo_operacion')}>
                      {SELECT_OPTIONS.tipo_operacion.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Principal consumo" error={errors.principal_consumo?.message}>
                    <select className={inputClass(!!errors.principal_consumo)} {...register('principal_consumo')}>
                      {SELECT_OPTIONS.principal_consumo.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                {/* Row 5 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Gasto mensual aprox." error={errors.gasto_mensual?.message}>
                    <select className={inputClass(!!errors.gasto_mensual)} {...register('gasto_mensual')}>
                      {SELECT_OPTIONS.gasto_mensual.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </FormField>
                  <FormField label="Principal objetivo" error={errors.objetivo?.message}>
                    <select className={inputClass(!!errors.objetivo)} {...register('objetivo')}>
                      {SELECT_OPTIONS.objetivo.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                {/* Mensaje */}
                <FormField label="Mensaje / Comentarios" error={errors.mensaje?.message}>
                  <textarea
                    rows={4}
                    placeholder="Cuéntanos más sobre tu operación, consumos actuales o cualquier detalle relevante…"
                    className={`${inputClass(!!errors.mensaje)} h-auto py-3 resize-none`}
                    {...register('mensaje')}
                  />
                </FormField>

                {/* Submit */}
                <div className="flex flex-col gap-3 pt-2">
                  {status === 'error' && (
                    <p className="text-sm text-red-400 text-center">
                      Hubo un error al enviar. Por favor intenta de nuevo o escríbenos directamente.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full h-12 rounded-xl bg-telos-green text-black font-bold text-sm hover:bg-telos-green-light transition-all duration-200 shadow-green-glow disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      'Solicitar diagnóstico gratuito'
                    )}
                  </button>

                  <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    Sin spam. Sin compromisos.
                    <br />
                    Te contactaremos en menos de 24 horas hábiles.
                  </p>
                </div>
              </form>
            )}
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
