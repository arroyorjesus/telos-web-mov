export function StepIndicator({ current, total }) {
  const percent = Math.round((current / total) * 100)
  return (
    <div className="flex flex-col gap-1.5" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
      <div className="flex items-center justify-between text-xs font-medium text-[var(--color-muted)]">
        <span>
          Paso {current} de {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
