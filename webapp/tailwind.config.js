const { ruby, blackA } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        ...ruby,
        ...blackA
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
}

