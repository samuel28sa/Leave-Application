/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E17F31",
        secondary: "#FFF7ED",
      },
    },
  },
  plugins: [],
};
