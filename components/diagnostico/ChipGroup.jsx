'use client'

export function ChipGroup({ options, selected, onToggle, multi = false }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            aria-pressed={isSelected}
            className={`inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 ${
              isSelected
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                : 'border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-navy)]'
            }`}
          >
            {multi && (
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] leading-none ${
                  isSelected ? 'border-white bg-white text-[var(--color-primary)]' : 'border-gray-300'
                }`}
              >
                {isSelected && '✓'}
              </span>
            )}
            {option}
          </button>
        )
      })}
    </div>
  )
}
