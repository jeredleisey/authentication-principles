/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'concert-one': ['Concert\\ One', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
