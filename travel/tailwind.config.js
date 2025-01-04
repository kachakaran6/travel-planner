/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'rgb(229, 231, 235)', // This matches border-gray-300
      },
    },
  },
  plugins: [],
};