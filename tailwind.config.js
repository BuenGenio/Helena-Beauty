/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1c1917",
          muted: "#57534e",
        },
        sand: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e6dfd2",
          300: "#d4c7b4",
        },
        sage: {
          500: "#6b7f6a",
          600: "#556654",
          700: "#455244",
        },
      },
    },
  },
  plugins: [],
};
