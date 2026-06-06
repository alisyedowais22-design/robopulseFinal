/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#05060A',
        'bg-secondary': '#0A0C14',
        'bg-card': '#0D1020',
        'bg-hover': '#10131E',
        'accent-teal': '#00F0C8',
        'accent-pink': '#FF4060',
        'accent-purple': '#6C63FF',
        'accent-gold': '#F5C842',
        'text-primary': '#E8EAF0',
        'text-secondary': '#A7B0C8',
        'text-muted': '#7F8AA8',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        heading: '0.06em',
      },
      boxShadow: {
        'teal-glow': '0 0 20px rgba(0,240,200,0.15)',
        'teal-glow-lg': '0 0 40px rgba(0,240,200,0.2)',
        'pink-glow': '0 0 20px rgba(255,64,96,0.15)',
        'purple-glow': '0 0 20px rgba(108,99,255,0.15)',
        'gold-glow': '0 0 20px rgba(245,200,66,0.15)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.3, transform: 'scale(0.8)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}