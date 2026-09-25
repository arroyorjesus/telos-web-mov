'use client'

import { useCallback, useId, useState } from 'react'

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileDropzone({ label, helper, accept, files, onChange }) {
  const inputId = useId()
  const [isDragging, setIsDragging] = useState(false)

  const addFiles = useCallback(
    (incoming) => {
      if (!incoming || incoming.length === 0) return
      onChange([...files, ...Array.from(incoming)])
    },
    [files, onChange]
  )

  const removeFile = (index) => {
    onChange(files.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-[var(--color-navy)]">{label}</p>
      <p className="text-xs text-[var(--color-muted)]">{helper}</p>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          addFiles(e.dataTransfer.files)
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors duration-200 focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:ring-offset-2 ${
          isDragging
            ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
            : 'border-gray-300 bg-gray-50 hover:border-[var(--color-primary)]'
        }`}
      >
        <input
          id={inputId}
          type="file"
          accept={accept}
          multiple
          aria-label={label}
          className="sr-only"
          onChange={(e) => addFiles(e.target.files)}
        />
        <p className="text-sm text-[var(--color-muted)]">
          Arrastra tus archivos aquí o{' '}
          <span className="font-semibold text-[var(--color-primary)]">selecciónalos</span>
        </p>
      </label>
      {files.length > 0 && (
        <ul className="flex flex-col gap-1">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm"
            >
              <span className="truncate">
                {file.name} <span className="text-[var(--color-muted)]">({formatSize(file.size)})</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="ml-3 shrink-0 cursor-pointer rounded text-[var(--color-muted)] transition-colors duration-200 hover:text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                aria-label={`Quitar ${file.name}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
