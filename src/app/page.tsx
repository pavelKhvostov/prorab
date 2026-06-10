import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { Steps } from '@/components/sections/Steps';
import { Reviews } from '@/components/sections/Reviews';
import { LeadForm } from '@/components/sections/LeadForm';
import { Footer } from '@/components/sections/Footer';

// Порядок секций зафиксирован спекой §02:
// Header → Hero → Услуги → Before/After → Этапы → Отзывы/Гарантия → Форма → Footer
export default function Page() {
  return (
    <>
      <Header />
      <main id="contact">
        <Hero />
        <Services />
        <BeforeAfter />
        <Steps />
        <Reviews />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
