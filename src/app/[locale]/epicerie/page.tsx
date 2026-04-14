import { getTranslations } from 'next-intl/server';

type EpiceriePageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: EpiceriePageProps) => {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: tMeta('epicerieTitle'),
    description: tMeta('epicerieDescription'),
    alternates: {
      canonical:
        locale === 'fr' ? '/epicerie' : locale === 'en' ? '/en/epicerie' : locale === 'de' ? '/de/epicerie' : '/es/epicerie',
      languages: {
        fr: '/epicerie',
        en: '/en/epicerie',
        de: '/de/epicerie',
        es: '/es/epicerie',
        'x-default': '/epicerie',
      },
    },
  };
};

export default async function EpiceriePage({ params }: EpiceriePageProps) {
  const { locale } = await params;
  const tEpicerie = await getTranslations({ locale, namespace: 'epicerie' });
  const tContact = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="bg-brand-cream">
      <header className="flex min-h-[40vh] items-end bg-brand-green px-6 pb-12 md:px-10">
        <h1 className="font-serif text-5xl text-white">{tEpicerie('title')}</h1>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="font-sans text-base leading-relaxed text-brand-black/80">{tEpicerie('intro')}</p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-16 md:grid-cols-2 md:px-10">
        {[0, 1, 2, 3].map((index) => (
          <article key={index} className="border border-brand-black/10 bg-white p-6">
            <h2 className="mb-3 font-serif text-2xl text-brand-black">{tEpicerie(`categories.${index}.title`)}</h2>
            <p className="mb-4 font-sans text-sm text-brand-black/70">{tEpicerie(`categories.${index}.description`)}</p>
            <ul className="space-y-2">
              {[0, 1, 2].map((itemIndex) => (
                <li key={itemIndex} className="font-mono text-xs uppercase tracking-widest text-brand-black/70">
                  {tEpicerie(`categories.${index}.products.${itemIndex}`)}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="bg-brand-black px-6 py-10 text-white md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-3xl">{tEpicerie('cta.title')}</p>
          <p className="font-mono text-xs uppercase tracking-widest text-white/80">{tContact('hoursSummary')}</p>
        </div>
      </section>
    </div>
  );
}
