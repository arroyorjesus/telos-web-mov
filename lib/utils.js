export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatCurrency(num) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
  }).format(num)
}

export function formatNumber(num) {
  return new Intl.NumberFormat('es-MX').format(num)
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function lerp(start, end, t) {
  return start + (end - start) * t
}

// Eased counter for animated numbers
export function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function truncate(str, length = 120) {
  if (!str) return ''
  if (str.length <= length) return str
  return str.slice(0, length).trim() + '...'
}

export function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}

export const VERTICAL_COLORS = {
  electricidad: {
    text: 'text-telos-green',
    bg: 'bg-telos-green',
    bgAlpha: 'bg-telos-green-glow',
    border: 'border-telos-green/25',
    badge: 'badge-green',
    hex: '#22c55e',
  },
  agua: {
    text: 'text-telos-blue',
    bg: 'bg-telos-blue',
    bgAlpha: 'bg-telos-blue-glow',
    border: 'border-telos-blue/25',
    badge: 'badge-blue',
    hex: '#3b82f6',
  },
  gas: {
    text: 'text-telos-orange',
    bg: 'bg-telos-orange',
    bgAlpha: 'bg-telos-orange-glow',
    border: 'border-telos-orange/25',
    badge: 'badge-orange',
    hex: '#f97316',
  },
  green: {
    text: 'text-telos-green',
    bg: 'bg-telos-green',
    bgAlpha: 'bg-telos-green-glow',
    border: 'border-telos-green/25',
    badge: 'badge-green',
    hex: '#22c55e',
  },
  blue: {
    text: 'text-telos-blue',
    bg: 'bg-telos-blue',
    bgAlpha: 'bg-telos-blue-glow',
    border: 'border-telos-blue/25',
    badge: 'badge-blue',
    hex: '#3b82f6',
  },
  orange: {
    text: 'text-telos-orange',
    bg: 'bg-telos-orange',
    bgAlpha: 'bg-telos-orange-glow',
    border: 'border-telos-orange/25',
    badge: 'badge-orange',
    hex: '#f97316',
  },
  white: {
    text: 'text-white',
    bg: 'bg-white',
    bgAlpha: 'bg-white/5',
    border: 'border-white/15',
    badge: 'badge-white',
    hex: '#ffffff',
  },
}
