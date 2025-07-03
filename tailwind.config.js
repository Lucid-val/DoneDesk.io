/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
