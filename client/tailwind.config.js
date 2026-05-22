/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        winner: '#4ade80',
        'winner-bg': 'rgba(34,197,94,0.12)',
        loser: 'rgba(248,113,113,0.7)',
        'loser-bg': 'rgba(239,68,68,0.10)',
        'draw-bg': 'rgba(234,179,8,0.08)',
        'draw-border': 'rgba(234,179,8,0.3)',
      },
    },
  },
  plugins: [],
}