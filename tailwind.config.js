/* eslint-disable */

const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      display: ['Oswald'],
      body: ['Open Sans'],
      gamelle: ['Ubuntu'],
    },
    colors: {
      primary: '#44a58a',
      secondary: '#318D7D',
      succes: '#0ab264',
      info: '#0769ea',
      warning: '#f4e404',
      danger: '#e01d1d',
      white: '#ffffff',
      opaque: ' #00000059',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      grey: '#dbedf3',
      darkblue: '#283149',
      // 'gray-200': '#E4E4E7',
      // 'gray-500': '#6B7280',
      // 'gray-800': '#1F2937',
      // 'indigo-300': '#C4B5FD',
      darkpurple: '#9370DB',
      googleblue: '#4285F4',
      googlered: '#EA4335',
      googleyellow: '#FBBC05',
      googlegreen: '#34A853',
      facebookdarkblue: '#4267B2',
      facebookblue: '#1877F2',
    },
    textOpacity: ['dark'],
  },
  extend: {},
  variants: {},
  plugins: [],
};
