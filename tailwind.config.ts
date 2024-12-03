import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        gray: {
          // dark: '#390000',
          // main: '#9b0000',
          light: '#d9d9d8',
        },
        red: {
          dark: '#390000',
          main: '#9b0000',
          light: '#b60100',
        },
        yellow: {
          dark: '#f29e37',
          main: '#f2cd3f',
          // light: '#f2cd3f',
        },
        blue: {
          dark: '#0d094b',
          main: '#002abc',
          light: '#e4e5ef',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
