import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        logo: '#009ED8',
        primary: {
          200: '#93BDF8',
          500: '#1570EF',
          600: '#1366D9',
          700: '#0F50AA'
        },
        grey: {
          50: '#F0F1F3',
          100: '#D0D3D9',
          300: '#989FAD',
          400: '#858D9D',
          500: '#667085',
          600: '#5D6679',
          700: '#48505E',
          800: '#383E49',
          900: '#2B2F38'
        },
        error: {
          50: '#FEECEB',
          400: '#F36960',
          700: '#AA3028'
        }

      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
}
