import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#1A1A1A',
          red: '#C0392B',
          cream: '#F5F0E8',
          green: '#2D4A3E',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Courier Prime', 'Courier New', 'monospace'],
      },
    },
  },
};

export default config;
