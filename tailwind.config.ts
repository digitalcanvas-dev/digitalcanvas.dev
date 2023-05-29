import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      heading: ['Merriweather', 'serif'],
      body: ['"Source Sans Pro"', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
