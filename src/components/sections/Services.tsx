import { clsx } from 'clsx';

import { Icon } from '@/components/ui/Icon';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { services } from '@/lib/content';

// Услуги (спека §3.3, v0.2): bento-сетка glass-карточек 1/2/3,
// первая и последняя шире (акцент), reveal по скроллу со stagger.
export function Services() {
  const last = services.length - 1;

  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="container-content">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Что делаю
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Беру и отдельные задачи, и ремонт под ключ. Всё веду лично, без передачи на субподряд.
          </p>
        </div>

        <ScrollReveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <article
              key={service.id}
              className={clsx(
                'glass flex flex-col p-6 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.1]',
                (i === 0 || i === last) && 'sm:col-span-2 lg:col-span-2',
              )}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-token border border-accent/30 bg-accent/15 text-accent">
                <Icon name={service.icon} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">{service.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-text-muted">{service.desc}</p>
              {typeof service.priceFrom === 'number' && (
                <p className="mt-4 font-heading font-semibold text-accent">
                  от {service.priceFrom.toLocaleString('ru-RU')} ₽
                </p>
              )}
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
