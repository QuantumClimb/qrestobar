/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // ── Quantum Climb Theme Variable Surfaces ─────────────────
        qc: {
          base:      'var(--bg-primary)',
          surface:   'var(--bg-secondary)',
          card:      'var(--bg-card)',
          elevated:  'var(--bg-elevated)',
          overlay:   'var(--overlay-color)',
        },
        // ── QC Text Scale ─────────────────────────────────────────
        'qc-primary':   'var(--text-primary)',
        'qc-secondary': 'var(--text-secondary)',
        'qc-body':      'var(--text-secondary)',
        'qc-muted':     'var(--text-muted)',
        // ── QC Purple Spectrum ────────────────────────────────────
        purple: {
          950: '#1A0533',
          900: '#2D0A5C',
          800: '#3D0F7A',
          700: '#5B21B6',
          600: '#7C3AED',   // primary purple
          500: '#8B5CF6',   // bright ultraviolet
          400: '#A855F7',
          300: '#D8B4FE',
          200: '#EDE9FE',
          100: '#F5F3FF',
        },
        // ── QC Border Scale ───────────────────────────────────────
        border: {
          base:   'var(--border-default)',
          strong: 'var(--border-strong)',
          purple: 'var(--accent-primary)',
        },
        // ── Status indicators ─────────────────────────────────────
        success: {
          900: '#022C22',
          600: '#059669',
          400: '#34D399',
        },
        error: {
          900: '#450A0A',
          600: '#DC2626',
          400: '#F87171',
        },
        // ── Aliases mapped to semantic variables ──────────────────
        charcoal: {
          950: 'var(--bg-primary)',
          900: 'var(--bg-secondary)',
          850: 'var(--bg-card)',
          800: 'var(--bg-elevated)',
          700: 'var(--border-default)',
          600: 'var(--border-strong)',
        },
      },
      fontFamily: {
        // Space Grotesk — headings, navigation, display
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        // Inter — body copy
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        // IBM Plex Mono — technical labels, prices, metadata
        mono:    ['"IBM Plex Mono"', 'monospace'],
        // Cinzel / classic serif for logo
        serif:   ['"Cinzel"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tight-display': '-0.02em',
        'label':          '0.08em',
        'widest-plus':    '0.20em',
        'luxury':         '0.12em',
      },
      boxShadow: {
        'purple-glow':    '0 0 20px rgba(124, 58, 237, 0.28)',
        'purple-subtle':  '0 4px 20px -2px rgba(124, 58, 237, 0.15)',
        'dark-elevation': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'gold-subtle':    '0 4px 20px -2px rgba(124, 58, 237, 0.12)',
        'gold-glow':      '0 0 20px rgba(124, 58, 237, 0.28)',
      },
    },
  },
  plugins: [],
}
