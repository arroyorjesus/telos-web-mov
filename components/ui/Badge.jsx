import { cn } from '@/lib/utils'

const variants = {
  brand: 'badge-brand',
  'brand-light': 'badge-brand-light',
  green: 'badge-green',
  blue: 'badge-blue',
  orange: 'badge-orange',
  white: 'badge-white',
  default: 'badge-white',
}

export default function Badge({ children, variant = 'default', className, dot = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide',
        variants[variant] || variants.default,
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'brand' ? 'bg-[#0d5c91]' :
            variant === 'green' ? 'bg-telos-green' :
            variant === 'blue' ? 'bg-telos-blue' :
            variant === 'orange' ? 'bg-telos-orange' : 'bg-white/60'
          )}
        />
      )}
      {children}
    </span>
  )
}
