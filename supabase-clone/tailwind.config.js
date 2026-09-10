/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        foreground: '#fafafa',
        'foreground-light': '#b4b4b4',
        'foreground-lighter': '#898989',
        brand: '#3ecf8e',
        'brand-button': '#006239',
        border: '#2e2e2e',
        'surface-75': 'rgba(18, 18, 18, 0.75)',
      },
      fontFamily: {
        sans: ['Circular', 'custom-font', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
