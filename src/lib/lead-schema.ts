import { z } from 'zod';

import { normalizeRuPhone } from '@/lib/phone';
import { services } from '@/lib/content';

// Контракт submitLead зафиксирован спекой §04. Внешние данные проходят через Zod,
// тип выводится из схемы (см. .claude/rules/typescript.md).

const serviceIds = services.map((s) => s.id) as [string, ...string[]];

export const MetaSchema = z.object({
  source: z.string().min(1),
  utm: z.record(z.string()).optional(),
  createdAt: z.string().datetime(),
  userAgent: z.string(),
});

export const LeadInputSchema = z.object({
  name: z.string().trim().min(2, 'Минимум 2 символа').max(80, 'Слишком длинное имя'),
  phone: z
    .string()
    .transform((v, ctx) => {
      const normalized = normalizeRuPhone(v);
      if (!normalized) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Некорректный номер телефона' });
        return z.NEVER;
      }
      return normalized;
    }),
  service: z.enum(serviceIds).optional(),
  comment: z.string().trim().max(1000, 'Не более 1000 символов').optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Нужно согласие на обработку данных' }),
  }),
  hp: z.string().optional(), // honeypot — проверяется в action до схемы
  meta: MetaSchema,
});

export type LeadInput = z.input<typeof LeadInputSchema>;
export type LeadParsed = z.output<typeof LeadInputSchema>;

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'RATE_LIMITED'
  | 'DELIVERY_FAILED'
  | 'UNKNOWN';

export type LeadResult = { ok: true } | { ok: false; error: ErrorCode };
