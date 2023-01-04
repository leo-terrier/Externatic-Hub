/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        maxHeight: "max-height",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};