module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/assets/img/pattern-bg.png')",
      },
      fontFamily: {
       Rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
}