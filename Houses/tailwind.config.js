/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", 'node_modules/flowbite-react/lib/esm/**/*.js',],
  theme: {
    screens: {
      xs: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    fontFamily: {
      'dela-gothic': ['"Dela Gothic One"', 'sans-serif'],
    },

    extend: {},
  },
  plugins: [require('flowbite/plugin'),],
};
