'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

import { BeforeAfterSlider } from '@/components/sections/BeforeAfterSlider';
import { cases } from '@/lib/content';

// Секция «Работы» (спека §3.4). Один активный слайдер + glass-табы объектов.
export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const current = cases[active] ?? cases[0];

  if (!current) return null;

  return (
    <section id="works" className="py-20 sm:py-28">
      <div className="container-content">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Было / стало
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Потяните ручку, чтобы сравнить. Это реальные объекты — не рендеры.
          </p>
        </div>

        <div className="mt-10">
          <BeforeAfterSlider key={current.id} data={current} />
        </div>

        {cases.length > 1 && (
          <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Выбор объекта">
            {cases.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={clsx(
                  'min-h-[44px] rounded-full px-4 text-sm font-semibold transition-colors duration-200',
                  i === active
                    ? 'bg-white text-ink'
                    : 'border border-white/15 bg-white/[0.07] text-text-muted backdrop-blur-xl hover:bg-white/[0.14] hover:text-white',
                )}
              >
                {c.label ?? `Объект ${i + 1}`}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
