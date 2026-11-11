/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sneha: {
          red: '#DC2626',
          'red-dark': '#B91C1C',
          'red-glow': 'rgba(220, 38, 38, 0.35)',
          black: '#171717',
          'black-pure': '#0F0F0F',
          'card-bg': '#1E1E1E',
          'card-border': 'rgba(255, 255, 255, 0.08)',
          white: '#FFFFFF',
          pink: '#FEE2E2',
          'pink-subtle': '#FFF1F2',
          gray: '#71717A',
          'gray-light': '#A1A1AA',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.08)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        heartbeat: 'heartbeat 1.8s ease-in-out infinite',
      },
      boxShadow: {
        'red-neon': '0 0 25px rgba(220, 38, 38, 0.45)',
        'red-neon-lg': '0 0 50px rgba(220, 38, 38, 0.55)',
        'subtle-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};

