import type { Config } from 'tailwindcss';

// Дизайн-токены — единственный источник стиля (SPECIFICATION.md §01).
// Палитра: Swiss-минимализм, navy + amber-акцент. Сгенерировано ui-ux-pro-max,
// зафиксировано в design-system/prorab-landing/MASTER.md.
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0F172A', // navy — доверие
          dark: '#020617',
        },
        accent: {
          DEFAULT: '#F59E0B', // amber — строительный CTA-акцент
          dark: '#B45309',
        },
        bg: '#F8FAFC',
        surface: '#FFFFFF',
        text: {
          DEFAULT: '#020617',
          muted: '#475569', // slate-600 — AA на bg
        },
        success: '#16A34A',
        error: '#DC2626',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        token: '0.5rem',
        'token-lg': '0.875rem',
      },
      boxShadow: {
        token: '0 1px 2px 0 rgb(2 6 23 / 0.06), 0 4px 16px -4px rgb(2 6 23 / 0.10)',
        'token-lg': '0 8px 32px -8px rgb(2 6 23 / 0.18)',
      },
      maxWidth: {
        content: '72rem', // max-w-content — единый контейнер
      },
      transitionTimingFunction: {
        token: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
