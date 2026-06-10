---
project: prorab-landing
layer: 2 — SPECIFICATION
version: 0.1
date: 2026-06-02
status: draft
depends_on: PROJECT_IDEA.md (v0.1)
---

# SPECIFICATION — Лендинг прораба

> Layer 2 по Spec-First. Технический чертёж: данные с типами, контракт API,
> раскадровка анимаций, edge cases. Без TODO-заглушек — каждый пункт реализуем
> без уточнений. Контент с пометкой `[КОНТЕНТ]` заполняет прораб, структура — нет.

---

## 00. Глобальные требования

- **Стек:** Next.js 14+ (App Router), TypeScript (strict), Tailwind CSS.
- **Анимации:** Framer Motion (входы, layout), GSAP + ScrollTrigger (скролл,
  параллакс, before/after), Lenis (smooth scroll).
- **Деплой:** Vercel. БД нет.
- **Адаптив:** mobile-first. Брейкпоинты: `sm 640 / md 768 / lg 1024 / xl 1280`.
- **Перф-бюджет:** LCP < 2.5s, CLS < 0.1, JS на старте < 150 КБ gzip.
  Картинки — `next/image`, `loading="lazy"`, AVIF/WebP. Шрифты — `next/font`, `display: swap`.
- **Доступность:** контраст AA, видимый `:focus`, навигация с клавиатуры,
  `aria-live` для результата формы, `prefers-reduced-motion` уважается везде.
- **SEO:** `<title>` + meta description, OG-картинка, JSON-LD `LocalBusiness`
  (имя, телефон, зона работ, geo), `sitemap.xml`, `robots.txt`.

---

## 01. Дизайн-токены

> v0.2: направление изменено по решению заказчика — Apple «liquid glass»
> (glassmorphism, тёмный), референс: тёмный kanban-дашборд на блюренном фото.
> Параметры стекла — из ui-ux-pro-max (Glassmorphism / Spatial UI VisionOS).

Фиксируется в `tailwind.config.ts` + утилиты `.glass` в `globals.css`:

- **Один режим — тёмный.** Фон: глубокий графит `base #07090E` + размытые
  «боке»-пятна (janтарь/слейт) как имитация блюренного фото объекта.
- **Стекло:** `backdrop-blur 24–40px + saturate(150–180%)`, заливка
  `white 6–12%`, бордер `white/10–15`, радиус `24px` (token-lg), мягкая тень.
