export type DietaryFlag = 'vegetarian' | 'vegan' | 'gluten-free';

export interface MenuItem {
  id: string;
  nameFr: string;
  nameEn: string;
  descriptionFr?: string;
  descriptionEn?: string;
  price: number;
  image?: string;
  dietary: DietaryFlag[];
  available: boolean;
}

export interface MenuSection {
  id: string;
  titleFr: string;
  titleEn: string;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    id: 'sandwichs',
    titleFr: 'Sandwichs',
    titleEn: 'Sandwiches',
    items: [
      {
        id: 'pastrami-classic',
        nameFr: 'Pastrami Classic',
        nameEn: 'Classic Pastrami',
        descriptionFr: 'Pastrami tranche, moutarde de Dijon, cornichons, pain de seigle.',
        descriptionEn: 'Sliced pastrami, Dijon mustard, pickles, rye bread.',
        price: 13.5,
        dietary: [],
        available: true,
      },
      {
        id: 'reuben-maison',
        nameFr: 'Reuben Maison',
        nameEn: 'House Reuben',
        descriptionFr: 'Boeuf sale, choucroute douce, emmental, sauce maison.',
        descriptionEn: 'Cured beef, mild sauerkraut, emmental, house dressing.',
        price: 14.5,
        dietary: [],
        available: true,
      },
      {
        id: 'veggie-deli',
        nameFr: 'Veggie Deli',
        nameEn: 'Veggie Deli',
        descriptionFr: 'Legumes grilles, fromage frais, pickles d&apos;oignon, herbes.',
        descriptionEn: 'Grilled vegetables, fresh cheese, pickled onion, herbs.',
        price: 12,
        dietary: ['vegetarian'],
        available: true,
      },
    ],
  },
  {
    id: 'charcuterie',
    titleFr: 'Charcuterie',
    titleEn: 'Charcuterie',
    items: [
      {
        id: 'assiette-maison',
        nameFr: 'Assiette Maison',
        nameEn: 'House Board',
        descriptionFr: 'Selection de charcuteries de la maison, condiments et pain.',
        descriptionEn: 'Selection of house charcuterie, condiments, and bread.',
        price: 16,
        dietary: [],
        available: true,
      },
      {
        id: 'pastrami-tranche',
        nameFr: 'Pastrami Tranche',
        nameEn: 'Sliced Pastrami',
        descriptionFr: 'Pastrami tranche minute, moutarde ancienne, pickles.',
        descriptionEn: 'Freshly sliced pastrami, whole-grain mustard, pickles.',
        price: 11.5,
        dietary: [],
        available: true,
      },
    ],
  },
];
