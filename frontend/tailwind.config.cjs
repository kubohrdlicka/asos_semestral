const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6fefd',
          100: '#cefdfb',
          200: '#83fbf5',
          300: '#52faf1',
          400: '#05ada5',
          500: '#047c76',
          600: '#035c58',
          700: '#024a47',
          800: '#02312f',
          900: '#011918'
        }
      },
      fontFamily: {
        kanit: ['Kanit', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ]
}
