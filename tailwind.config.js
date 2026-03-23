/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hx: {
          50: '#effcf6',
          100: '#c7f7e4',
          200: '#93eece',
          300: '#54deb2',
          400: '#22c892',
          500: '#0aae7c',
          600: '#028d65',
          700: '#027153',
          800: '#045943',
          900: '#044938',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
