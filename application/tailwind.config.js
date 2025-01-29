/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './submodules/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      alpha: ['Nunito', ...defaultTheme.fontFamily.sans],
      heading: ['Sen', ...defaultTheme.fontFamily.sans]
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem', // 20px
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '4.5xl': '2.5rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '6.5xl': '4rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    },
    extend: {
      colors: {
        // Set admin colours and the fallback values (This should be the same in every project)
        nsAdmin: {
          50: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 90%, var(--tw-bg-opacity, 1))`,
          100: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 87%, var(--tw-bg-opacity, 1))`,
          200: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 74%, var(--tw-bg-opacity, 1))`,
          300: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 61%, var(--tw-bg-opacity, 1))`,
          400: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 48%, var(--tw-bg-opacity, 1))`,
          DEFAULT: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 35%), var(--tw-bg-opacity, 1))`,
          600: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 28%, var(--tw-bg-opacity, 1))`,
          700: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 21%, var(--tw-bg-opacity, 1))`,
          800: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 14%, var(--tw-bg-opacity, 1))`,
          900: `hsla(var(--color-admin-h, 232), var(--color-admin-s, 57%), 7%, var(--tw-bg-opacity, 1))`
        },
        nsAdminHex: '#0C102C',

        // Client specific colours
        alpha: {
          light: {
            100: '#E6F0FB',
            200: '#CCE2F7',
            300: '#B3D3F4',
            400: '#9AC5F0',
            500: '#81B6EC',
            600: '#67A7E8',
            700: '#4E99E4',
            800: '#358AE1',
            900: '#1B7CDD'
          },
          DEFAULT: '#026DD9',
          dark: {
            100: '#0262C3',
            200: '#0257AE',
            300: '#014C98',
            400: '#014182',
            500: '#01376D',
            600: '#012C57',
            700: '#012141',
            800: '#00162B',
            900: '#000B16'
          }
        },
        bravo: {
          light: {
            100: '#E88D3F',
            200: '#EA9955',
            300: '#EDA66A',
            400: '#EFB37F',
            500: '#F2C095',
            600: '#F5CCAA',
            700: '#F7D9BF',
            800: '#FAE6D4',
            900: '#FCF2EA'
          },
          DEFAULT: '#E5802A',
          dark: {
            100: '#170D04',
            200: '#2E1A08',
            300: '#45260D',
            400: '#5C3311',
            500: '#734015',
            600: '#894D19',
            700: '#A05A1D',
            800: '#B76622',
            900: '#CE7326'
          }
        },
        charlie: {
          DEFAULT: '#FFED00'
        },
        error: {
          DEFAULT: '#EA4335',
          light: '#ECADA7',
          lightest: '#FDF7F7',
          dark: '#773B35',
          darkest: '#231F1F'
        },
        success: {
          DEFAULT: '#34A853',
          light: '#C2ECA7',
          lightest: '#e7f7dc',
          dark: '#417735',
          darkest: '#231F20'
        },
        warning: {
          DEFAULT: '#B37730',
          light: '#ECCDA7',
          lightest: '#F7EBDC',
          dark: '#775935',
          darkest: '#23211F'
        },
        gray: colors.neutral
      },

      lineHeight: {
        heading: '1.4'
      },

      maxWidth: {
        '8xl': '1440px',
        '9xl': '1680px',
        '10xl': '1920px'
      },
      screens: {
        xs: '390px'
      },
      spacing: {
        4.5: '1.125rem',
        header: '6rem',
        'content-area': 'calc(100dvh - 6rem)',
        conversation: 'calc(100dvh - 15px)',
        screen: '100dvh'
      },
      minHeight: {
        screen: '100dvh'
      }
    }
  },
  plugins: []
};
