const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'title': 'clamp(30px, 5vw, 85px)',
        'mobile-title': '10.25vw'
      },
      colors: {
        'deep-dark': '#12153a',
        'dark': '#0a2540',
        'semi-dark': '#425466',
        'neon-pink': '#bf00c6',
        'brand-purple-dark': '#4b47b5',
        'brand-purple': '#5c51d3',
        'brand-purple-light': '#635bff',
        'neon-blue': '#0d3cfb',
        'neon-purple': '#4b50ec',
        'neon-light-blue': '#00d4ff',
        'light-blue': '#4da1ff',
        'very-light-blue': '#90c2ff',
        'contrast-light-orange': '#fa714f',
        'contrast-yellow': '#feb435',
      },
      backgroundColor: {
        'deep-dark': '#12153a',
        'dark': '#0a2540',
        'semi-dark': '#425466',
        'white-transparent-90': 'rgba(255, 255, 255, 0.9)',
        'light-grey': '#f6f9fc',
        'neon-pink': '#bf00c6',
        'brand-purple-dark': '#4b47b5',
        'brand-purple': '#5c51d3',
        'brand-purple-light': '#635bff',
        'neon-blue': '#0d3cfb',
        'neon-purple': '#4b50ec',
        'neon-light-blue': '#00d4ff',
        'light-blue': '#4da1ff',
        'very-light-blue': '#90c2ff',
        'contrast-light-orange': '#fa714f',
        'contrast-yellow': '#feb435',
      }
    },
  },
  plugins: [
    addDynamicIconSelectors()
  ],
}
