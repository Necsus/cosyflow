/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cozy: {
          cream: '#FFF8E7',
          beige: '#F5E6D3',
          peach: '#FFD4B2',
          coral: '#FFAB91',
          brown: '#8B7355',
          darkbrown: '#5D4E37',
          lavender: '#E6D9F5',
          mint: '#D4F1D4',
          rose: '#FFE4E1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'cozy': '0 4px 6px -1px rgba(139, 115, 85, 0.1), 0 2px 4px -1px rgba(139, 115, 85, 0.06)',
        'cozy-lg': '0 10px 15px -3px rgba(139, 115, 85, 0.1), 0 4px 6px -2px rgba(139, 115, 85, 0.05)',
      },
    },
  },
  plugins: [],
}
