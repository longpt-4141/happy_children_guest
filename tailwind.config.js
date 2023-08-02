/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
let plugin = require('tailwindcss/plugin')
const screenKeys = Array.from({length: 20}, (_, i) => i*5)
const screenSizes = screenKeys.reduce((v, key) => Object.assign(v, {[key]: key}), {});

module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        trueGray: colors.neutral,
        mainPink: '#F89A85',
        textBlack: '#171b1d',
        subPink: "#FEE8C2",
        mainOrange: "#EB6446",
      },
      keyframes: {
        menuIn: {
          '0%': { transform: 'translateX(300px)', opacity : 0 },
          '50%': { transform: 'translateX(150px) ',  opacity : 0.5 },
          '100%': { transform: 'translateX(0)' , opacity : 1},
        }
      },
      animation: {
        menuIn: 'menuIn 1s ease-in-out',
      }
    },
    fontFamily: {
      sans: ["Lato", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans],
      Montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
      DancingScripts: ["Dancing Script", ...defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio"),
  plugin(function ({matchUtilities, theme}) {
    matchUtilities(
      {
        'w-screen': width => ({
          width: `${width}vw`
        })
      },
      { values: Object.assign(screenSizes, theme('screenSize', {})) }
    ),
    matchUtilities(
      {
        'h-screen': height => ({
          height: `${height}vh`
        })
      },
      { values: Object.assign(screenSizes, theme('screenSize', {})) }
    )
  })
],
};