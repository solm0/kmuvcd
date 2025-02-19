/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        '224': '56rem', // 224 * 0.25rem (1rem = 16px)
      },
    },
  },
  plugins: [],
}

