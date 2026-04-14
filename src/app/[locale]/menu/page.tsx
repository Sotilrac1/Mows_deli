import { getTranslations } from 'next-intl/server';

import { menuSections } from '@/data/menu';
import { MenuSection } from '@/components/menu/MenuSection';
import { MenuSectionNav } from '@/components/menu/MenuSectionNav';

type MenuPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: MenuPageProps) => {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: tMeta('menuTitle'),
    description: tMeta('menuDescription'),
  };
};

export default async function MenuPage({ params }: MenuPageProps) {
  const { locale } = await params;
  const tMenu = await getTranslations({ locale, namespace: 'menu' });

  return (
    <div className="min-h-screen bg-brand-cream pb-16">
      <header className="mx-auto w-full max-w-4xl px-6 pb-10 pt-14 md:px-0">
        <h1 className="font-serif text-5xl text-brand-black">{tMenu('pageTitle')}</h1>
        <p className="mt-4 max-w-2xl font-sans text-base text-brand-black/70">{tMenu('pageSubtitle')}</p>
      </header>

      <MenuSectionNav sections={menuSections} locale={locale} ariaLabel={tMenu('sectionNavAriaLabel')} />

      <div className="mx-auto w-full max-w-4xl space-y-16 px-6 pt-10 md:px-0">
        {menuSections.map((section) => (
          <MenuSection key={section.id} section={section} locale={locale} />
        ))}
      </div>
    </div>
  );
}
