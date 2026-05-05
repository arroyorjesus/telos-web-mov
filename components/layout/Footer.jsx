import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/data/site'

const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Ustedes', href: '/ustedes' },
  { label: 'Ellos', href: '/ellos' },
  { label: 'Contacto', href: '/contacto' },
]

const SERVICES = [
  { label: 'Agua', href: '/ustedes#agua' },
  { label: 'Gas térmico', href: '/ustedes#gas' },
  { label: 'Electricidad', href: '/ustedes#electricidad' },
  { label: 'Diagnóstico gratuito', href: '/contacto' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0d5c91] border-t border-white/10">
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6 w-fit">
              <Image
                src="/logo-blanco.png"
                alt="TELOS"
                width={104}
                height={104}
                className="object-contain"
                style={{ width: 104, height: 104 }}
              />
            </Link>
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Eficiencia energética integral para empresas en México. Agua, gas y electricidad bajo una sola estrategia.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50 font-medium">Disponible:</span>
              <span className="text-xs text-white/80">L–V 9–18h</span>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Navegación</p>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Verticales</p>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/75 hover:text-white transition-colors duration-200"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Contacto</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-white/75 hover:text-white transition-colors duration-200"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="text-sm text-white/75 hover:text-white transition-colors duration-200"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="text-sm text-white/60 leading-relaxed">
                {SITE.address}
              </li>
            </ul>

            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-lg bg-[#2d802a]/25 border border-[#2d802a]/50 text-white text-sm font-medium hover:bg-[#2d802a]/40 transition-colors duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#4ade80]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {year} <span className="font-exo2 font-bold text-white/80">TELOS</span> · Eficiencia Energética Integral · México
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/50">Operamos en toda la República Mexicana</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
