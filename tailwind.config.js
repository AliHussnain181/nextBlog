/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    fontFamily:{
      Roboto:['Roboto', 'sans-serif'],
      Sofia:['Princess Sofia', 'cursive'],
      Outfit:['Outfit', 'sans-serif'],
      Sf:["sofia-pro" ,"sans-serif"]
    },
  },  
  plugins: [
  ],
}