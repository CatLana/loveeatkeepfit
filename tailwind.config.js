/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        coral: "#E85C4A",
        peach: "#F4A88A",
        sunset: "#F7C86A",
        warmwhite: "#FFF9F4",
        beige: "#F2E8DA",
        charcoal: "#3A2F2A",
        leaf: "#7BAF7B",
        darkgreen: "#4F7A4F"
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(58, 47, 42, 0.12)"
      }
    }
  },
  plugins: []
};
