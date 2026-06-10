'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { steps } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Этапы (спека §3.5): таймлайн (горизонтальный desktop / вертикальный mobile).
// Линия «рисуется» по скроллу (scrub), шаги подсвечиваются по очереди.
// reduced-motion → линия сразу нарисована, шаги видны.
export function Steps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const items = section.querySelectorAll<HTMLElement>('[data-step]');

    if (reducedMotion) {
      gsap.set(line, { scaleX: 1, scaleY: 1 });
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    const ctx = gsap.context(() => {
      gsap.set(line, isDesktop ? { scaleX: 0, transformOrigin: 'left center' } : { scaleY: 0, transformOrigin: 'top center' });
      gsap.to(line, {
        [isDesktop ? 'scaleX' : 'scaleY']: 1,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 70%', end: 'bottom 70%', scrub: true },
      });

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="steps" className="py-20 sm:py-28">
      <div className="container-content" ref={sectionRef}>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Как идёт работа
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Понятный процесс без сюрпризов: вы всегда знаете, что происходит и сколько стоит.
          </p>
        </div>

        <div className="relative mt-14">
          {/* Трек линии */}
          <span
            aria-hidden
            className="absolute left-5 top-0 h-full w-0.5 bg-white/10 md:left-0 md:top-6 md:h-0.5 md:w-full"
          />
          {/* Прогресс линии (анимируется) */}
          <span
            ref={lineRef}
            aria-hidden
            className="absolute left-5 top-0 h-full w-0.5 bg-accent md:left-0 md:top-6 md:h-0.5 md:w-full"
          />

          <ol className="relative grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-4">
            {steps.map((step) => (
              <li key={step.n} data-step className="relative pl-14 md:pl-0 md:pt-16">
                <span className="glass absolute left-0 top-0 flex h-11 w-11 items-center justify-center !rounded-full font-heading text-base font-bold text-accent">
                  {step.n}
                </span>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
