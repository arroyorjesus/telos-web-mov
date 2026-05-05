'use client'

import { motion } from 'framer-motion'
import { SITE } from '@/data/site'

const INFO = [
  {
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
  {
    label: 'Teléfono / WhatsApp',
    value: SITE.phone,
    href: `tel:${SITE.phoneRaw}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18L6.56 2a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.61 9.81a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    label: 'Ubicación',
    value: SITE.address,
    href: null,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
]

const SCHEDULE = [
  { days: 'Lunes a viernes', hours: '9:00 – 18:00' },
  { days: 'Sábado', hours: '10:00 – 14:00' },
  { days: 'Domingo', hours: 'Emergencias por WhatsApp' },
]

export default function ContactoDirecto() {
  const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`

  return (
    <section className="relative bg-white py-14 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-5">

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 light-card rounded-2xl p-6"
          >
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-5">Contacto directo</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {INFO.map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-slate-500">
                    {item.icon}
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-slate-900 hover:text-telos-green transition-colors font-medium leading-snug">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-600 leading-snug">{item.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-3">Horario de atención</p>
              <div className="grid sm:grid-cols-3 gap-2">
                {SCHEDULE.map((s) => (
                  <div key={s.days} className="bg-slate-100 rounded-xl p-3">
                    <p className="text-xs text-slate-500">{s.days}</p>
                    <p className="text-sm text-slate-900 font-medium mt-0.5">{s.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="light-card rounded-2xl p-6 flex flex-col justify-between bg-telos-green-glow border-telos-green/20"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#25d366]/15 border border-[#25d366]/25 flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#25d366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">WhatsApp directo</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                Escríbenos ahora y coordinamos tu diagnóstico sin formularios.
              </p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25d366] text-slate-900 font-bold text-sm hover:bg-[#20ba5a] transition-colors"
            >
              Iniciar conversación
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
