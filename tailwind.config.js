/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-black': {
          100: '#494949',
        },
        'highlight-blue': {
          100: '#D0D3E6',
        },
      },
    },
  },
  plugins: [],
};
