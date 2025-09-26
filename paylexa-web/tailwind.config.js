/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        darkGold: '#C9A227',
        phoenixBlack: '#0B0B0C',
        phoenixWhite: '#FFFFFF',
        emerald: '#0FA77A',
        royalBlue: '#1B3B93',
      },
      borderRadius: {
        phoenix: '1.5rem',
      },
      boxShadow: {
        phoenix: '0 24px 48px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
