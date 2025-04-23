/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e88e5',
        secondary: '#f5f5f5',
        border: '#e0e0e0',
        hover: '#f0f0f0',
      },
    },
  },
  plugins: [],
} 