'use client';

import { useTranslations } from 'next-intl';

import type { MenuItem as MenuItemType } from '@/data/menu';
import { DietaryBadge } from '@/components/menu/DietaryBadge';

type MenuItemProps = {
  item: MenuItemType;
  locale: string;
};

const getLocalizedItemName = (locale: string, item: MenuItemType) => {
  return locale === 'fr' ? item.nameFr : item.nameEn;
};

const getLocalizedItemDescription = (locale: string, item: MenuItemType) => {
  return locale === 'fr' ? item.descriptionFr : item.descriptionEn;
};

const getFormattedPrice = (locale: string, price: number) => {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

export const MenuItem = ({ item, locale }: MenuItemProps) => {
  const tMenu = useTranslations('menu');
  const description = getLocalizedItemDescription(locale, item);

  return (
    <article className={`flex gap-4 border border-brand-black/10 bg-white p-4 ${item.available ? '' : 'opacity-55'}`}>
      <div className="h-24 w-24 shrink-0 bg-brand-green/20" />
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-brand-black">{getLocalizedItemName(locale, item)}</h3>
          <p className="font-mono text-sm text-brand-black">{getFormattedPrice(locale, item.price)}</p>
        </div>

        {description ? <p className="font-sans text-sm text-brand-black/70">{description}</p> : null}

        {item.dietary.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {item.dietary.map((dietaryType) => (
              <DietaryBadge key={dietaryType} type={dietaryType} />
            ))}
          </div>
        ) : null}

        {!item.available ? (
          <p className="font-mono text-xs uppercase tracking-widest text-brand-red">{tMenu('unavailableLabel')}</p>
        ) : null}
      </div>
    </article>
  );
};
