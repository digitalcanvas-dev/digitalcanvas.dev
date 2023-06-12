import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      heading: ['Merriweather', 'serif'],
      body: ['"Source Sans Pro"', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
        },
        highlight: {
          DEFAULT: 'rgb(var(--color-highlight) / <alpha-value>)',
        },
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        indexLeftHeadingMd: '0.4fr 1fr',
        indexTopHeading: 'auto',
      },
    },
  },
  plugins: [],
} satisfies Config;
