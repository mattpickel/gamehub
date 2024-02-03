/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'default-tile': '#121213',
        'default-key': '#818384',
        'wordle-correct-color': '#538d4e',
        'wordle-incorrect-color': '#3a3a3c',
        'wordle-misplaced-color': '#b59f3b',
      }
    },
  },
  plugins: [],
}

