const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    },
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
      opaque: ' #00000059',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue: colors.blue,
      green: colors.green,
      grey: '#dbedf3',
      lightGrey: '#f2f9fc',
      darkblue: '#283149',
      darkpurple: '#9370DB',
      googleblue: '#4285F4',
      googlered: '#EA4335',
      googleyellow: '#FBBC05',
      googlegreen: '#34A853',
      facebookdarkblue: '#4267B2',
      facebookblue: '#1877F2',
      gray500: '#6B7280',
    },
    textOpacity: ['dark'],
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'translateX(-50%)',
          },
          '50%': {
            transform: 'translateX(0%)',
          },
        },
        reverseWiggle: {
          '0%, 100%': {
            transform: 'translateX(50%)',
          },
          '50%': {
            transform: 'translateX(0%)',
          },
        },
        backgroundGradient: {},
      },
      animation: {
        wiggle: 'wiggle 1s infinite',
        reverseWiggle: 'reverseWiggle 1s infinite',
      },
    },
  },
  variants: {},
  plugins: [],
};
