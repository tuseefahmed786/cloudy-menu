/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        xs: '355px', // Example of a custom breakpoint
      }
    },
  },
  plugins: [],
}
