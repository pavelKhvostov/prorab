'use client';

import { motion } from 'framer-motion';

import { LinkButton } from '@/components/ui/Button';
import { hero } from '@/lib/content';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Hero (спека §3.2): staggered fade-up на загрузке (Framer Motion, 0.6s/0.12).
// Фон-параллакс живёт в GlassBackdrop (общий для страницы). reduced-motion → статика.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center">
      <div className="container-content pb-20 pt-32">
        <motion.div
          variants={reducedMotion ? undefined : container}
          initial={reducedMotion ? false : 'hidden'}
          animate={reducedMotion ? undefined : 'show'}
          className="max-w-3xl"
        >
          <motion.p
            variants={reducedMotion ? undefined : item}
            className="glass mb-5 inline-flex items-center gap-2.5 !rounded-full px-4 py-2 text-sm font-semibold text-white"
          >
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            {hero.offer}
          </motion.p>

          <motion.h1
            variants={reducedMotion ? undefined : item}
            className="text-balance text-4xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[4.25rem]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={reducedMotion ? undefined : item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted"
          >
            {hero.subline}
          </motion.p>

          <motion.div variants={reducedMotion ? undefined : item} className="mt-9 flex flex-wrap gap-3">
            <LinkButton href="#lead" variant="primary">
              {hero.ctaPrimary}
            </LinkButton>
            <LinkButton href="#works" variant="glass">
              {hero.ctaSecondary}
            </LinkButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
