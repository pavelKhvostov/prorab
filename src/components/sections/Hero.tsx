'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LinkButton } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { hero } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Hero (спека §3.2): staggered fade-up на загрузке (Framer Motion),
// лёгкий параллакс фона по скроллу (GSAP scrub). reduced-motion → статика.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = bgRef.current;
    if (!el || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-brand">
      {/* Фон + параллакс-слой. Декоративный градиент — без layout shift для LCP. */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 -z-10 scale-110 bg-[radial-gradient(120%_120%_at_70%_10%,#1E293B_0%,#0F172A_55%,#020617_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="container-content py-28">
        <motion.div
          variants={reducedMotion ? undefined : container}
          initial={reducedMotion ? false : 'hidden'}
          animate={reducedMotion ? undefined : 'show'}
          className="max-w-3xl"
        >
          <motion.p
            variants={reducedMotion ? undefined : item}
            className="mb-4 inline-flex items-center gap-2 rounded-token bg-accent/15 px-3 py-1.5 text-sm font-semibold text-accent"
          >
            <Icon name="check" className="h-4 w-4" />
            {hero.offer}
          </motion.p>

          <motion.h1
            variants={reducedMotion ? undefined : item}
            className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={reducedMotion ? undefined : item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {hero.subline}
          </motion.p>

          <motion.div variants={reducedMotion ? undefined : item} className="mt-9 flex flex-wrap gap-3">
            <LinkButton href="#lead" variant="primary">
              {hero.ctaPrimary}
            </LinkButton>
            <LinkButton href="#works" variant="ghost" className="text-white ring-white/25 hover:bg-white/10">
              {hero.ctaSecondary}
            </LinkButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
