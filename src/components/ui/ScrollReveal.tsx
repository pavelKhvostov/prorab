'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Reveal по скроллу через GSAP ScrollTrigger (.claude/rules/animations.md: скролл = GSAP).
// Анимирует прямых детей: translateY 40→0 + opacity 0→1 со stagger.
// reduced-motion → конечное состояние сразу, без transform.
type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  /** Селектор детей для анимации; по умолчанию — прямые потомки. */
  selector?: string;
};

export function ScrollReveal({
  children,
  className,
  stagger = 0.1,
  selector = ':scope > *',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(selector);
    if (targets.length === 0) return;

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%', // 20% секции в вьюпорте
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reducedMotion, stagger, selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
