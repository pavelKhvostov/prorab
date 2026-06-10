'use server';

import { headers } from 'next/headers';

import { LeadInputSchema, type LeadInput, type LeadResult } from '@/lib/lead-schema';
import { checkRateLimit } from '@/lib/rate-limit';

// submitLead — единая абстракция приёма заявки (SPECIFICATION.md §04).
// Контракт неприкосновенен: меняется только внутренняя реализация (v1 → v2 канал).
// v1: валидация + анти-спам + структурированный лог. Канал доставки НЕ подключён.
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  try {
    // 1. Honeypot: бот заполнил скрытое поле → молча «успех», лид не уходит.
    if (input.hp && input.hp.trim() !== '') {
      return { ok: true };
    }

    // 2. Rate-limit по IP.
    const ip =
      headers().get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headers().get('x-real-ip') ||
      'unknown';
    if (!checkRateLimit(ip).ok) {
      return { ok: false, error: 'RATE_LIMITED' };
    }

    // 3. Серверная валидация (не доверяем клиенту). Телефон нормализуется здесь.
    const parsed = LeadInputSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, error: 'VALIDATION_ERROR' };
    }

    const { hp: _hp, ...lead } = parsed.data;

    // 4. v1 — доставка через структурированный лог.
    //    v2: здесь подключается провайдер (Telegram / Sheets / Email),
    //    сигнатура submitLead при этом не меняется.
    console.info('[lead]', JSON.stringify(lead));

    return { ok: true };
  } catch {
    return { ok: false, error: 'UNKNOWN' };
  }
}
