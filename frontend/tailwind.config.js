/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        jost: ["jost", "sans-serif"],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
