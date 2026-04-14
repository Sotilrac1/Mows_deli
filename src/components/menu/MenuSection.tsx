import type { MenuSection as MenuSectionType } from '@/data/menu';
import { MenuItem } from '@/components/menu/MenuItem';

type MenuSectionProps = {
  section: MenuSectionType;
  locale: string;
};

const getLocalizedSectionTitle = (locale: string, section: MenuSectionType) => {
  return locale === 'fr' ? section.titleFr : section.titleEn;
};

export const MenuSection = ({ section, locale }: MenuSectionProps) => {
  const availableItems = section.items.filter((item) => item.available);
  const unavailableItems = section.items.filter((item) => !item.available);
  const orderedItems = [...availableItems, ...unavailableItems];

  return (
    <section id={section.id} className="scroll-mt-44">
      <h2 className="mb-8 border-b border-brand-black/20 pb-4 font-serif text-3xl text-brand-black">
        {getLocalizedSectionTitle(locale, section)}
      </h2>
      <div className="space-y-4">
        {orderedItems.map((item) => (
          <MenuItem key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </section>
  );
};
