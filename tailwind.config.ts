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
          DEFAULT: '#3E5462',
        },
        highlight: {
          DEFAULT: '#FF5E00',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
