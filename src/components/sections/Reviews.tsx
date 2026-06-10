'use client';

import { useEffect, useRef, useState } from 'react';
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
  const liveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (count <= 1 || paused || reducedMotion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [count, paused, reducedMotion]);

  if (count === 0) return null;

  const current = reviews[active] ?? reviews[0];
  if (!current) return null;

  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="container-content grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
        {/* Отзывы */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">
            Отзывы клиентов
          </h2>

          <div ref={liveRef} aria-live="polite" className="mt-8 rounded-token-lg bg-bg p-6 shadow-token ring-1 ring-brand/5 sm:p-8">
            {typeof current.rating === 'number' && (
              <div className="mb-3 flex gap-0.5 text-accent" aria-label={`Оценка ${current.rating} из 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" className={clsx('h-5 w-5', i < current.rating! ? 'fill-accent' : 'opacity-25')} />
                ))}
              </div>
            )}
            <blockquote className="text-lg leading-relaxed text-text">«{current.text}»</blockquote>
            <figcaption className="mt-4 font-heading font-semibold text-brand">— {current.author}</figcaption>
          </div>

          {count > 1 && (
            <div className="mt-5 flex gap-2" role="tablist" aria-label="Переключение отзывов">
              {reviews.map((r, i) => (
                <button
                  key={r.author}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Отзыв ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={clsx(
                    'h-11 w-11 rounded-full',
                    'flex items-center justify-center',
                  )}
                >
                  <span className={clsx('block h-2.5 rounded-full transition-all duration-200', i === active ? 'w-6 bg-accent' : 'w-2.5 bg-brand/20')} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Гарантия */}
        <div className="flex flex-col justify-center rounded-token-lg bg-brand p-8 text-white shadow-token-lg">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-token bg-accent text-brand-dark">
            <Icon name="shield" className="h-7 w-7" />
          </span>
          <p className="mt-5 font-heading text-4xl font-extrabold text-accent">{guarantee.years} года</p>
          <p className="mt-1 text-lg font-semibold">гарантии на работы</p>
          <p className="mt-3 leading-relaxed text-white/75">{guarantee.text}</p>
        </div>
      </div>
    </section>
  );
}
