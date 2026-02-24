/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Expo Router
    "./components/**/*.{js,jsx,ts,tsx}",
    // Add other folders as needed
  ],
  presets: [require("nativewind/preset")], // ← This line is mandatory for v4!
  theme: {
    extend: {},
  },
  plugins: [],
};
