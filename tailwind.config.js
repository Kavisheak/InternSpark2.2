/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        royalblue: "#2128BD",
        oxfordblue: "#01165A",
      },
    },
  },
  plugins: [],
};
