/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a202c',
        secondary: '#2d3748',
        accent: '#e2e8f0',
        highlight: '#edf2f7',
        muted: '#a0aec0',
        success: '#9ae6b4',
        info: '#63b3ed',
        warning: '#faf089',
        danger: '#feb2b2',
        bgcolor: '#F8FBFE',
      },
    },
  },
  plugins: [],
}