- `colors`: base, ink, surface, accent (amber #F59E0B), text, text-muted
  (≥ 4.5:1 на base!), success, error — светлые варианты под тёмный фон.
- `font`: heading — Manrope (плотный гротеск, кириллица), body — Inter.
- Кнопки — «пилюли» (rounded-full): primary белая, glass полупрозрачная,
  accent янтарная (submit формы).
- Контраст AA проверяется на стекле поверх самых светлых пятен фона.

---

## 02. Структура страницы (порядок секций)

`Header → Hero → Услуги → Before/After → Этапы → Отзывы/Гарантия → Форма → Footer`

Якорная навигация в Header: Услуги · Работы · Этапы · Контакты + кнопка «Заявка»
(скроллит к форме).

---

## 03. Секции

### 3.1 Header
- **Данные:** лого/имя `text`, телефон `text (E.164)`, ссылки-якоря.
- **UI:** прозрачный поверх hero, при скролле > 80px — фон `surface` + тень.
- **Анимация:** появление фона на скролле (GSAP ScrollTrigger, 0.2s).
- **Edge:** на мобиле — бургер, меню оверлеем; телефон всегда виден (`tel:`).

### 3.2 Hero
- **Цель:** за 30 сек — кто, что, где, главный оффер, CTA.
- **Данные:** headline `[КОНТЕНТ]`, subline `[КОНТЕНТ]`, оффер (напр. «бесплатный
  замер за 24 ч») `[КОНТЕНТ]`, CTA-текст, фоновое фото/видео объекта.
- **UI:** крупный заголовок, 1 первичный CTA → форма, 1 вторичный → «Работы».
- **Анимация:** на загрузке — staggered fade-up (headline → subline → CTA),
  длительность 0.6s, easeOut, stagger 0.12s (Framer Motion). Фон — лёгкий
  параллакс при скролле (translateY, GSAP, scrub).
- **Edge:** если видео — постер-кадр + `prefers-reduced-motion` → статичное фото.

### 3.3 Услуги
- **Данные:** массив `Service[]`: `{ id: text, title: text, desc: text, icon: text, priceFrom?: number }` — 3–6 шт `[КОНТЕНТ]`.
- **UI:** сетка карточек (1 кол. mobile / 2 / 3). Цена опциональна («от N ₽» или скрыта).
- **Анимация:** reveal по скроллу — карточки translateY 40→0 + opacity 0→1,
  stagger 0.1s при попадании 20% в вьюпорт (ScrollTrigger).
- **Edge:** нечётное число карточек — последняя не растягивается; иконка-плейсхолдер если нет.

### 3.4 Before / After  ⭐ ключевая секция
- **Данные:** массив `Case[]`: `{ id, before: image, after: image, label?: text }` — 3–8 `[КОНТЕНТ]`.
- **UI:** интерактивный сравнительный слайдер (drag-ручка, `clip-path` поверх `after`).
  Поддержка мыши и тача. Подпись объекта.
- **Анимация:** при въезде в вьюпорт ручка авто-проезжает 50%→дальше→назад к центру
  (намёк на интерактив), 1.2s. Дальше — управление пользователем. ScrollTrigger.
- **Edge:** одно фото отсутствует → показываем только имеющееся, ручку прячем.
  На тач — ручка крупнее (44px target). reduced-motion → ручка сразу по центру, без авто-проезда.

### 3.5 Этапы работы
- **Данные:** `Step[]`: `{ n: number, title: text, desc: text }` — замер→смета→договор→ремонт→сдача.
- **UI:** горизонтальный таймлайн (desktop) / вертикальный (mobile).
- **Анимация:** линия «рисуется» по скроллу (GSAP drawSVG-подобно через stroke-dashoffset),
  шаги подсвечиваются по очереди.
- **Edge:** ≤ 3 шагов — центрируем; reduced-motion → линия сразу нарисована.

### 3.6 Отзывы / Гарантия
- **Данные:** `Review[]`: `{ author: text, text: text, rating?: number }` `[КОНТЕНТ]`;
  блок гарантии `{ years: number, text: text }`.
- **UI:** карусель/сетка отзывов + блок гарантии.
- **Анимация:** fade-in по скроллу; карусель — авто-прокрутка 5s, пауза на hover/focus.
- **Edge:** 0 отзывов → секция скрыта целиком.

### 3.7 Форма заявки  ⭐ конверсия
- **Поля (типы как в SQL для payload):**
  - `name` — `text`, required, 2–80 симв.
  - `phone` — `text`, required, нормализуется в E.164 (+7…), regex-валидация RU.
  - `service` — `enum` из `Service.id` (select), optional.
  - `comment` — `text`, optional, ≤ 1000 симв.
  - `consent` — `boolean`, required = true (согласие на обработку ПД, 152-ФЗ).
  - `hp` — `text`, honeypot (скрыто, должно быть пустым — анти-бот).
  - `meta` — `jsonb`: `{ source: text, utm?: object, createdAt: timestamptz, userAgent: text }`.
- **UI:** инлайн-валидация на blur, общий статус через `aria-live`, кнопка
  с состояниями `idle / loading / success / error`, дизейбл во время отправки.
- **Логика:** submit → `submitLead()` (см. §04). Успех → экран «Спасибо, перезвоним».
- **Edge:**
  - Невалидный телефон → ошибка под полем, фокус на поле.
  - Двойной клик / повторная отправка → кнопка дизейблится, идемпотентность по `meta`.
  - Ошибка сети → тост «не отправилось, попробуйте ещё / позвоните», данные не теряются.
  - Honeypot заполнен → молча «успех», лид не отправляется.

### 3.8 Плавающий CTA (v0.2, по референсу)
- **UI:** glass-«пилюля» внизу справа (как «Ask Addy» в референсе), ведёт на `#lead`.
- **Логика:** появляется после скролла за hero (~70% высоты вьюпорта).
- **Анимация:** scale+fade 0.25s (Framer Motion). reduced-motion → появление без анимации.
- **Edge:** touch-target ≥ 44px; не перекрывает поля формы на мобиле (z ниже хедера).

### 3.9 Footer
- **Данные:** телефон, мессенджеры (WhatsApp/Telegram `text url`), зона работ, год, ссылка на политику ПД.
- **UI:** контакты + повтор CTA. Ссылка «Политика обработки персональных данных» (нужна из-за `consent`).

---

## 04. Контракт `submitLead()`

Реализация — **Server Action** (Next.js), плюс тонкий route как фолбэк.

```
POST (Server Action)  submitLead(input: LeadInput): Promise<LeadResult>

LeadInput  = {
  name: string; phone: string; service?: string;
  comment?: string; consent: boolean; hp?: string; meta: Meta;
}
LeadResult = { ok: true } | { ok: false; error: ErrorCode }

ErrorCode =
  | "VALIDATION_ERROR"   // не прошла Zod-схема
  | "RATE_LIMITED"       // > N отправок с IP за окно
  | "DELIVERY_FAILED"    // канал доставки недоступен (v2)
  | "UNKNOWN"
```

- **Валидация:** Zod-схема на сервере (не доверяем клиенту). Телефон нормализуется
  до отправки. `consent !== true` → `VALIDATION_ERROR`.
- **Анти-спам:** honeypot + rate-limit по IP (напр. 5/час, in-memory/edge).
- **v1 (сейчас):** валидация → `console.info` структурированного лида → `{ ok: true }`.
  Канал доставки НЕ подключён.
- **v2 (отложено):** внутрь функции подключается провайдер (Telegram / Google Sheets /
  Email). Сигнатура `submitLead` **не меняется** — фронт не трогаем.
- **Ответ фронту:** только `ok`/`error`. Никаких данных лида обратно.

---

## 05. Анимации — сводка

| Где | Триггер | Эффект | Тайминг / easing | Либа |
|---|---|---|---|---|
| Hero | onLoad | stagger fade-up | 0.6s, easeOut, stagger 0.12 | Framer Motion |
| Hero фон | scroll | параллакс translateY | scrub | GSAP ScrollTrigger |
| Услуги | 20% в вьюпорте | fade-up карточек | 0.5s, stagger 0.1 | GSAP ST |
| Before/After | въезд | авто-проезд ручки | 1.2s | GSAP ST |
| Этапы | scroll | прорисовка линии | scrub | GSAP ST |
| Отзывы | въезд | fade-in + авто-карусель | 0.4s / 5s loop | Framer Motion |

**Глобально:** Lenis — smooth scroll. `prefers-reduced-motion: reduce` → все transform/scrub
отключаются, остаётся мгновенная opacity. Анимации не блокируют интерактив и LCP.

---

## 06. Глобальные edge cases

- JS отключён → форма работает как обычный POST (progressive enhancement), контент виден.
- Медленная сеть → скелетоны/постеры, без layout shift.
- Очень длинный контент в карточке → обрезка + «…».
- Дубли заявок → идемпотентность по `meta.createdAt + phone`.

---

## 07. Отложено в v2

Канал доставки заявок, дашборд прораба, загрузка фото через админку, аналитика
(Я.Метрика/Plausible — повесить на событие успешного `submitLead`).

---

## 08. Следующий шаг

Layer 3 — конфиг Claude Code: `CLAUDE.md` (≤120 строк) + субагенты
(`frontend-developer`, `backend-engineer` под `submitLead`, `qa-reviewer`,
`researcher`) + правила (Tailwind/линт) + MCP (Context7, Figma). Затем автосборка.
