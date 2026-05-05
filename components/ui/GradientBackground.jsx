import { cn } from '@/lib/utils'

export default function GradientBackground({
  className,
  variant = 'default',
  children,
}) {
  const variants = {
    default: (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,197,94,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.04)_0%,transparent_60%)]" />
      </>
    ),
    hero: (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(34,197,94,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_-10%_50%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_110%_50%,rgba(249,115,22,0.04)_0%,transparent_60%)]" />
      </>
    ),
    green: (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,197,94,0.1)_0%,transparent_70%)]" />
    ),
    blue: (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
    ),
    orange: (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
    ),
    subtle: (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
    ),
  }

  return (
    <div className={cn('relative', className)}>
      {variants[variant] || variants.default}
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  )
}

export function SectionContainer({ children, className, id }) {
  return (
    <section id={id} className={cn('relative overflow-hidden', className)}>
      {children}
    </section>
  )
}
