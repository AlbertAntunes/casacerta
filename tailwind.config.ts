// tailwind.config.js
// Arquivo: /tailwind.config.js (raiz do projeto)
// ─────────────────────────────────────────────────────────────

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Suporte a dark mode via atributo data-theme
  darkMode: ['class', '[data-theme="dark"]'],

  theme: {
    extend: {

      // ── Fontes ──────────────────────────────────────────────
      fontFamily: {
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      // ── Cores via CSS Variables ──────────────────────────────
      // Permite usar bg-bg, text-text, border-border etc.
      colors: {
        bg:    'var(--bg)',
        bg2:   'var(--bg2)',
        bg3:   'var(--bg3)',
        card:  'var(--card)',
        card2: 'var(--card2)',

        border:       'var(--border)',
        'border-hover': 'var(--border-hover)',

        text:        'var(--text)',
        text2:       'var(--text2)',
        text3:       'var(--text3)',
        'text-muted': 'var(--text-muted)',

        green: {
          DEFAULT: 'var(--green)',
          glow:    'var(--green-glow)',
          50:  'var(--green-50)',
          100: 'var(--green-100)',
          200: 'var(--green-200)',
          300: 'var(--green-300)',
          400: 'var(--green-400)',
          500: 'var(--green-500)',
          600: 'var(--green-600)',
          700: 'var(--green-700)',
          800: 'var(--green-800)',
          900: 'var(--green-900)',
          950: 'var(--green-950)',
        },

        success: 'var(--success)',
        warning: 'var(--warning)',
        danger:  'var(--danger)',
        info:    'var(--info)',
      },

      // ── Border Radius ────────────────────────────────────────
      borderRadius: {
        xs:   'var(--radius-xs)',
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        full: 'var(--radius-full)',
      },

      // ── Box Shadows ──────────────────────────────────────────
      boxShadow: {
        sm:       'var(--shadow-sm)',
        md:       'var(--shadow-md)',
        lg:       'var(--shadow-lg)',
        xl:       'var(--shadow-xl)',
        green:    'var(--shadow-green)',
        'green-lg': 'var(--shadow-green-lg)',
      },

      // ── Transições ───────────────────────────────────────────
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // ── Animações ────────────────────────────────────────────
      animation: {
        'fade-up':     'fadeUp 0.5s ease forwards',
        'fade-in':     'fadeIn 0.4s ease forwards',
        'scale-in':    'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'pulse-green': 'pulseGreen 2.5s ease-in-out infinite',
        'marquee':     'marquee 18s linear infinite',
        'shimmer':     'shimmer 1.5s infinite',
      },

      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.4)' },
          '50%':      { boxShadow: '0 0 0 16px rgba(34,197,94,0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to:   { backgroundPosition: '-200% 0' },
        },
      },

      // ── Tamanhos customizados ────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '120': '30rem',
      },

      // ── Backdrop blur ────────────────────────────────────────
      backdropBlur: {
        xs: '2px',
      },

      // ── Typography scale ──────────────────────────────────────
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem',     { lineHeight: '1.5rem' }],
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],
        'xl':   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':  ['1.5rem',   { lineHeight: '2rem' }],
        '3xl':  ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':  ['2.25rem',  { lineHeight: '2.5rem' }],
        '5xl':  ['3rem',     { lineHeight: '1' }],
        '6xl':  ['3.75rem',  { lineHeight: '1' }],
        '7xl':  ['4.5rem',   { lineHeight: '1' }],
        '8xl':  ['6rem',     { lineHeight: '1' }],
      },

      // ── Grid columns ─────────────────────────────────────────
      gridTemplateColumns: {
        'auto-fill-card': 'repeat(auto-fill, minmax(300px, 1fr))',
        'auto-fill-sm':   'repeat(auto-fill, minmax(200px, 1fr))',
      },
    },
  },

  plugins: [
    // Descomente se usar forms/typography do Tailwind:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
};
