import type { IconName } from '@/lib/content';

// Набор линейных SVG-иконок (стиль Lucide). Декоративные — aria-hidden.
const paths: Record<IconName | 'phone' | 'whatsapp' | 'telegram' | 'check' | 'star' | 'menu' | 'close' | 'shield', string> = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9 21v-6h6v6',
  bath: 'M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M6 19l-1 2M18 19l1 2',
  wall: 'M3 5h18M3 5v14h18V5M3 12h18M8 5v3m8-3v3M5 12v4m6-4v4m6-4v4',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8 7.2 20l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.3-.4-.4-2.3 2.5-2.5Z',
  plug: 'M9 3v5m6-5v5M6 8h12v3a6 6 0 0 1-12 0V8Zm6 9v4',
  ruler: 'M4 16 16 4l4 4L8 20l-4-4Zm4-4 1.5 1.5M11 9l1.5 1.5M14 6l1.5 1.5',
  phone: 'M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L19 13l2 5v3a1 1 0 0 1-1 1A16 16 0 0 1 4 6a1 1 0 0 1 1-1Z',
  whatsapp: 'M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Zm0 2a7 7 0 0 1 6 10.6l.6 2.4-2.4-.6A7 7 0 1 1 12 5Zm-2.5 3.5c-.3 0-.6.1-.8.4-.3.4-.8 1-.8 2 0 1.3.9 2.5 1 2.7.2.2 1.8 2.9 4.5 3.9 2 .8 2.4.6 2.9.6.5-.1 1.5-.7 1.7-1.3.2-.6.2-1.1.1-1.2 0-.1-.3-.2-.6-.4l-1.4-.7c-.2-.1-.4-.1-.5.1l-.6.8c-.1.2-.3.2-.5.1-.7-.3-1.3-.5-2-1.2-.5-.5-.9-1.1-1-1.3-.1-.2 0-.3.1-.4l.3-.4c.1-.2.1-.3.2-.5 0-.1 0-.3-.1-.4l-.6-1.4c-.2-.4-.4-.4-.6-.4Z',
  telegram: 'M21 5 3 12l5 2 2 5 3-3 4 3 4-14Zm-3 3-7 6',
  check: 'M5 12l4 4 10-10',
  star: 'M12 3l2.6 5.6L21 9.3l-4.5 4.3 1.1 6.4L12 17l-5.6 3 1.1-6.4L3 9.3l6.4-.7L12 3Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  shield: 'M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Zm-2.5 9 1.8 1.8L15 10',
};

type IconProps = {
  name: keyof typeof paths;
  className?: string;
  title?: string;
};

export function Icon({ name, className = 'h-6 w-6', title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path d={paths[name]} />
    </svg>
  );
}
