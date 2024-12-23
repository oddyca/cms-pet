/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';

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
          200: '#CBCFE8',
          300: '#9FA7D9',
          500: '#8691D1',
        },
        'accent-blue': {
          50: '#A3C9EC',
          100: '#93BADE',
          350: '#64A5E0',
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
      boxShadow: {
        centrif: '0px 0px 8px 2px rgba(34, 60, 80, 0.2)',
        'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'dark-tremor-card':
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'dark-tremor-dropdown':
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
    },
  },
  safelist: [
    ...[
      '[#97DE9F]',
      '[#DEC697]',
      '[#97D7DE]',
      '[#D9D5D1]',
      '[#AFACE4]',
    ].flatMap((customColor) => [
      `bg-${customColor}`,
      `border-${customColor}`,
      `hover:bg-${customColor}`,
      `hover:border-${customColor}`,
      `hover:text-${customColor}`,
      `fill-${customColor}`,
      `ring-${customColor}`,
      `stroke-${customColor}`,
      `text-${customColor}`,
      `ui-selected:bg-${customColor}`,
      `ui-selected:border-${customColor}`,
      `ui-selected:text-${customColor}`,
    ]),
  ],
  plugins: [
    typography,
    plugin(function ({ addUtilities }) {
      const customScrollbars = {
        /* WebKit-based browsers (Chrome, Safari) */
        '.custom-scrollbar::-webkit-scrollbar': {
          width: '8px',
          borderRadius: '10px',
        },
        '.custom-scrollbar::-webkit-scrollbar-thumb': {
          background: '#C0C0C0',
          borderRadius: '10px',
          transitionDuration: '150ms',
        },
        '.custom-scrollbar-hidden::-webkit-scrollbar-thumb': {
          background: 'transparent',
          borderRadius: '10px',
          transitionDuration: '150ms',
        },
        '.custom-scrollbar::-webkit-scrollbar-track': {
          background: 'transparent',
          borderRadius: '10px',
        },
        /* Firefox */
        '.custom-scrollbar': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#C0C0C0 transparent',
          transitionDuration: '150ms',
        },
        '.custom-scrollbar-hidden': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'transparent transparent',
          transitionDuration: '150ms',
        },
        /* Edge/IE */
        '.custom-scrollbar::-ms-scrollbar': {
          width: '8px',
        },
      };

      addUtilities(customScrollbars);
    }),
  ],
};
