import { clsx } from 'clsx';

// Кнопки-«пилюли» (SPECIFICATION.md §01 v0.2): primary — белая (Apple),
// glass — полупрозрачная, accent — янтарная (submit формы).
type Variant = 'primary' | 'glass' | 'accent';

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-base font-semibold transition-colors duration-200 ease-token focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-white text-ink hover:bg-white/85',
  glass:
    'border border-white/15 bg-white/10 text-white backdrop-blur-xl hover:bg-white/[0.18]',
  accent: 'bg-accent text-ink hover:bg-accent-dark hover:text-white',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button className={clsx(base, variants[variant], className)} {...props} />;
}

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
};

export function LinkButton({ variant = 'primary', className, ...props }: LinkButtonProps) {
  return <a className={clsx(base, variants[variant], className)} {...props} />;
}
