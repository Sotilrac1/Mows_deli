import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

const getLocalizedHref = (locale: string, path: string) => {
  if (locale === 'fr') {
    return path;
  }

  return `/en${path}`;
};

export const generateMetadata = async ({ params }: AboutPageProps) => {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: tMeta('aboutTitle'),
    description: tMeta('aboutDescription'),
  };
};

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const tAbout = await getTranslations({ locale, namespace: 'about' });

  return (
    <div className="bg-brand-cream">
      <header className="flex min-h-[40vh] items-end bg-brand-green px-6 pb-12 md:px-10">
        <h1 className="font-serif text-5xl text-white">{tAbout('title')}</h1>
      </header>

      <section className="mx-auto max-w-3xl space-y-6 px-6 py-20">
        <p className="font-sans text-base leading-relaxed text-brand-black/80">{tAbout('story.paragraph1')}</p>
        <p className="font-sans text-base leading-relaxed text-brand-black/80">{tAbout('story.paragraph2')}</p>
        <p className="font-sans text-base leading-relaxed text-brand-black/80">{tAbout('story.paragraph3')}</p>
        <p className="font-sans text-base leading-relaxed text-brand-black/80">{tAbout('story.paragraph4')}</p>
      </section>

      <section className="bg-brand-black px-6 py-16 text-white md:px-10">
        <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <article key={index} className="space-y-3">
              <h2 className="font-serif text-3xl">{tAbout(`philosophy.items.${index - 1}.title`)}</h2>
              <p className="font-sans text-sm text-white/80">{tAbout(`philosophy.items.${index - 1}.text`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <Link
          href={getLocalizedHref(locale, '/contact')}
          className="inline-flex bg-brand-red px-8 py-3 font-sans text-sm uppercase tracking-widest text-white transition hover:bg-brand-black"
        >
          {tAbout('cta')}
        </Link>
      </section>
    </div>
  );
}
