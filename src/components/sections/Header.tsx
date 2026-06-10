'use client';

import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

import { Icon } from '@/components/ui/Icon';
import { contacts } from '@/lib/content';

const navLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#works', label: 'Работы' },
  { href: '#steps', label: 'Этапы' },
  { href: '#contact', label: 'Контакты' },
];

// Header (спека §3.1, v0.2): плавающая glass-«пилюля» (референс: floating
// sidebar/searchbar). Лёгкое стекло поверх hero, при скролле > 80px — плотное
// (glass-deep) для читаемости. Бургер на мобиле, телефон всегда виден.
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-4 sm:top-4">
      <div
        className={clsx(
          'mx-auto max-w-content rounded-full px-4 transition-colors duration-200 ease-token sm:px-5',
          scrolled || menuOpen ? 'glass-deep !rounded-token-lg sm:!rounded-full' : 'glass !rounded-full',
        )}
      >
        <div className="flex h-14 items-center justify-between gap-3">
          <a href="#top" className="font-heading text-lg font-extrabold tracking-tight text-white">
            {contacts.name}
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-muted transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={`tel:${contacts.phone}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-sm font-semibold text-white transition-colors duration-200 hover:text-accent"
            >
              <Icon name="phone" className="h-5 w-5" />
              <span className="hidden lg:inline">{contacts.phoneDisplay}</span>
            </a>
            <a
              href="#lead"
              className="hidden min-h-[40px] items-center rounded-full bg-white px-5 font-heading text-sm font-semibold text-ink transition-colors duration-200 hover:bg-white/85 sm:inline-flex"
            >
              Заявка
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white md:hidden"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {/* Мобильное меню — внутри той же стеклянной панели */}
        {menuOpen && (
          <nav
            className="flex flex-col border-t border-white/10 py-2 md:hidden"
            aria-label="Мобильная навигация"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] py-2.5 text-base font-medium text-text"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#lead"
              onClick={() => setMenuOpen(false)}
              className="mb-2 mt-1 inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-5 font-heading font-semibold text-ink"
            >
              Оставить заявку
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
