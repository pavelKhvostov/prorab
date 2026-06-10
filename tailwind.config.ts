import type { Config } from 'tailwindcss';

// Дизайн-токены v0.2 — Apple «liquid glass», тёмный режим (SPECIFICATION.md §01).
// Параметры стекла — из ui-ux-pro-max (Glassmorphism / Spatial UI VisionOS),
// сами glass-утилиты собраны в globals.css (@layer components → .glass*).
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#07090E', // фон страницы — глубокий графит
        ink: '#0B1016', // текст на белых/янтарных кнопках
        surface: '#11161F', // непрозрачная подложка (меню, фолбэки)
        accent: {
          DEFAULT: '#F59E0B',
          dark: '#B45309',
        },
        text: {
          DEFAULT: '#F2F5FA',
          muted: '#9DA9BC', // ≥ 4.5:1 на base
        },
        success: '#34D399',
        error: '#F87171',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        token: '1rem',
        'token-lg': '1.5rem', // 24px — радиус стекла (VisionOS)
      },
      boxShadow: {
        token: '0 8px 32px rgb(0 0 0 / 0.35)',
        'token-lg': '0 16px 48px -12px rgb(0 0 0 / 0.55)',
        glow: '0 0 48px -8px rgb(245 158 11 / 0.35)',
      },
      maxWidth: {
        content: '72rem',
      },
      transitionTimingFunction: {
        token: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
