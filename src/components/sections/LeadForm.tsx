'use client';

import { useRef, useState } from 'react';
import { clsx } from 'clsx';

import { submitLead } from '@/app/actions';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { services } from '@/lib/content';
import { normalizeRuPhone } from '@/lib/phone';
import type { LeadInput } from '@/lib/lead-schema';

type Status = 'idle' | 'loading' | 'success' | 'error';
type FieldErrors = Partial<Record<'name' | 'phone' | 'consent', string>>;

const inputBase =
  'w-full rounded-token border bg-white/[0.05] px-4 py-3 text-base text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-accent/70';

function validate(name: string, phone: string, consent: boolean): FieldErrors {
  const errors: FieldErrors = {};
  const trimmed = name.trim();
  if (trimmed.length < 2) errors.name = 'Введите имя (минимум 2 символа)';
  else if (trimmed.length > 80) errors.name = 'Слишком длинное имя';
  if (!normalizeRuPhone(phone)) errors.phone = 'Введите корректный номер телефона';
  if (!consent) errors.consent = 'Нужно согласие на обработку данных';
  return errors;
}

function readUtm(): Record<string, string> | undefined {
  if (typeof window === 'undefined') return undefined;
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  params.forEach((value, key) => {
    if (key.startsWith('utm_')) utm[key] = value;
  });
  return Object.keys(utm).length ? utm : undefined;
}

export function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [networkError, setNetworkError] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const onBlurField = (field: keyof FieldErrors, name: string, phone: string, consent: boolean) => {
    const all = validate(name, phone, consent);
    setErrors((prev) => ({ ...prev, [field]: all[field] }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return; // защита от двойной отправки

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get('name') ?? '');
    const phone = String(fd.get('phone') ?? '');
    const consent = fd.get('consent') === 'on';
    const hp = String(fd.get('hp') ?? '');

    const fieldErrors = validate(name, phone, consent);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      if (fieldErrors.name) nameRef.current?.focus();
      else if (fieldErrors.phone) phoneRef.current?.focus();
      return;
    }

    setErrors({});
    setNetworkError(false);
    setStatus('loading');

    const input: LeadInput = {
      name,
      phone,
      service: (fd.get('service') as LeadInput['service']) || undefined,
      comment: String(fd.get('comment') ?? '') || undefined,
      consent: true,
      hp,
      meta: {
        source: 'landing',
        utm: readUtm(),
        createdAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
      },
    };

    try {
      const result = await submitLead(input);
      if (result.ok) {
        setStatus('success');
      } else {
        // Данные не теряем — пользователь может повторить отправку.
        setStatus('error');
        if (result.error === 'VALIDATION_ERROR') {
          setErrors(validate(name, phone, consent));
        }
      }
    } catch {
      setStatus('error');
      setNetworkError(true);
    }
  }

  if (status === 'success') {
    return (
      <section id="lead" className="py-20 sm:py-28">
        <div className="container-content">
          <div className="glass mx-auto max-w-xl p-8 text-center sm:p-12">
            <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-success/30 bg-success/15 text-success">
              <Icon name="check" className="h-8 w-8" />
            </span>
            <h2 className="mt-6 text-3xl font-extrabold text-white">Спасибо! Перезвоним</h2>
            <p className="mt-3 text-lg text-text-muted">
              Заявка принята. Свяжусь с вами в ближайшее время, чтобы согласовать бесплатный замер.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead" className="py-20 sm:py-28">
      <div className="container-content grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Оставьте заявку на бесплатный замер
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Перезвоню, отвечу на вопросы и согласую удобное время. Без навязчивых звонков.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="glass p-6 sm:p-8">
          {/* Honeypot — скрыт от людей, ловит ботов */}
          <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="hp">Не заполняйте это поле</label>
            <input id="hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-text">
                Имя <span className="text-error">*</span>
              </label>
              <input
                ref={nameRef}
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                onBlur={(e) => onBlurField('name', e.target.value, '', true)}
                className={clsx(inputBase, errors.name ? 'border-error' : 'border-white/10')}
                placeholder="Как к вам обращаться"
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
                  <Icon name="close" className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-text">
                Телефон <span className="text-error">*</span>
              </label>
              <input
                ref={phoneRef}
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                onBlur={(e) => onBlurField('phone', '', e.target.value, true)}
                className={clsx(inputBase, errors.phone ? 'border-error' : 'border-white/10')}
                placeholder="+7 (___) ___-__-__"
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
                  <Icon name="close" className="h-4 w-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-text">
                Тип работ
              </label>
              <select
                id="service"
                name="service"
                defaultValue=""
                className={clsx(inputBase, 'border-white/10 [&>option]:bg-surface [&>option]:text-text')}
              >
                <option value="">Не выбрано</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="comment" className="mb-1.5 block text-sm font-semibold text-text">
                Комментарий
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                maxLength={1000}
                className={clsx(inputBase, 'resize-y border-white/10')}
                placeholder="Площадь, что нужно сделать, сроки"
              />
            </div>

            <div>
              <label htmlFor="consent" className="flex items-start gap-3 text-sm text-text-muted">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  required
                  onChange={(e) => onBlurField('consent', '', '', e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30 bg-white/10 text-accent focus-visible:ring-accent"
                />
                <span>
                  Согласен на обработку{' '}
                  <a href="#privacy" className="font-medium text-white underline">
                    персональных данных
                  </a>
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-error">
                  <Icon name="close" className="h-4 w-4" />
                  {errors.consent}
                </p>
              )}
            </div>

            <Button type="submit" variant="accent" disabled={status === 'loading'} className="w-full">
              {status === 'loading' ? (
                <span className="inline-flex items-center gap-2" aria-label="Отправка…">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  Отправляю…
                </span>
              ) : (
                'Отправить заявку'
              )}
            </Button>

            {/* Статус отправки — aria-live */}
            <div aria-live="polite" className="min-h-[1.25rem]">
              {status === 'error' && (
                <p className="flex items-center gap-1.5 text-sm text-error">
                  <Icon name="close" className="h-4 w-4" />
                  {networkError
                    ? 'Не удалось отправить. Попробуйте ещё раз или позвоните нам.'
                    : 'Проверьте поля и попробуйте снова.'}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
