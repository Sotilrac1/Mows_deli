import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MapPin, Phone } from 'lucide-react';

import { ContactForm } from '@/components/contact/ContactForm';
import { siteConfig } from '@/data/site';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: ContactPageProps) => {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: tMeta('contactTitle'),
    description: tMeta('contactDescription'),
    alternates: {
      canonical: locale === 'fr' ? '/contact' : locale === 'en' ? '/en/contact' : locale === 'de' ? '/de/contact' : '/es/contact',
      languages: {
        fr: '/contact',
        en: '/en/contact',
        de: '/de/contact',
        es: '/es/contact',
        'x-default': '/contact',
      },
    },
  };
};

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const tContact = await getTranslations({ locale, namespace: 'contact' });

  const hourRows = [
    { day: tContact('hours.days.monday'), time: siteConfig.hours.monday },
    { day: tContact('hours.days.tuesday'), time: siteConfig.hours.tuesday },
    { day: tContact('hours.days.wednesday'), time: siteConfig.hours.wednesday },
    { day: tContact('hours.days.thursday'), time: siteConfig.hours.thursday },
    { day: tContact('hours.days.friday'), time: siteConfig.hours.friday },
    { day: tContact('hours.days.saturday'), time: siteConfig.hours.saturday },
    { day: tContact('hours.days.sunday'), time: siteConfig.hours.sunday },
  ];

  return (
    <div className="bg-brand-cream">
      <header className="flex min-h-[40vh] items-end bg-brand-green px-6 pb-12 md:px-10">
        <h1 className="font-serif text-5xl text-white">{tContact('title')}</h1>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:px-10">
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="font-serif text-3xl text-brand-black">{tContact('infoTitle')}</h2>
            <div className="flex items-start gap-3 font-sans text-sm text-brand-black/80">
              <MapPin className="mt-0.5 h-5 w-5 text-brand-red" />
              <p>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
                <br />
                {siteConfig.address.country}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-brand-red" />
            <a href={`tel:${siteConfig.phone}`} className="font-sans text-sm text-brand-black transition hover:text-brand-red">
              {siteConfig.phone}
            </a>
          </div>

          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brand-black">{tContact('hoursTitle')}</h3>
            <div className="space-y-2">
              {hourRows.map((row) => (
                <div key={row.day} className="flex items-center justify-between border-b border-brand-black/10 pb-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-brand-black">{row.day}</span>
                  <span className="font-sans text-sm text-brand-black/80">{row.time}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href="#" className="inline-flex font-sans text-sm uppercase tracking-widest text-brand-red">
            {tContact('googleMapsLink')}
          </Link>
        </div>

        <ContactForm
          locale={locale}
          labels={{
            name: tContact('form.name'),
            email: tContact('form.email'),
            message: tContact('form.message'),
            submit: tContact('form.submit'),
            success: tContact('form.success'),
            error: tContact('form.error'),
          }}
        />
      </section>
    </div>
  );
}
