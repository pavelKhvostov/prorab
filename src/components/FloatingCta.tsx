'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Icon } from '@/components/ui/Icon';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

// Плавающий CTA (спека §3.8, по референсу «Ask Addy»): glass-пилюля внизу
// справа, появляется после скролла за hero (~70% вьюпорта), ведёт на #lead.
// reduced-motion → появление без анимации.
export function FloatingCta() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
        >
          <a
            href="#lead"
            className="glass-deep inline-flex min-h-[48px] items-center gap-2.5 !rounded-full px-5 py-3 font-heading text-sm font-semibold text-white transition-colors duration-200 hover:border-accent/50"
          >
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            Оставить заявку
            <Icon name="check" className="h-4 w-4 text-accent" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
