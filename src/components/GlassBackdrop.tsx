'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Единый фон всей страницы (референс: блюренное фото за стеклом).
// Имитация: тёмная база + крупные размытые «боке»-пятна (фонарь/огни/силуэты),
// CSS-дрейф + лёгкий GSAP-параллакс по скроллу. reduced-motion → статика
// (drift глушится глобальным media-query в globals.css, параллакс не вешаем).
export function GlassBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'max', scrub: 1.2 },
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-base">
      <div ref={ref} className="absolute -inset-[12%]">
        {/* «Фонарь» — тёплое пятно как на референсе */}
        <div className="animate-drift absolute right-[8%] top-[6%] h-[34rem] w-[34rem] rounded-full bg-accent/25 blur-[140px]" />
        {/* Холодные огни города */}
        <div className="animate-drift-slow absolute left-[-6%] top-[28%] h-[40rem] w-[40rem] rounded-full bg-sky-700/20 blur-[160px]" />
        <div className="animate-drift absolute bottom-[4%] left-[30%] h-[30rem] w-[30rem] rounded-full bg-slate-500/15 blur-[150px]" />
        {/* Размытые «силуэты зданий» */}
        <div className="absolute bottom-[-10%] left-[5%] h-[55%] w-[22%] rounded-[3rem] bg-white/[0.035] blur-[80px]" />
        <div className="absolute bottom-[-14%] right-[12%] h-[48%] w-[26%] rounded-[3rem] bg-white/[0.03] blur-[90px]" />
      </div>
      {/* Виньетка для контраста текста */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_40%,rgb(7_9_14/0.55)_100%)]" />
    </div>
  );
}
