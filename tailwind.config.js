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
        'wordle-correct-color': '#6fbf60',
        'wordle-incorrect-color': '#5a5a5e',
        'wordle-misplaced-color': '#d6bf56',
      }
    },
  },
  plugins: [],
}

