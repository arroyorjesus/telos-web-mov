'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/components/ui/SectionHeader'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { FAQS } from '@/data/faqs'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`border-b border-slate-200 transition-colors duration-200 ${isOpen ? 'border-slate-100' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        aria-expanded={isOpen}
      >
        <span className={`text-base font-medium transition-colors duration-200 ${isOpen ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
          {faq.question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'border-telos-green/30 bg-telos-green/10 rotate-45'
              : 'border-slate-200 bg-transparent'
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className={isOpen ? 'text-telos-green' : 'text-slate-500'}>
            <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-500 leading-relaxed text-sm pr-10">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  const [openId, setOpenId] = useState(null)

  return (
    <section className="relative bg-slate-50 py-section overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          badgeVariant="white"
          title="Preguntas frecuentes"
          className="mb-10"
        />

        <MotionWrapper preset="fadeUp" delay={0.1}>
          <div className="light-card rounded-2xl divide-y divide-slate-200 overflow-hidden p-0">
            <div className="px-6">
              {FAQS.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
