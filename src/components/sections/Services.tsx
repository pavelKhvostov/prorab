import { Icon } from '@/components/ui/Icon';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { services } from '@/lib/content';

// Услуги (спека §3.3): сетка карточек 1/2/3, reveal по скроллу со stagger.
export function Services() {
  return (
    <section id="services" className="bg-bg py-20 sm:py-28">
      <div className="container-content">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">
            Что делаю
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Беру и отдельные задачи, и ремонт под ключ. Всё веду лично, без передачи на субподряд.
          </p>
        </div>

        <ScrollReveal className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col rounded-token-lg bg-surface p-6 shadow-token ring-1 ring-brand/5 transition-colors duration-200 hover:ring-accent/40"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-token bg-brand text-accent">
                <Icon name={service.icon} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-brand">{service.title}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-text-muted">{service.desc}</p>
              {typeof service.priceFrom === 'number' && (
                <p className="mt-4 font-heading font-semibold text-accent-dark">
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
