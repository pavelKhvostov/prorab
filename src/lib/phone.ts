// Нормализация российского телефона в E.164 (+7XXXXXXXXXX).
// Принимает форматы: 8 999..., +7 999..., 7(999)..., с пробелами/дефисами/скобками.

const RU_E164 = /^\+7\d{10}$/;

/**
 * Приводит ввод к E.164 или возвращает null, если это не валидный РФ-номер.
 */
export function normalizeRuPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');

  let national: string | null = null;
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) {
    national = digits.slice(1);
  } else if (digits.length === 10) {
    national = digits;
  }

  if (national === null) return null;

  // Мобильные и городские РФ начинаются с 3–9 (код зоны). 0/1/2 — служебные.
  if (!/^[3-9]\d{9}$/.test(national)) return null;

  const e164 = `+7${national}`;
  return RU_E164.test(e164) ? e164 : null;
}
