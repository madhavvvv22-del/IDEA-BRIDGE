/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#0a0b14',
          panel: '#121426',
          panelHover: '#1a1e36',
          border: '#2a2f58',
          accent: '#6366f1',
          gold: '#f59e0b',
          neonCyan: '#06b6d4',
          neonPink: '#ec4899',
          neonGreen: '#10b981',
          mana: '#3b82f6',
          danger: '#ef4444'
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace', 'system-ui'],
        game: ['"VT323"', '"Courier New"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.45)',
        'neon-gold': '0 0 15px rgba(245, 158, 11, 0.45)',
        'neon-pink': '0 0 15px rgba(236, 72, 153, 0.45)',
        'neon-green': '0 0 15px rgba(16, 185, 129, 0.45)',
        'retro-border': '4px 4px 0px 0px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
