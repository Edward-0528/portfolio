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
        /* ── Clay & sage, dark register ──────────────────────────────
           Derived from the Core+ app's own approved palette so the
           portfolio and the product read as one body of work. These are
           additive: the light `surface` / `card` / `accent` tokens below
           still back the support and policy pages. */
        night: {
          DEFAULT: '#14110E',   // page base — warm near-black, never neutral
          900: '#0F0D0B',
          800: '#1A1612',       // raised band
          700: '#221D17',       // card
          600: '#2B251E',       // hover / inset
          line: '#322B23',      // hairline on dark
        },
        bone: {
          DEFAULT: '#F4EFE7',   // primary text on night
          sub: '#A8A096',       // body copy
          faint: '#8A827A',     // quiet third tier — ~5:1 on night, clears AA
        },
        sage: {
          DEFAULT: '#7E9C7F',
          light: '#A3C4A4',     // lifted for legibility on night
          deep: '#4D6B4F',
          glow: '#B8D9B9',
        },
        apricot: {
          DEFAULT: '#E8763A',
          light: '#F09A68',
          deep: '#9C4A1C',
        },
        honey: '#E3A93F',
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
        warm: {
          DEFAULT: '#E8956A',
          50: '#FDF5F0',
          100: '#FBEADF',
          200: '#F5D0B8',
          300: '#F0B690',
          400: '#E8956A',
          500: '#D4794E',
          600: '#BF5E33',
          soft: '#FDF5F0',
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
        'glow-blue': '0 0 60px rgba(107,164,212,0.15)',
        'glow-warm': '0 0 60px rgba(232,149,106,0.12)',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
      animation: {
        'marquee': 'marquee 38s linear infinite',
        'grain-shift': 'grainShift 8s steps(10) infinite',
        'glow-pulse': 'glowPulse 6s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'float': 'float 20s ease-in-out infinite',
        'float-delayed': 'float 25s ease-in-out 5s infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'tilt-in': 'tiltIn 0.4s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        grainShift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-2%, 3%)' },
          '40%': { transform: 'translate(3%, -2%)' },
          '60%': { transform: 'translate(-3%, -3%)' },
          '80%': { transform: 'translate(2%, 2%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.8' },
        },
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
        shimmer: {
          '0%, 100%': { opacity: '0.5', transform: 'translateX(-100%)' },
          '50%': { opacity: '1', transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(107,164,212,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(107,164,212,0.25)' },
        },
        tiltIn: {
          '0%': { opacity: '0', transform: 'perspective(800px) rotateY(-4deg) translateX(-20px)' },
          '100%': { opacity: '1', transform: 'perspective(800px) rotateY(0deg) translateX(0)' },
        },
      }
    },
  },
  plugins: [],
}

