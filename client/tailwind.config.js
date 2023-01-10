/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter, sans-serif'
      },
      strokeWidth: {
        0.5: '1px'
      },
      colors: {
        primary: '#75c55e',
        'dark-primary': '#65ad51'
      },
      fontSize: {
        xxs: '0.60rem'
      },
      animation: {
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 0
          },
          '50%': {
            opacity: 1
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('tailwindcss-labeled-groups')(['settings'])
  ]
}
