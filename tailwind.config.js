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
      grey: '#dbedf3',
      darkblue: '#283149',
      'gray-200': '#E4E4E7',
      darkpurple: '#9370DB',
      googleblue: '#4285F4',
      googlered: '#EA4335',
      googleyellow: '#FBBC05',
      googlegreen: '#34A853',
    },
    textOpacity: ['dark'],
  },
  extend: {
    keyframes: {
      'slide-in': {
        '0%': { color: 'teal', transform: 'scaleX(0)' },
        '100%': { color: 'lightcoral', transform: 'scaleX(1)' },
      },
    },
    animation: { 'slide-in': 'slide-in 0.5s ease-out' },
  },
  variants: {},
  plugins: [],
};
