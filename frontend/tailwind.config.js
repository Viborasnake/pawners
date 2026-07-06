/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5BC0BE', // Turquesa cálido
          dark: '#3A9A98',
          light: '#E6F7F7',
        },
        secondary: {
          DEFAULT: '#F4A261', // Naranja pastel
          dark: '#E76F51',
          light: '#FAE8D1',
        },
        accent: {
          DEFAULT: '#FCA311', // Acento opcional
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
