/* eslint-disable */

const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
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
    },
    textOpacity: ['dark'],
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
