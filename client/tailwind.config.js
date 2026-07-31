/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#b0004a",
        "primary-container": "#d81b60",
        "on-primary-container": "#fff2f3",
        "primary-fixed": "#ffd9de",
        "secondary": "#ab2c5d",
        "secondary-container": "#fd6c9c",
        "on-secondary-container": "#6e0034",
        "tertiary": "#735c00",
        "tertiary-container": "#cca730",
        "on-tertiary-container": "#4f3e00",
        "surface": "#fff8f7",
        "surface-container": "#ffe9e7",
        "surface-container-high": "#ffe2df",
        "surface-container-highest": "#ffdad7",
        "surface-container-low": "#fff0ef",
        "surface-container-lowest": "#ffffff",
        "surface-dim": "#ffcfca",
        "on-surface": "#3d0506",
        "on-surface-variant": "#5a4044",
        "outline": "#8e6f74",
        "outline-variant": "#e3bdc3",
        "error": "#ba1a1a",
        "error-container": "#ffdad6"
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Quicksand', 'sans-serif'],
        handwritten: ['Dancing Script', 'cursive']
      }
    },
  },
  plugins: [],
}
