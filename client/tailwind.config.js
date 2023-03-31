/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './src/**/*.{html,jsx,js}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'default': '0px 2px 4px rgba(0,0,0,0.68)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

