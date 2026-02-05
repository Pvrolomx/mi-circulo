/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: { 50: '#fff9e6', 100: '#fff0b3', 200: '#ffe680', 300: '#ffd94d', 400: '#ffcc1a', 500: '#e6b300', 600: '#b38a00', 700: '#806200', 800: '#4d3b00', 900: '#1a1400' },
        mystic: { 50: '#fdf2f2', 100: '#f9dada', 200: '#f0a8a8', 300: '#e67676', 400: '#d94444', 500: '#b33030', 600: '#8c2424', 700: '#661a1a', 800: '#401010', 900: '#1a0606' },
        cream: '#faf5eb',
        sand: '#f0e6d3',
      }
    },
  },
  plugins: [],
}
