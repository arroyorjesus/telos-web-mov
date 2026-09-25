'use client'

import { ChipGroup } from './ChipGroup'

const inputClass =
  'w-full h-11 rounded-lg border border-[var(--color-border)] bg-white px-3.5 text-[15px] text-[var(--color-navy)] outline-none transition-colors duration-200 placeholder:text-[var(--color-muted)]/60 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30'

const textareaClass =
  'w-full rounded-lg border border-[var(--color-border)] bg-white px-3.5 py-3 text-[15px] text-[var(--color-navy)] outline-none transition-colors duration-200 placeholder:text-[var(--color-muted)]/60 focus-visible:border-[var(--color-primary)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30'

export function QuestionField({ question, values, onChange }) {
  const value = values[question.key]
  const stringValue = typeof value === 'string' ? value : ''
  const arrayValue = Array.isArray(value) ? value : []

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[var(--color-navy)]">
        {question.label} {question.required && <span className="text-red-500">*</span>}
      </span>

      {(question.type === 'text' || question.type === 'email' || question.type === 'tel') && (
        <input
          type={question.type}
          className={inputClass}
          placeholder={question.placeholder}
          value={stringValue}
          onChange={(e) => onChange(question.key, e.target.value)}
        />
      )}

      {question.type === 'number' && (
        <input
          type="text"
          inputMode="numeric"
          className={inputClass}
          placeholder={question.placeholder}
          value={stringValue}
          onChange={(e) => onChange(question.key, e.target.value)}
        />
      )}

      {question.type === 'textarea' && (
        <textarea
          className={textareaClass}
          rows={3}
          placeholder={question.placeholder}
          value={stringValue}
          onChange={(e) => onChange(question.key, e.target.value)}
        />
      )}

      {question.type === 'select' && (
        <select
          className={`${inputClass} cursor-pointer`}
          value={stringValue}
          onChange={(e) => onChange(question.key, e.target.value)}
        >
          <option value="">Selecciona...</option>
          {question.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {question.type === 'yesno' && (
        <ChipGroup
          options={['Sí', 'No']}
          selected={stringValue ? [stringValue] : []}
          onToggle={(option) => onChange(question.key, option)}
        />
      )}

      {question.type === 'chips-single' && (
        <ChipGroup
          options={question.options ?? []}
          selected={stringValue ? [stringValue] : []}
          onToggle={(option) => onChange(question.key, option)}
        />
      )}

      {question.type === 'chips-multi' && (
        <>
          <span className="text-xs text-[var(--color-muted)]">Puedes elegir varias</span>
          <ChipGroup
            multi
            options={question.options ?? []}
            selected={arrayValue}
            onToggle={(option) => {
              const next = arrayValue.includes(option)
                ? arrayValue.filter((v) => v !== option)
                : [...arrayValue, option]
              onChange(question.key, next)
            }}
          />
        </>
      )}
    </div>
  )
}
