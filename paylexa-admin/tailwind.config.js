/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        darkGold: '#C9A227',
        phoenixBlack: '#0B0B0C',
        emerald: '#0FA77A',
        royalBlue: '#1B3B93',
      },
      borderRadius: {
        phoenix: '1.25rem',
      },
    },
  },
  plugins: [],
};
