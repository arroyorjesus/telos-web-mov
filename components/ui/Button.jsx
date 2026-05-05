'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-telos-green text-black font-semibold hover:bg-telos-green-light shadow-green-glow hover:shadow-[0_0_40px_rgba(34,197,94,0.35)]',
  secondary: 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1] hover:border-white/[0.18]',
  ghost: 'text-gray-light hover:text-white hover:bg-white/[0.05]',
  outline: 'border border-telos-green/40 text-telos-green hover:bg-telos-green/[0.08] hover:border-telos-green/70',
  danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/15',
  whatsapp: 'bg-[#25d366] text-white font-semibold hover:bg-[#20ba5a]',
}

const sizes = {
  sm: 'px-3.5 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3.5 text-base rounded-xl gap-2.5',
  xl: 'px-8 py-4 text-base rounded-2xl gap-3',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  external,
  disabled,
  loading,
  icon,
  iconRight,
  onClick,
  type = 'button',
  ...props
}) {
  const base = cn(
    'inline-flex items-center justify-center font-medium transition-all duration-200 whitespace-nowrap select-none',
    variants[variant],
    sizes[size],
    disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
    className
  )

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  )

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...props}
        >
          {content}
        </motion.a>
      )
    }
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={base} {...props}>
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      className={base}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {content}
    </motion.button>
  )
}
