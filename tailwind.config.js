/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'base-black': {
          100: '#494949',
        },
        'accent-purple': {
          50: '#DADDF1',
          100: '#D0D3E6',
          200: '#BDC2E0',
        },
        'accent-blue': {
          100: '#93BADE',
        },
        'link-blue': {
          100: '#92A1F8',
          300: '#828DCF',
          600: '#4A58AD',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              quotes: 'none',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
