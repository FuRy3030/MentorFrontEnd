const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      maxWidth: {
        'toast-max-width': 'calc(100% - 2.5rem)',
      },
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
        'semi-dark-alt': '#37474f',
        'neon-pink': '#bf00c6',
        'brand-purple-dark': '#4b47b5',
        'brand-purple': '#5c51d3',
        'brand-purple-light': '#635bff',
        'neon-blue': '#0d3cfb',
        'neon-purple': '#4b50ec',
        'neon-light-blue': '#00d4ff',
        'normal-blue': '#316dff',
        'light-blue': '#4da1ff',
        'very-light-blue': '#90c2ff',
        'extremely-light-blue': '#cfe5ff',
        'contrast-light-orange': '#fa714f',
        'contrast-yellow': '#feb435',
        'light-green': 'rgb(46, 125, 50)',
        'dark-green': 'rgb(30, 70, 32)',
        'error-alert': '#d32f2f',
        'info-alert': '#0288d1',
        // Olympiad Colors
        'OWE': '#019642',
        'OP': 'rgb(31, 94, 182)',
        'OWOPIŚW': '#3b455e',
        'OHIS': '#9b1b09',
        'LOSY': '#be7a22',
        'OFIL': '#ff9710',
        'OLIJP': '#bc3766',
        'OM': '#34343c',
        'OI': 'rgb(21, 124, 252)',
        'OFIZ': 'rgb(156, 39, 176)',
        'OASTRO': '#d88bff',
        'OBIOL': '#66c100',
        'OLCHEM': 'rgb(255, 125, 80)',
        'OGEO': 'rgb(255, 175, 0)',
        'OJFR': '#002a7e',
        'OJN': '#ff0000',
        'OJA': '#d0222c',
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
        'brand-purple-extra-light': '#e8e6ff',
        'neon-blue': '#0d3cfb',
        'neon-purple': '#4b50ec',
        'neon-light-blue': '#00d4ff',
        'normal-blue': '#316dff',
        'light-blue': '#4da1ff',
        'very-light-blue': '#90c2ff',
        'extremely-light-blue': '#cfe5ff',
        'contrast-light-orange': '#fa714f',
        'contrast-yellow': '#feb435',
        'soft-green': 'rgb(237, 247, 237)',
        'dark-gray': '#f3f6f8',
        'error-alert': 'rgb(253, 237, 237)',
        'info-alert': 'rgb(229, 246, 253)',
        // Olympiad Colors
        'OWE': '#019642',
        'OP': 'rgb(31, 94, 182)',
        'OWOPIŚW': '#3b455e',
        'OHIS': '#9b1b09',
        'LOSY': '#be7a22',
        'OFIL': '#ff9710',
        'OLIJP': '#bc3766',
        'OM': '#34343c',
        'OI': 'rgb(21, 124, 252)',
        'OFIZ': 'rgb(156, 39, 176)',
        'OASTRO': '#d88bff',
        'OBIOL': '#66c100',
        'OLCHEM': 'rgb(255, 125, 80)',
        'OGEO': 'rgb(255, 175, 0)',
        'OJFR': '#002a7e',
        'OJN': '#ff0000',
        'OJA': '#d0222c',
      },
      boxShadow: {
        'steep-jjt': '0 2px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 5px 0 rgba(0, 0, 0, 0.04)',
        'soft-jjt': 'rgba(225, 232, 240, 0.7) 0px 2px 18px 10px'
      }
    },
  },
  plugins: [
    addDynamicIconSelectors()
  ],
}
