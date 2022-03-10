const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          10: '#e5eaef',
          50: '#31a4d0',
          400: '#55656a',
          450: '#203446',
          900: '#0b252e',
        },
        green: {
          50: '#E4F7FE',
        },
        pink: {
          50: '#FBE0E9',
        },
        gray: {
          50: '#bdcfd4',
          100: '#f9fafb',
          200: '#F8F9FA',
          300: '#f5f7f9',
          500: '#7B7B7B',
          
        },
        primary: '#31a4d0'
      }
    },
  },
  variants: {
    variants: {
      float: ['responsive', 'direction'],
      margin: ['responsive', 'direction'],
      padding: ['responsive', 'direction'],
    },
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-rtl'),
    require('tailwindcss-dir')(),
    plugin(function ({ addComponents, theme }) {
      addComponents({
        "input[type='text'], [type='email'], [type='search'],[type='url'], [type='password'],[type='tel']": {

          'paddingTop': '12px',
          'paddingBottom': '20px',
          'paddingRight': '0',
          'paddingLeft': '0',
          'marginTop': theme('spacing.1'),
          'borderColor': theme('colors.gray.50'),
          'borderTopWidth': '0',
          'borderLeftWidth': '0',
          'borderRightWidth': '0',
          'display': 'block',
          'width': '100%',
          '&:focus': {
            '--tw-ring-color': theme('colors.blue.50'),
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
            'border-bottom-color': theme('colors.blue.50'),

          },
        },
        "textarea": {
          'width': '100%',
          'borderColor': '#cccccc',
          'borderTopWidth': '0',
          'borderLeftWidth': '0',
          'borderRightWidth': '0',
          '&:focus': {
            '--tw-ring-color': theme('colors.blue.50'),
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
            'border-color': theme('colors.blue.50'),
          },
        },
        "select": {
          'padding': '0px',
          'borderColor': theme('colors.gray.50'),
          'borderTopWidth': '0',
          'borderLeftWidth': '0',
          'borderRightWidth': '0',
          'display': 'block',
          'width': '100%',
          '&:focus': {
            '--tw-ring-color': 'transparent',
            '--tw-ring-offset-shadow': 'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
            '--tw-ring-shadow': 'var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
            'box-shadow': 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
            'border-bottom-color': 'transparent',

          },
        },
        "[type='checkbox']": {
          'marginRight': '6px',
          'borderRadius': '3px',
          'color': theme('colors.primary')
        },
        "[type='radio']": {
          'marginRight': '14px',
        },
        "[type='radio']:checked": {
          'backgroundColor': 'black',
          'background-image': 'none',
        },
        "[type='radio']:checked:hover": {
          'backgroundColor': 'black',
        },
        "[type='radio']:checked:focus": {
          'backgroundColor': 'black',
        },



        ".btn": {
          'display': 'inline-block',
          'padding': `1rem 4rem`,
          'borderRadius': theme('borderRadius.full'),
          'borderColor': theme('colors.blue.50'),
          'borderStyle': 'solid',
          'borderWidth': '1px',
          'cursor': 'pointer',
          'fontSize': '1.5rem'
        },
        ".btn.xs": {
          'padding': '0.3rem 0.6rem',
          'borderRadius': theme('borderRadius.full'),
          'fontSize': '12px',
        },
        ".btn:hover": {
          'backgroundColor': theme('colors.primary'),
          'color': 'white',
        },
        ".btn.primary": {
          'backgroundColor': theme('colors.blue.50'),
          'color': 'white',
          'borderWidth': '0',
        },
        ".btn.primary:hover": {
          'backgroundColor': 'black',
          'color': 'white',
        },

        ".btn.danger": {
          'backgroundColor': theme('colors.red.500'),
          'color': 'white',
          'borderColor': theme('colors.red.500')
        },
        ".btn.danger:hover": {
          'backgroundColor': 'white',
          'color': theme('colors.red.500'),
        },

      })
    })
    // ...
  ],
}
