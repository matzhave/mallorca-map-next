/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#14B8C4',
        secondary: '#F4EDE4',
        accent: '#FF6B6B',
      },
    },
  },
  plugins: [],
};

