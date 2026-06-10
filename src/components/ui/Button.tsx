import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-token px-6 py-3 font-heading text-base font-semibold transition-colors duration-200 ease-token focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-brand-dark hover:bg-accent-dark hover:text-white',
  secondary: 'bg-brand text-white hover:bg-brand-dark',
  ghost: 'bg-transparent text-brand ring-1 ring-inset ring-brand/20 hover:bg-brand/5',
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
