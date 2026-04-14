import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ChefHat, Sandwich, Wine } from 'lucide-react';

import { menuSections } from '@/data/menu';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const getLocalizedHref = (locale: string, path: string) => {
  if (locale === 'fr') {
    return path;
  }

  if (path === '/') {
    return '/en';
  }

  return `/en${path}`;
};

const getMenuItemName = (locale: string, nameFr: string, nameEn: string) => {
  return locale === 'fr' ? nameFr : nameEn;
};

const getMenuItemDescription = (locale: string, descriptionFr?: string, descriptionEn?: string) => {
  return locale === 'fr' ? descriptionFr : descriptionEn;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const tHome = await getTranslations({ locale, namespace: 'home' });

  const featuredItems = menuSections
    .flatMap((section) => section.items)
    .filter((item) => item.available)
    .slice(0, 3);

  const highlightIcons = [Sandwich, ChefHat, Wine];

  return (
    <div>
      <section className="flex min-h-screen items-center justify-center bg-linear-to-br from-brand-black to-brand-green px-6 py-20 text-center md:px-10">
        <div className="mx-auto max-w-4xl space-y-6">
          <p className="font-mono text-sm uppercase tracking-widest text-brand-red">{tHome('hero.eyebrow')}</p>
          <h1 className="font-serif text-5xl text-white md:text-7xl">{tHome('hero.title')}</h1>
          <p className="mx-auto max-w-2xl font-sans text-base text-brand-cream/80 md:text-lg">{tHome('hero.subtitle')}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={getLocalizedHref(locale, '/menu')}
              className="bg-brand-red px-8 py-3 font-sans text-sm uppercase tracking-widest text-white transition hover:bg-brand-black"
            >
              {tHome('hero.ctaMenu')}
            </Link>
            <Link
              href={getLocalizedHref(locale, '/contact')}
              className="border border-white px-8 py-3 font-sans text-sm uppercase tracking-widest text-white transition hover:bg-white hover:text-brand-black"
            >
              {tHome('hero.ctaFindUs')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-black px-6 py-4 md:px-10">
        <p className="text-center font-mono text-sm tracking-wide text-brand-cream">{tHome('hoursStrip.line')}</p>
      </section>

      <section className="bg-brand-cream px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-7xl space-y-10">
          <h2 className="font-serif text-4xl text-brand-black">{tHome('highlights.title')}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((index) => {
              const Icon = highlightIcons[index];

              return (
                <article key={index} className="border border-brand-black/10 bg-white p-8">
                  <Icon className="mb-6 h-8 w-8 text-brand-red" />
                  <h3 className="mb-3 font-serif text-2xl text-brand-black">{tHome(`highlights.cards.${index}.title`)}</h3>
                  <p className="mb-6 font-sans text-sm text-brand-black/70">{tHome(`highlights.cards.${index}.description`)}</p>
                  <Link href={getLocalizedHref(locale, '/menu')} className="font-sans text-sm uppercase tracking-widest text-brand-red">
                    {tHome('highlights.discover')}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-6 py-20 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div className="h-[460px] bg-brand-green" />
          <div className="space-y-5">
            <h2 className="font-serif text-4xl text-brand-black">{tHome('aboutTeaser.title')}</h2>
            <p className="font-sans text-base text-brand-black/80">{tHome('aboutTeaser.paragraphOne')}</p>
            <p className="font-sans text-base text-brand-black/80">{tHome('aboutTeaser.paragraphTwo')}</p>
            <Link
              href={getLocalizedHref(locale, '/notre-histoire')}
              className="font-sans text-sm uppercase tracking-widest text-brand-red"
            >
              {tHome('aboutTeaser.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-black px-6 py-20 md:px-10">
        <div className="mx-auto w-full max-w-7xl space-y-10">
          <h2 className="font-serif text-4xl text-white">{tHome('featured.title')}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredItems.map((item) => (
              <article key={item.id} className="space-y-4 border border-white/20 p-6">
                <div className="h-44 bg-brand-green/50" />
                <h3 className="font-serif text-2xl text-white">{getMenuItemName(locale, item.nameFr, item.nameEn)}</h3>
                <p className="font-sans text-sm text-brand-cream/80">
                  {getMenuItemDescription(locale, item.descriptionFr, item.descriptionEn)}
                </p>
                <p className="font-mono text-sm uppercase tracking-widest text-brand-red">
                  {new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(item.price)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-cream px-6 py-20 md:px-10">
        <div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <article key={index} className="border border-brand-black/10 bg-white p-6 text-center">
              <p className="mb-4 text-2xl text-brand-red">★★★★★</p>
              <p className="mb-4 font-sans text-sm text-brand-black/80">{tHome(`reviews.items.${index}.quote`)}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-brand-black">{tHome(`reviews.items.${index}.name`)}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
