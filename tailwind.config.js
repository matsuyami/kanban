/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: 'var(--color-black)',
        'very-dark-gray': 'var(--color-very-dark-gray)',
        'dark-gray': 'var(--color-dark-gray)',
        'medium-gray': 'var(--color-medium-gray)',
        'light-gray': 'var(--color-light-gray)',
        'dark-lines': 'var(--color-dark-lines)',
        'light-lines': 'var(--color-light-lines)',
        'main-purple': 'var(--color-main-purple)',
        'main-purple-hover': 'var(--color-main-purple-hover)',
        red: 'var(--color-red)',
        'red-hover': 'var(--color-red-hover)'
      },
    },
    fontSize: {
      "heading-sm": ["12px", "15px"],
      "heading-md": ["15px", "19px"],
      "heading-lg": ["18px", "23px"],
      "heading-xl": ["24px", "30px"],
    },
  },
  plugins: [],
}
