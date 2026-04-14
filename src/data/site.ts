export const siteConfig = {
  name: "Mow's Deli",
  url: 'https://mowsdeli.fr',
  email: 'contact@mowsdeli.fr',
  address: {
    street: 'Adresse a venir',
    city: 'Toulouse',
    postalCode: '31000',
    country: 'France',
  },
  phone: '+33 0 00 00 00 00',
  hours: {
    monday: 'Fermeture',
    tuesday: '10:00 - 19:00',
    wednesday: '10:00 - 19:00',
    thursday: '10:00 - 19:00',
    friday: '10:00 - 21:00',
    saturday: '10:00 - 21:00',
    sunday: '10:00 - 15:00',
  },
  social: {
    instagram: 'https://instagram.com/mowsdeli',
    facebook: 'https://facebook.com/mowsdeli',
  },
} as const;
