const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F3C7E',
        'primary-500': '#B4B8F3',
        'primary-400': '#99A0DF',
        'primary-300': '#7F87CB',
        'primary-200': '#646FB7',
        'primary-100': '#4A57A3',
        secondary: '#FBEAEB',
      },
      fontFamily: {
        kanit: ['Kanit', ...defaultTheme.fontFamily.sans],
        sans: ['ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        display: ['Oswald'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
