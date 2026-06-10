'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { Case } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Сравнительный слайдер «было/стало» (спека §3.4).
// Поддержка мыши и тача (Pointer Events), клавиатуры (role=slider).
// При въезде в вьюпорт — авто-проезд ручки 50→дальше→центр (намёк на интерактив).
// Edge: одно фото отсутствует → показываем имеющееся, ручку прячем.
export function BeforeAfterSlider({ data }: { data: Case }) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // % раскрытия «после»
  const draggingRef = useRef(false);
  const interactedRef = useRef(false);

  const hasBoth = Boolean(data.before && data.after);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!hasBoth) return;
    draggingRef.current = true;
    interactedRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!hasBoth) return;
    if (e.key === 'ArrowLeft') {
      interactedRef.current = true;
      setPos((p) => Math.max(0, p - 4));
    } else if (e.key === 'ArrowRight') {
      interactedRef.current = true;
      setPos((p) => Math.min(100, p + 4));
    }
  };

  // Авто-проезд при первом появлении в вьюпорте.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !hasBoth) return;
    if (reducedMotion) {
      setPos(50);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const proxy = { v: 50 };
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          if (interactedRef.current) return;
          gsap
            .timeline()
            .to(proxy, {
              v: 72,
              duration: 0.6,
              ease: 'power2.inOut',
              onUpdate: () => {
                if (!interactedRef.current) setPos(proxy.v);
              },
            })
            .to(proxy, {
              v: 50,
              duration: 0.6,
              ease: 'power2.inOut',
              onUpdate: () => {
                if (!interactedRef.current) setPos(proxy.v);
              },
            });
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reducedMotion, hasBoth]);

  // Edge: только одно фото.
  if (!hasBoth) {
    const single = data.after || data.before;
    return (
      <figure className="overflow-hidden rounded-token-lg shadow-token">
        <div className="relative aspect-[4/3]">
          <Image src={single} alt={data.label ?? 'Объект'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
        </div>
        {data.label && <figcaption className="bg-surface px-4 py-3 text-sm text-text-muted">{data.label}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-token-lg shadow-token">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] cursor-ew-resize select-none touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Нижний слой — «после» */}
        <Image src={data.after} alt={`После: ${data.label ?? ''}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" priority={false} />
        <span className="pointer-events-none absolute right-3 top-3 rounded-token bg-success/90 px-2.5 py-1 text-xs font-semibold text-white">
          После
        </span>

        {/* Верхний слой — «до», обрезается по позиции ручки */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={data.before} alt={`До: ${data.label ?? ''}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          <span className="pointer-events-none absolute left-3 top-3 rounded-token bg-brand/90 px-2.5 py-1 text-xs font-semibold text-white">
            До
          </span>
        </div>

        {/* Ручка (touch-target ≥44px) */}
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Сравнение до и после${data.label ? `: ${data.label}` : ''}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% «после»`}
          onKeyDown={onKeyDown}
          className="absolute top-0 z-10 flex h-full w-11 -translate-x-1/2 cursor-ew-resize items-center justify-center focus-visible:outline-none"
          style={{ left: `${pos}%` }}
        >
          <span aria-hidden className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white" />
          <span aria-hidden className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand shadow-token-lg ring-1 ring-brand/10">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7 4 12l5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
      </div>
      {data.label && <figcaption className="bg-surface px-4 py-3 text-sm text-text-muted">{data.label}</figcaption>}
    </figure>
  );
}
