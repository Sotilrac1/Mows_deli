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
        descriptionFr: 'Pastrami tranche minute, moutarde de Dijon, cornichons et pain de seigle grille.',
        descriptionEn: 'Sliced pastrami, Dijon mustard, pickles, rye bread.',
        price: 13.5,
        dietary: [],
        available: true,
      },
      {
        id: 'reuben-maison',
        nameFr: 'Reuben Maison',
        nameEn: 'House Reuben',
        descriptionFr: 'Boeuf sale, choucroute douce, emmental fondu et sauce maison.',
        descriptionEn: 'Cured beef, mild sauerkraut, emmental, house dressing.',
        price: 14.5,
        dietary: [],
        available: true,
      },
      {
        id: 'veggie-deli',
        nameFr: 'Veggie Deli',
        nameEn: 'Veggie Deli',
        descriptionFr: "Légumes grillés, fromage frais, pickles d'oignon rouge et herbes.",
        descriptionEn: 'Grilled vegetables, fresh cheese, pickled onion, herbs.',
        price: 12,
        dietary: ['vegetarian'],
        available: false,
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
        descriptionFr: 'Selection de charcuteries de la maison, condiments et pain de campagne.',
        descriptionEn: 'Selection of house charcuterie, condiments, and bread.',
        price: 16,
        dietary: [],
        available: true,
      },
      {
        id: 'pastrami-tranche',
        nameFr: 'Pastrami Tranche',
        nameEn: 'Sliced Pastrami',
        descriptionFr: 'Pastrami tranche minute, moutarde ancienne et pickles maison.',
        descriptionEn: 'Freshly sliced pastrami, whole-grain mustard, pickles.',
        price: 11.5,
        dietary: [],
        available: true,
      },
      {
        id: 'jambon-ibaiama',
        nameFr: 'Jambon Affine Ibaiama',
        nameEn: 'Ibaiama Aged Ham',
        descriptionFr: 'Jambon affine, beurre demi-sel et cornichons croquants.',
        descriptionEn: 'Aged ham, salted butter, and crunchy pickles.',
        price: 13,
        dietary: [],
        available: false,
      },
    ],
  },
  {
    id: 'fromages',
    titleFr: 'Fromages',
    titleEn: 'Cheeses',
    items: [
      {
        id: 'brillat-truffe',
        nameFr: 'Brillat Truffe',
        nameEn: 'Truffled Brillat',
        descriptionFr: 'Fromage cremeux a la truffe noire, pain grille et noix.',
        descriptionEn: 'Creamy truffled cheese, toasted bread, and walnuts.',
        price: 12,
        dietary: ['vegetarian'],
        available: true,
      },
      {
        id: 'comte-24',
        nameFr: 'Comte 24 Mois',
        nameEn: '24-Month Comte',
        descriptionFr: 'Comte affine, chutney de saison et crackers maison.',
        descriptionEn: 'Aged Comte, seasonal chutney, and house crackers.',
        price: 10.5,
        dietary: ['vegetarian'],
        available: true,
      },
      {
        id: 'bleu-fermier',
        nameFr: 'Bleu Fermier',
        nameEn: 'Farmhouse Blue',
        descriptionFr: 'Bleu puissant, miel floral et raisin frais.',
        descriptionEn: 'Bold blue cheese, floral honey, and fresh grapes.',
        price: 11,
        dietary: ['vegetarian'],
        available: false,
      },
    ],
  },
  {
    id: 'accompagnements',
    titleFr: 'Accompagnements',
    titleEn: 'Sides',
    items: [
      {
        id: 'salade-coleslaw',
        nameFr: 'Coleslaw Maison',
        nameEn: 'House Coleslaw',
        descriptionFr: 'Chou blanc, carotte, vinaigrette douce et herbes fraiches.',
        descriptionEn: 'White cabbage, carrot, mild dressing, and fresh herbs.',
        price: 4.5,
        dietary: ['vegetarian', 'gluten-free'],
        available: true,
      },
      {
        id: 'pickles-maison',
        nameFr: 'Pickles Maison',
        nameEn: 'House Pickles',
        descriptionFr: 'Selection de legumes pickles minute au vinaigre de cidre.',
        descriptionEn: 'Selection of quick pickled vegetables in cider vinegar.',
        price: 3.5,
        dietary: ['vegan', 'gluten-free'],
        available: true,
      },
      {
        id: 'frites-polenta',
        nameFr: 'Frites de Polenta',
        nameEn: 'Polenta Fries',
        descriptionFr: 'Polenta croustillante, parmesan rape et paprika fume.',
        descriptionEn: 'Crispy polenta fries, grated parmesan, and smoked paprika.',
        price: 5.5,
        dietary: ['vegetarian'],
        available: false,
      },
    ],
  },
  {
    id: 'desserts',
    titleFr: 'Desserts',
    titleEn: 'Desserts',
    items: [
      {
        id: 'cheesecake-ny',
        nameFr: 'Cheesecake New York',
        nameEn: 'New York Cheesecake',
        descriptionFr: 'Cheesecake dense et cremeux, coulis de fruits rouges.',
        descriptionEn: 'Dense and creamy cheesecake with red berry coulis.',
        price: 7.5,
        dietary: ['vegetarian'],
        available: true,
      },
      {
        id: 'cookie-seigle',
        nameFr: 'Cookie Seigle Chocolat',
        nameEn: 'Rye Chocolate Cookie',
        descriptionFr: 'Cookie moelleux au chocolat noir et fleur de sel.',
        descriptionEn: 'Soft dark chocolate cookie with flaky sea salt.',
        price: 4,
        dietary: ['vegetarian'],
        available: true,
      },
      {
        id: 'carrot-cake',
        nameFr: 'Carrot Cake Epice',
        nameEn: 'Spiced Carrot Cake',
        descriptionFr: 'Gateau carotte, creme legere et noix caramelisees.',
        descriptionEn: 'Carrot cake, light frosting, and caramelized walnuts.',
        price: 6.5,
        dietary: ['vegetarian'],
        available: false,
      },
    ],
  },
  {
    id: 'vins-bieres',
    titleFr: 'Vins & Bieres',
    titleEn: 'Wines & Beers',
    items: [
      {
        id: 'vin-orange-verre',
        nameFr: 'Vin Orange du Moment',
        nameEn: 'Orange Wine of the Day',
        descriptionFr: 'Verre de vin nature, sec et aromatique.',
        descriptionEn: 'Glass of natural wine, dry and aromatic.',
        price: 6.5,
        dietary: ['vegan', 'gluten-free'],
        available: true,
      },
      {
        id: 'ipa-toulouse',
        nameFr: 'IPA Toulouse',
        nameEn: 'Toulouse IPA',
        descriptionFr: "Bière artisanale locale aux notes d'agrumes et de pin.",
        descriptionEn: 'Local craft beer with citrus and pine notes.',
        price: 7,
        dietary: ['vegan'],
        available: true,
      },
      {
        id: 'cidre-fermier',
        nameFr: 'Cidre Fermier Brut',
        nameEn: 'Dry Farm Cider',
        descriptionFr: 'Cidre fermier brut, non filtre, service frais.',
        descriptionEn: 'Dry unfiltered farmhouse cider, served chilled.',
        price: 6,
        dietary: ['vegan', 'gluten-free'],
        available: false,
      },
    ],
  },
  {
    id: 'composez',
    titleFr: 'Composez votre plateau',
    titleEn: 'Build Your Board',
    items: [
      {
        id: 'base-fromage',
        nameFr: 'Base 3 Fromages',
        nameEn: '3-Cheese Base',
        descriptionFr: 'Trois fromages au choix, pain, condiments et fruits secs.',
        descriptionEn: 'Three cheeses of your choice, bread, condiments, and dried fruits.',
        price: 15,
        dietary: ['vegetarian'],
        available: true,
      },
      {
        id: 'base-mixte',
        nameFr: 'Base Mixte',
        nameEn: 'Mixed Base',
        descriptionFr: 'Deux charcuteries, deux fromages et garnitures de saison.',
        descriptionEn: 'Two charcuterie cuts, two cheeses, and seasonal garnishes.',
        price: 18,
        dietary: [],
        available: true,
      },
      {
        id: 'supplement-truffe',
        nameFr: 'Supplement Truffe',
        nameEn: 'Truffle Add-on',
        descriptionFr: 'Option premium avec creme truffee et copeaux de saison.',
        descriptionEn: 'Premium add-on with truffled cream and seasonal shavings.',
        price: 5,
        dietary: ['vegetarian'],
        available: false,
      },
    ],
  },
];
