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
