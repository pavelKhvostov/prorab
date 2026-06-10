// Контент лендинга. Поля с пометкой [КОНТЕНТ] прораб заменяет на реальные.
// Структура зафиксирована спекой §03 — менять структуру нельзя, только значения.

export type IconName =
  | 'home'
  | 'bath'
  | 'wall'
  | 'wrench'
  | 'plug'
  | 'ruler';

export type Service = {
  id: string;
  title: string;
  desc: string;
  icon: IconName;
  priceFrom?: number;
};

export type Case = {
  id: string;
  before: string;
  after: string;
  label?: string;
};

export type Step = {
  n: number;
  title: string;
  desc: string;
};

export type Review = {
  author: string;
  text: string;
  rating?: number;
};

export type Guarantee = {
  years: number;
  text: string;
};

export type Contacts = {
  name: string;
  phone: string; // E.164
  phoneDisplay: string;
  whatsapp?: string;
  telegram?: string;
  workArea: string;
};

export const contacts: Contacts = {
  name: 'Прораб Иван', // [КОНТЕНТ]
  phone: '+79990000000', // [КОНТЕНТ]
  phoneDisplay: '+7 (999) 000-00-00', // [КОНТЕНТ]
  whatsapp: 'https://wa.me/79990000000', // [КОНТЕНТ]
  telegram: 'https://t.me/prorab', // [КОНТЕНТ]
  workArea: 'Москва и область', // [КОНТЕНТ]
};

export const hero = {
  headline: 'Ремонт квартир под ключ — без срывов сроков и переделок', // [КОНТЕНТ]
  subline:
    'Делаю ремонт сам, не передаю на субподряд. Фиксированная смета, договор, гарантия на работы.', // [КОНТЕНТ]
  offer: 'Бесплатный замер и смета за 24 часа', // [КОНТЕНТ]
  ctaPrimary: 'Оставить заявку',
  ctaSecondary: 'Смотреть работы',
};

export const services: Service[] = [
  {
    id: 'turnkey',
    title: 'Квартиры под ключ',
    desc: 'Полный цикл: от черновой до чистовой отделки и уборки. Заезжайте в готовое.',
    icon: 'home',
  },
  {
    id: 'bathroom',
    title: 'Санузлы и ванные',
    desc: 'Гидроизоляция, плитка, разводка сантехники. Без протечек и грибка.',
    icon: 'bath',
  },
  {
    id: 'walls',
    title: 'Стяжка и штукатурка',
    desc: 'Ровные стены и полы по маякам. Основа, на которой держится вся отделка.',
    icon: 'wall',
  },
  {
    id: 'electric',
    title: 'Электрика',
    desc: 'Проводка, щиток, розетки по проекту. Всё по нормам и безопасно.',
    icon: 'plug',
  },
  {
    id: 'plumbing',
    title: 'Сантехника',
    desc: 'Трубы, коллекторы, приборы. Аккуратно, с доступом к узлам для обслуживания.',
    icon: 'wrench',
  },
  {
    id: 'cosmetic',
    title: 'Косметический ремонт',
    desc: 'Обновить квартиру без перепланировки: покраска, обои, полы, потолок.',
    icon: 'ruler',
  },
];

// before/after — пути к фото в /public/cases/. До появления реальных фото
// используются плейсхолдеры из /public/cases/.
export const cases: Case[] = [
  {
    id: 'case-1',
    before: '/cases/case-1-before.svg',
    after: '/cases/case-1-after.svg',
    label: 'Кухня-гостиная, 24 м²', // [КОНТЕНТ]
  },
  {
    id: 'case-2',
    before: '/cases/case-2-before.svg',
    after: '/cases/case-2-after.svg',
    label: 'Санузел, 5 м²', // [КОНТЕНТ]
  },
  {
    id: 'case-3',
    before: '/cases/case-3-before.svg',
    after: '/cases/case-3-after.svg',
    label: 'Спальня, 16 м²', // [КОНТЕНТ]
  },
];

export const steps: Step[] = [
  { n: 1, title: 'Замер', desc: 'Приезжаю на объект, замеряю, обсуждаем задачи и материалы.' },
  { n: 2, title: 'Смета', desc: 'Составляю прозрачную смету с объёмами работ. Без скрытых строк.' },
  { n: 3, title: 'Договор', desc: 'Фиксируем сроки, цену и этапы. Оплата по факту выполненных этапов.' },
  { n: 4, title: 'Ремонт', desc: 'Веду работы лично, держу вас в курсе. Фотоотчёт по этапам.' },
  { n: 5, title: 'Сдача', desc: 'Принимаем работу вместе. Гарантия и поддержка после сдачи.' },
];

export const reviews: Review[] = [
  {
    author: 'Анна, Химки', // [КОНТЕНТ]
    text: 'Сделал санузел за две недели, как и обещал. Чисто, аккуратно, без сюрпризов по деньгам.',
    rating: 5,
  },
  {
    author: 'Дмитрий, Москва', // [КОНТЕНТ]
    text: 'Ремонт двушки под ключ. Каждый этап с фотоотчётом, всегда на связи. Рекомендую.',
    rating: 5,
  },
  {
    author: 'Елена, Мытищи', // [КОНТЕНТ]
    text: 'Переделывали санузел после другой бригады. Здесь — наконец без протечек. Спасибо!',
    rating: 5,
  },
];

export const guarantee: Guarantee = {
  years: 3, // [КОНТЕНТ]
  text: 'Гарантия на все работы. Если что-то пойдёт не так — приеду и исправлю за свой счёт.',
};
