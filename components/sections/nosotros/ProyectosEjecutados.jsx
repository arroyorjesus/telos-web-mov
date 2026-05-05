'use client'

import { motion } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import { StaggerContainer, fadeUpItem } from '@/components/ui/MotionWrapper'
import { PROJECTS, TOTAL_PROJECT_VALUE } from '@/data/projects'

const FILTERS = ['Todos', 'Fotovoltaico', 'Agua', 'Gas térmico', 'Hotel', 'Industrial']

export default function ProyectosEjecutados() {
  return (
    <section className="relative bg-white py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 justify-between mb-12">
          <SectionHeader
            badge="Proyectos"
            badgeVariant="green"
            title="Instalaciones reales. Datos duros."
            subtitle="Proyectos de generación distribuida, eficiencia energética e infraestructura eléctrica a lo largo del país."
          />

          {/* Total authority block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="light-card rounded-2xl p-6 min-w-[220px] border-telos-green/20 bg-telos-green-glow"
          >
            <p className="text-xs text-slate-500 mb-1">Volumen total ejecutado</p>
            <p className="text-3xl font-black text-slate-900 tracking-tight">{TOTAL_PROJECT_VALUE}</p>
            <p className="text-xs text-slate-500 mt-1">En proyectos a lo largo de la República</p>
          </motion.div>
        </div>

        {/* Project cards grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUpItem}
              className="group light-card rounded-2xl overflow-hidden hover:border-slate-300 transition-all duration-300"
            >
              {/* Image placeholder */}
              <div className="h-44 bg-gradient-to-br from-slate-200 to-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(45,128,42,0.06),transparent)]" />
                {project.featured && (
                  <span className="absolute top-3 left-3 badge-green px-2.5 py-1 rounded-full text-xs font-medium">
                    Destacado
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1">
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                  </svg>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm leading-snug">{project.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{project.location}</p>
                  </div>
                  <span className="badge-green px-2 py-0.5 rounded text-xs shrink-0">{project.category}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-3">
                    <p className="text-lg font-bold text-telos-green">{project.capacity}</p>
                    <p className="text-xs text-slate-500">capacidad</p>
                  </div>
                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-3">
                    <p className="text-sm font-bold text-slate-900 leading-tight">{project.savingsYear}</p>
                    <p className="text-xs text-slate-500">ahorro / año</p>
                  </div>
                </div>

                <p className="text-xs text-slate-500">{project.panels}</p>
                {project.detail && (
                  <p className="text-xs text-telos-blue mt-1">{project.detail}</p>
                )}
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
