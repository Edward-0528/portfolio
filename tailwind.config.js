/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'mono': ['SF Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#6BA4D4',
          50: '#F0F7FC',
          100: '#E1EFF9',
          200: '#C3DFF3',
          300: '#A5CFED',
          400: '#87BFE7',
          500: '#6BA4D4',
          600: '#4A89BF',
          soft: '#E8F2FA',
        },
        neutral: {
          850: '#F0F4F8',
          950: '#F8FAFB',
        },
        // Design tokens — Apple 2026 light theme
        surface: '#F8FAFB',           // page background
        'surface-alt': '#F0F4F8',     // alternate section background
        card: '#FFFFFF',               // card / panel background
        border: '#E2E8F0',            // default border
        'text-primary': '#1A1A2E',    // headings
        'text-secondary': '#5B6B7D',  // body text
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
        'card': '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 12px 36px rgba(0,0,0,0.08)',
        'glow': '0 0 60px rgba(107,164,212,0.10)',
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 25s ease-in-out 5s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
      }
    },
  },
  plugins: [],
}

