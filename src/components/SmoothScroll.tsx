'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Глобальный smooth-scroll. Один инстанс на приложение (.claude/rules/animations.md).
// При reduced-motion Lenis не запускается — остаётся нативный скролл.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
