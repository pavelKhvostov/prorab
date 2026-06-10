import { Icon } from '@/components/ui/Icon';
import { LinkButton } from '@/components/ui/Button';
import { contacts } from '@/lib/content';

// Footer (спека §3.8): контакты, мессенджеры, зона работ, повтор CTA,
// ссылка на политику обработки ПД (нужна из-за consent в форме).
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white/80">
      <div className="container-content grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-heading text-xl font-extrabold text-white">{contacts.name}</p>
          <p className="mt-3 leading-relaxed">Ремонт квартир под ключ. {contacts.workArea}.</p>
        </div>

        <div>
          <p className="font-heading font-semibold text-white">Контакты</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={`tel:${contacts.phone}`} className="inline-flex items-center gap-2 hover:text-white">
                <Icon name="phone" className="h-5 w-5" />
                {contacts.phoneDisplay}
              </a>
            </li>
            {contacts.whatsapp && (
              <li>
                <a href={contacts.whatsapp} className="inline-flex items-center gap-2 hover:text-white" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" className="h-5 w-5" />
                  WhatsApp
                </a>
              </li>
            )}
            {contacts.telegram && (
              <li>
                <a href={contacts.telegram} className="inline-flex items-center gap-2 hover:text-white" target="_blank" rel="noopener noreferrer">
                  <Icon name="telegram" className="h-5 w-5" />
                  Telegram
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4">
          <p className="font-heading font-semibold text-white">Нужен ремонт?</p>
          <LinkButton href="#lead" variant="primary">
            Оставить заявку
          </LinkButton>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content flex flex-col gap-2 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {contacts.name}. Все права защищены.</p>
          <a id="privacy" href="#privacy" className="underline hover:text-white">
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </footer>
  );
}
