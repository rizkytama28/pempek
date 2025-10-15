/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#222831',
        'surface': '#393E46',
        'primary': '#D65A31',
        'text-main': '#EEEEEE',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Alegreya', 'serif'],
      }
    },
  },
  plugins: [],
}