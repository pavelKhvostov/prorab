'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { Icon } from '@/components/ui/Icon';
import { reviews, guarantee } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Отзывы + гарантия (спека §3.6): карусель с авто-прокруткой 5s,
// пауза на hover/focus. Edge: 0 отзывов → секция скрыта целиком.
export function Reviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const count = reviews.length;

  useEffect(() => {
    if (count <= 1 || paused || reducedMotion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [count, paused, reducedMotion]);

  if (count === 0) return null;

  const current = reviews[active] ?? reviews[0];
  if (!current) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-content grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
        {/* Отзывы */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Отзывы клиентов
          </h2>

          <div aria-live="polite" className="glass mt-8 p-6 sm:p-8">
            {typeof current.rating === 'number' && (
              <div className="mb-3 flex gap-0.5 text-accent" aria-label={`Оценка ${current.rating} из 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className={clsx('h-5 w-5', i < current.rating! ? 'fill-accent' : 'opacity-25')} />
                ))}
              </div>
            )}
            <blockquote className="text-lg leading-relaxed text-text">«{current.text}»</blockquote>
            <figcaption className="mt-4 font-heading font-semibold text-white">— {current.author}</figcaption>
          </div>

          {count > 1 && (
            <div className="mt-4 flex gap-2" role="tablist" aria-label="Переключение отзывов">
              {reviews.map((r, i) => (
                <button
                  key={r.author}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Отзыв ${i + 1}`}
                  onClick={() => setActive(i)}
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <span className={clsx('block h-2.5 rounded-full transition-all duration-200', i === active ? 'w-6 bg-accent' : 'w-2.5 bg-white/25')} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Гарантия — стекло с янтарным свечением */}
        <div className="glass flex flex-col justify-center p-8 shadow-glow">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-token border border-accent/30 bg-accent/15 text-accent">
            <Icon name="shield" className="h-7 w-7" />
          </span>
          <p className="mt-5 font-heading text-4xl font-extrabold text-accent">{guarantee.years} года</p>
          <p className="mt-1 text-lg font-semibold text-white">гарантии на работы</p>
          <p className="mt-3 leading-relaxed text-text-muted">{guarantee.text}</p>
        </div>
      </div>
    </section>
  );
}
