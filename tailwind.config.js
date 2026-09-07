/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#C5A059',
        'brand-blush': '#FDF2F2',
        'brand-rose': '#E2B1B1',
      },
    },
  },
  plugins: [],
}
