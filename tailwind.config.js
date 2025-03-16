/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.js",
    "./ui/**/*.js",
    "./colorMode.js"
  ],
  safelist: [
    "bg-gray-950",
    "bg-slate-200",
    "text-white",
    "bg-gray-900",
    "bg-slate-100"
  ],
  theme: {
    extend: {
      // Add any custom theme extensions here
    },
  },
  plugins: [
    // Add any plugins here
  ],
}