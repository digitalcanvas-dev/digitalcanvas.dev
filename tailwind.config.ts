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
    },
  },
  plugins: [],
} satisfies Config;
