/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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