'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { SERVICES } from '@/data/services'

const SERVICE_ICONS = {
  Droplets: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>
    </svg>
  ),
  Flame: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  Zap: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  ),
}

const colorConfig = {
  blue: {
    icon: 'text-telos-blue',
    iconBg: 'bg-telos-blue-glow border-telos-blue/20',
    badge: 'badge-blue',
    glow: 'hover:shadow-blue-glow hover:border-telos-blue/20',
    dot: 'bg-telos-blue',
  },
  orange: {
    icon: 'text-telos-orange',
    iconBg: 'bg-telos-orange-glow border-telos-orange/20',
    badge: 'badge-orange',
    glow: 'hover:shadow-orange-glow hover:border-telos-orange/20',
    dot: 'bg-telos-orange',
  },
  green: {
    icon: 'text-telos-green',
    iconBg: 'bg-telos-green-glow border-telos-green/20',
    badge: 'badge-green',
    glow: 'hover:shadow-green-glow hover:border-telos-green/20',
    dot: 'bg-telos-green',
  },
}

export default function SolutionsSection() {
  return (
    <section className="relative bg-black py-section overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,197,94,0.03)_0%,transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Soluciones"
          badgeVariant="green"
          title="Las tres vertientes. Un solo aliado estratégico."
          subtitle="Integramos agua, gas térmico y electricidad bajo una sola estrategia de eficiencia energética."
          className="mb-12 lg:mb-16"
        />

        {/* Bento grid — 3 large cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5" delay={0.1}>
          {SERVICES.map((service) => {
            const c = colorConfig[service.color]
            return (
              <motion.div
                key={service.id}
                variants={fadeUpItem}
                className={`group glass-card rounded-3xl p-7 transition-all duration-300 border-black-border ${c.glow} relative overflow-hidden`}
              >
                {/* Glow top */}
                <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-${service.color === 'blue' ? 'telos-blue' : service.color === 'orange' ? 'telos-orange' : 'telos-green'}/[0.05] to-transparent pointer-events-none`} />

                <div className={`w-11 h-11 rounded-xl ${c.iconBg} border flex items-center justify-center ${c.icon} mb-5`}>
                  {SERVICE_ICONS[service.icon]}
                </div>

                <h3 className="font-bold text-white text-xl mb-1">{service.title}</h3>
                <p className="text-sm text-gray-muted mb-1">{service.subtitle}</p>
                <p className="text-sm text-gray-light leading-relaxed mb-5">{service.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.tags.map((tag) => (
                    <span key={tag} className={`${c.badge} px-2.5 py-0.5 rounded-full text-xs font-medium`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Outcomes */}
                <ul className="flex flex-col gap-2">
                  {service.outcomes.slice(0, 3).map((o) => (
                    <li key={o} className="flex items-center gap-2 text-xs text-gray-muted">
                      <span className={`w-1 h-1 rounded-full shrink-0 ${c.dot}`} />
                      {o}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.slug}
                  className="mt-6 flex items-center gap-1.5 text-sm font-medium text-gray-muted hover:text-white transition-colors"
                >
                  Ver casos reales
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </Link>
              </motion.div>
            )
          })}
        </StaggerContainer>

        {/* Bottom connector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 px-5 py-3 glass rounded-full border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-telos-blue animate-pulse-slow" />
            <span className="w-1.5 h-1.5 rounded-full bg-telos-orange animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-telos-green animate-pulse-slow" style={{ animationDelay: '1s' }} />
            <span className="text-xs text-gray-muted">Un diagnóstico cubre las tres verticales</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
