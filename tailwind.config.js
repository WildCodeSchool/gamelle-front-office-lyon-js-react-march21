/* eslint-disable */

const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#44a58a',
      secondary: '#318D7D',
      succes: '#0ab264',
      info: '#0769ea',
      warning: '#f4e404',
      danger: '#e01d1d',
      white: '#ffffff',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
