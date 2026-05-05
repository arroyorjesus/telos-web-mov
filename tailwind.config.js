/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base dark palette
        black: '#0a0a0a',
        'black-soft': '#111111',
        'black-card': '#141414',
        'black-border': '#1e1e1e',
        'gray-dark': '#2a2a2a',
        'gray-mid': '#3d3d3d',
        'gray-muted': '#6b7280',
        'gray-light': '#9ca3af',
        'white-dim': '#e5e7eb',
        // TELOS brand — primary blue
        brand: {
          DEFAULT: '#0d5c91',
          dark: '#0a4d7a',
          light: '#1a7bc9',
          glow: 'rgba(13,92,145,0.15)',
          subtle: 'rgba(13,92,145,0.08)',
        },
        // TELOS vertical colors
        telos: {
          green: '#2d802a',
          'green-dark': '#1f5a1d',
          'green-light': '#3fa338',
          'green-glow': 'rgba(45,128,42,0.12)',
          blue: '#3b82f6',
          'blue-dark': '#2563eb',
          'blue-light': '#60a5fa',
          'blue-glow': 'rgba(59,130,246,0.12)',
          orange: '#f97316',
          'orange-dark': '#ea580c',
          'orange-light': '#fb923c',
          'orange-glow': 'rgba(249,115,22,0.12)',
          gold: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        exo2: ['var(--font-exo2)', 'Exo 2', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        'hero-xl': ['clamp(3rem, 7vw, 6rem)', { lineHeight: '1.04', letterSpacing: '-0.04em' }],
        'hero': ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.06', letterSpacing: '-0.035em' }],
        'display': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'title': ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'label': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        section: '7rem',
        'section-sm': '4rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-green': 'glowGreen 3s ease-in-out infinite alternate',
        'glow-blue': 'glowBlue 3s ease-in-out infinite alternate',
        'glow-brand': 'glowBrand 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowGreen: {
          from: { boxShadow: '0 0 15px rgba(34,197,94,0.15)' },
          to: { boxShadow: '0 0 40px rgba(34,197,94,0.35), 0 0 80px rgba(34,197,94,0.08)' },
        },
        glowBlue: {
          from: { boxShadow: '0 0 15px rgba(59,130,246,0.15)' },
          to: { boxShadow: '0 0 40px rgba(59,130,246,0.35)' },
        },
        glowBrand: {
          from: { boxShadow: '0 0 15px rgba(13,92,145,0.2)' },
          to: { boxShadow: '0 0 40px rgba(13,92,145,0.5), 0 0 80px rgba(13,92,145,0.12)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card': '0 1px 3px rgba(0,0,0,0.5)',
        'card-hover': '0 24px 60px rgba(0,0,0,0.6)',
        'card-light': '0 1px 3px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
        'card-light-hover': '0 12px 40px rgba(0,0,0,0.12)',
        'brand-glow': '0 0 40px rgba(13,92,145,0.3)',
        'brand-glow-sm': '0 0 20px rgba(13,92,145,0.25)',
        'green-glow': '0 0 40px rgba(34,197,94,0.25)',
        'blue-glow': '0 0 40px rgba(59,130,246,0.25)',
        'orange-glow': '0 0 40px rgba(249,115,22,0.25)',
        'inner-top': 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
      screens: {
        'xs': '375px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
