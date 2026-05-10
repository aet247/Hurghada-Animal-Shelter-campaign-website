import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#D97706',
          700: '#B45309',
          800: '#92400e',
          900: '#78350f',
          DEFAULT: '#D97706',
          dark:  '#B45309',
          light: '#FDE68A',
        },
        secondary: {
          DEFAULT: '#15803d',
          light:   '#bbf7d0',
        },
        shelter: {
          cream:  '#FFFBF5',
          sand:   '#F5E6D3',
          bark:   '#2D1B0E',
          bark2:  '#4A2E1A',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans:    ['"Outfit"', 'system-ui', 'sans-serif'],
        arabic:  ['"Cairo"', '"Noto Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
      backgroundImage: {
        'paw-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='3' fill='%23D97706' fill-opacity='0.08'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config
