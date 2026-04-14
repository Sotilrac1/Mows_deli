import { getTranslations } from 'next-intl/server';

import { menuSections } from '@/data/menu';

type WinesPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: WinesPageProps) => {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: tMeta('winesTitle'),
    description: tMeta('winesDescription'),
    alternates: {
      canonical:
        locale === 'fr'
          ? '/vins-bieres'
          : locale === 'en'
            ? '/en/vins-bieres'
            : locale === 'de'
              ? '/de/vins-bieres'
              : '/es/vins-bieres',
      languages: {
        fr: '/vins-bieres',
        en: '/en/vins-bieres',
        de: '/de/vins-bieres',
        es: '/es/vins-bieres',
        'x-default': '/vins-bieres',
      },
    },
  };
};

const getLocalizedText = (locale: string, frenchValue: string, englishValue: string) => {
  return locale === 'fr' ? frenchValue : englishValue;
};

export default async function WinesPage({ params }: WinesPageProps) {
  const { locale } = await params;
  const tWines = await getTranslations({ locale, namespace: 'wines' });

  const wineAndBeerSection = menuSections.find((section) => section.id === 'vins-bieres');
  const availableDrinks = wineAndBeerSection?.items.filter((item) => item.available) ?? [];
  const wineItems = availableDrinks.filter((item) => item.id.includes('vin') || item.id.includes('cidre'));
  const beerItems = availableDrinks.filter((item) => item.id.includes('ipa') || item.id.includes('biere'));

  return (
    <div className="bg-brand-cream">
      <header className="flex min-h-[40vh] items-end bg-brand-green px-6 pb-12 md:px-10">
        <h1 className="font-serif text-5xl text-white">{tWines('title')}</h1>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="font-sans text-base leading-relaxed text-brand-black/80">{tWines('intro')}</p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 md:grid-cols-2 md:px-10">
        <div>
          <h2 className="mb-5 border-b border-brand-black/20 pb-3 font-serif text-3xl text-brand-black">{tWines('wineListTitle')}</h2>
          <div className="space-y-4">
            {wineItems.map((item) => (
              <article key={item.id} className="border border-brand-black/10 bg-white p-4">
                <h3 className="font-serif text-2xl text-brand-black">{getLocalizedText(locale, item.nameFr, item.nameEn)}</h3>
                <p className="font-sans text-sm text-brand-black/70">
                  {getLocalizedText(locale, item.descriptionFr ?? '', item.descriptionEn ?? '')}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-5 border-b border-brand-black/20 pb-3 font-serif text-3xl text-brand-black">{tWines('beerListTitle')}</h2>
          <div className="space-y-4">
            {beerItems.map((item) => (
              <article key={item.id} className="border border-brand-black/10 bg-white p-4">
                <h3 className="font-serif text-2xl text-brand-black">{getLocalizedText(locale, item.nameFr, item.nameEn)}</h3>
                <p className="font-sans text-sm text-brand-black/70">
                  {getLocalizedText(locale, item.descriptionFr ?? '', item.descriptionEn ?? '')}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3 md:px-10">
        {[0, 1, 2].map((index) => (
          <article key={index} className="border border-brand-black/10 bg-white p-6">
            <h3 className="mb-3 font-serif text-2xl text-brand-black">{tWines(`pairings.${index}.title`)}</h3>
            <p className="font-sans text-sm text-brand-black/70">{tWines(`pairings.${index}.note`)}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
