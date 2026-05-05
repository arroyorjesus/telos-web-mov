'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Badge from './Badge'

export default function SectionHeader({
  badge,
  badgeVariant = 'green',
  title,
  subtitle,
  align = 'left',
  titleClass,
  subtitleClass,
  className,
  animate = true,
}) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[align]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  const Wrapper = animate ? motion.div : 'div'
  const wrapperProps = animate
    ? { variants: container, initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-60px' } }
    : {}

  return (
    <Wrapper
      className={cn('flex flex-col gap-3 max-w-2xl', alignClass, className)}
      {...wrapperProps}
    >
      {badge && (
        <motion.div variants={animate ? item : undefined} className={align === 'center' ? 'flex justify-center' : ''}>
          <Badge variant={badgeVariant}>{badge}</Badge>
        </motion.div>
      )}
      {title && (
        <motion.h2
          variants={animate ? item : undefined}
          className={cn(
            'text-display font-bold text-slate-900 text-balance leading-tight',
            titleClass
          )}
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          variants={animate ? item : undefined}
          className={cn(
            'text-slate-600 leading-relaxed text-balance',
            subtitleClass
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </Wrapper>
  )
}
