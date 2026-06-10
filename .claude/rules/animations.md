---
glob: "src/**/*.{tsx,ts}"
---

# Анимации

## Разделение либ
- **Framer Motion** — входы компонентов, layout-анимации, simple gestures.
- **GSAP + ScrollTrigger** — скролл-driven анимации, параллакс, прорисовка SVG, сложные таймлайны.
- **Lenis** — глобальный smooth scroll. Один инстанс на приложение, в layout.

Не смешиваем оба источника на одной анимации. Скролл = GSAP. Появление по mount = Framer Motion.

## Reduced-motion — обязателен
Перед запуском любой анимации проверяем `window.matchMedia('(prefers-reduced-motion: reduce)').matches`. Если `true` — конечное состояние применяется мгновенно, без transform/scrub. Тестим переключение системной настройки.

## Перф
- Анимации не блокируют LCP. Hero-контент рендерится сразу, анимация — поверх готового layout.
- Анимируем `transform` и `opacity`. `top/left/width/height` — нет.
- ScrollTrigger-инстансы убиваем в cleanup (`return () => st.kill()`).

## Тайминги — из спеки
Длительности и easing берём из `SPECIFICATION.md` §05. Не подкручиваем «на глаз». Если нужно изменить — сначала правим спеку, потом код.
