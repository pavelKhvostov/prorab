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

// Header (спека §3.1): прозрачный поверх hero, фон+тень при скролле >80px,
// бургер на мобиле, телефон всегда виден.
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
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-token',
        scrolled ? 'bg-surface shadow-token' : 'bg-transparent',
      )}
    >
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className={clsx(
            'font-heading text-lg font-extrabold tracking-tight',
            scrolled ? 'text-brand' : 'text-white',
          )}
        >
          {contacts.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={clsx(
                'text-sm font-medium transition-colors duration-200',
                scrolled ? 'text-text hover:text-accent-dark' : 'text-white/90 hover:text-white',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${contacts.phone}`}
            className={clsx(
              'inline-flex min-h-[44px] items-center gap-2 rounded-token px-3 text-sm font-semibold transition-colors duration-200',
              scrolled ? 'text-brand hover:text-accent-dark' : 'text-white',
            )}
          >
            <Icon name="phone" className="h-5 w-5" />
            <span className="hidden sm:inline">{contacts.phoneDisplay}</span>
          </a>
          <a
            href="#lead"
            className="hidden min-h-[44px] items-center rounded-token bg-accent px-5 font-heading text-sm font-semibold text-brand-dark transition-colors duration-200 hover:bg-accent-dark hover:text-white sm:inline-flex"
          >
            Заявка
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            className={clsx(
              'inline-flex h-11 w-11 items-center justify-center rounded-token md:hidden',
              scrolled ? 'text-brand' : 'text-white',
            )}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* Мобильное меню оверлеем */}
      {menuOpen && (
        <div className="border-t border-brand/10 bg-surface md:hidden">
          <nav className="container-content flex flex-col py-2" aria-label="Мобильная навигация">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] py-2 text-base font-medium text-text"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#lead"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-token bg-accent px-5 font-heading font-semibold text-brand-dark"
            >
              Оставить заявку
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
