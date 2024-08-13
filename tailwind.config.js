/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-black': {
          100: '#494949',
        },
        'accent-purple': {
          100: '#D0D3E6',
        },
        'accent-blue': {
          100: '#93BADE',
        },
        'link-blue': {
          100: '#828DCF',
        },
      },
    },
  },
  plugins: [],
};
