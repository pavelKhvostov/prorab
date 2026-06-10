import type { Metadata, Viewport } from 'next';
import { Manrope, Inter } from 'next/font/google';

import { GlassBackdrop } from '@/components/GlassBackdrop';
import { SmoothScroll } from '@/components/SmoothScroll';
import { contacts } from '@/lib/content';

import './globals.css';

// Шрифты через next/font (self-hosted, display: swap). Кириллица обязательна.
// v0.2: Manrope — плотный гротеск под glass-эстетику (§01).
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const SITE_URL = 'https://prorab.example'; // [КОНТЕНТ] — заменить на боевой домен

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Ремонт квартир под ключ — прораб без субподряда | Москва и область',
  description:
    'Ремонт квартир и санузлов под ключ. Фиксированная смета, договор, гарантия на работы. Бесплатный замер за 24 часа. Работаю сам, без передачи на субподряд.',
  openGraph: {
    title: 'Ремонт квартир под ключ — прораб без субподряда',
    description:
      'Фиксированная смета, договор, гарантия. Бесплатный замер за 24 часа. Москва и область.',
    type: 'website',
    locale: 'ru_RU',
    images: ['/og.svg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07090E',
};

// JSON-LD LocalBusiness (SEO, спека §00).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: contacts.name,
  telephone: contacts.phone,
  areaServed: contacts.workArea,
  url: SITE_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- статический trusted JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GlassBackdrop />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
