/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkblue: '#161664',
        midblue: '#3636a6',
        lightblue: '#796dd5',
      }
    }
  },
  plugins: [],
}