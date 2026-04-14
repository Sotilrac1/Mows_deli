# Mow's Deli — Cursor Build Instructions

You are building **mows-deli**, a bilingual (French/English) restaurant website for a New York style deli and fine épicerie in Toulouse, France. Read this entire file before writing any code.

---

## Project Overview

- **Business:** Mow's Deli — New York deli + fine épicerie, Toulouse, France
- **Primary language:** French (default, served at `/`)
- **Secondary language:** English (served at `/en/`)
- **Tone:** Warm, high-quality, NYC-meets-France. Not a fast food site — think neighbourhood institution.

---

## Tech Stack

| Layer | Package | Notes |
|---|---|---|
| Framework | `next` 14+ | App Router only. No Pages Router. |
| Language | TypeScript | Strict mode on |
| Internationalisation | `next-intl` | App Router setup with `[locale]` segment |
| Styling | `tailwindcss` | Utility-first. Custom tokens defined in config. |
| Fonts | `next/font/google` | Playfair Display + Inter + Courier Prime |
| Icons | `lucide-react` | No other icon library |
| Forms | `react-hook-form` + `zod` | Contact form only |
| Email | `resend` | Contact form submissions |
| Content | JSON files in `/src/data/` | Menu and site content — no CMS at this stage |
| Images | `next/image` | All images must use this component |
| Deployment | Vercel | `vercel.json` not needed — defaults are fine |

---

## Internationalisation Setup (next-intl)

### Supported locales
```ts
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';
```

### Locale prefix strategy
- French: `/` (no prefix — default locale)
- English: `/en/...`
- Use `localePrefix: 'as-needed'` in next-intl middleware

### Required files

**`src/i18n.ts`**
```ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default
}));
```

**`src/middleware.ts`**
```ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n.config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

**`next.config.ts`**
```ts
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

export default withNextIntl({
  images: {
    formats: ['image/avif', 'image/webp'],
  }
});
```

### Translation file location
- `messages/fr.json` — French strings (complete, no missing keys)
- `messages/en.json` — English strings (must mirror fr.json structure exactly)

### How to use translations in components
```tsx
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('home');
  return <h1>{t('hero_title')}</h1>;
}
```

For server components use `getTranslations`:
```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('home');
  return <h1>{t('hero_title')}</h1>;
}
```

---

## Project File Structure

```
mows-deli/
├── src/
│   ├── app/
│   │   └── [locale]/
│   │       ├── layout.tsx
│   │       ├── page.tsx                  # Homepage
│   │       ├── menu/
│   │       │   └── page.tsx
│   │       ├── notre-histoire/
│   │       │   └── page.tsx
│   │       ├── epicerie/
│   │       │   └── page.tsx
│   │       ├── vins-bieres/
│   │       │   └── page.tsx
│   │       ├── contact/
│   │       │   └── page.tsx
│   │       └── mentions-legales/
│   │           └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── HoursStrip.tsx
│   │   │   ├── HighlightsRow.tsx
│   │   │   ├── FeaturedItems.tsx
│   │   │   └── ReviewsStrip.tsx
│   │   ├── menu/
│   │   │   ├── MenuSection.tsx
│   │   │   ├── MenuItem.tsx
│   │   │   └── MenuSectionNav.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── DietaryBadge.tsx
│   │       └── SectionHeader.tsx
│   ├── data/
│   │   ├── menu.ts                       # All menu items and sections
│   │   └── site.ts                       # Address, hours, contact info
│   ├── lib/
│   │   ├── schema.ts                     # LocalBusiness JSON-LD generator
│   │   └── utils.ts                      # cn() helper and shared utils
│   └── middleware.ts
├── messages/
│   ├── fr.json
│   └── en.json
├── public/
│   └── images/
│       ├── hero.jpg
│       └── og-image.jpg
├── i18n.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Tailwind Design Tokens

Add these to `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      brand: {
        black:  '#1A1A1A',
        red:    '#C0392B',
        cream:  '#F5F0E8',
        green:  '#2D4A3E',
        white:  '#FFFFFF',
      }
    },
    fontFamily: {
      serif:  ['Playfair Display', 'Georgia', 'serif'],
      sans:   ['Inter', 'system-ui', 'sans-serif'],
      mono:   ['Courier Prime', 'Courier New', 'monospace'],
    }
  }
}
```

### Design rules
- Page backgrounds: `bg-brand-cream`
- All headings: `font-serif text-brand-black`
- Body text: `font-sans text-brand-black`
- Prices: `font-mono text-brand-black`
- Primary CTA buttons: `bg-brand-red text-white hover:bg-brand-black`
- Secondary CTA buttons: `border border-brand-black text-brand-black hover:bg-brand-black hover:text-white`
- Section headers always have a thin `border-b border-brand-black/20` underneath

---

## URL Structure & Routing

| Page | FR path | EN path |
|---|---|---|
| Homepage | `/` | `/en` |
| Menu | `/menu` | `/en/menu` |
| About | `/notre-histoire` | `/en/notre-histoire` |
| Épicerie | `/epicerie` | `/en/epicerie` |
| Wine & Beer | `/vins-bieres` | `/en/vins-bieres` |
| Contact | `/contact` | `/en/contact` |
| Legal | `/mentions-legales` | `/en/mentions-legales` |

> URL slugs do NOT change between locales — only the content changes. This simplifies the routing.

---

## Data Layer — Menu Content

All menu content lives in `src/data/menu.ts`. Do not hardcode menu items in component files.

### Types
```ts
export type DietaryFlag = 'vegetarian' | 'vegan' | 'gluten-free';

export interface MenuItem {
  id: string;
  nameFr: string;
  nameEn: string;
  descriptionFr?: string;
  descriptionEn?: string;
  price: number;          // in euros, e.g. 12.50
  image?: string;         // path from /public/images/menu/
  dietary: DietaryFlag[];
  available: boolean;
}

export interface MenuSection {
  id: string;
  titleFr: string;
  titleEn: string;
  items: MenuItem[];
}
```

### Placeholder data structure
```ts
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
        descriptionFr: 'Pastrami tranché, moutarde de Dijon, cornichons, pain de seigle',
        descriptionEn: 'Sliced pastrami, Dijon mustard, pickles, rye bread',
        price: 13.50,
        dietary: [],
        available: true,
      }
      // add more items here
    ]
  },
  // sections: sandwichs, charcuterie, fromages, accompagnements, desserts, vins-bieres, composez
];
```

### Site data
```ts
// src/data/site.ts
export const siteConfig = {
  name: "Mow's Deli",
  address: {
    street: 'TBD',
    city: 'Toulouse',
    postalCode: 'TBD',
    country: 'France',
  },
  phone: 'TBD',
  email: 'TBD',
  hours: {
    // fill in when confirmed
  },
  social: {
    instagram: 'https://instagram.com/mowsdeli',
    facebook: 'https://facebook.com/mowsdeli',
  }
};
```

---

## SEO — Every Page Must Have

### generateMetadata() in every page.tsx
```tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('home_title'),         // e.g. "Mow's Deli | New York Deli Toulouse"
    description: t('home_description'),
    alternates: {
      canonical: locale === 'fr' ? '/' : '/en',
      languages: {
        'fr': '/',
        'en': '/en',
      }
    },
    openGraph: {
      images: ['/images/og-image.jpg'],
    }
  };
}
```

### LocalBusiness JSON-LD
Add to `src/app/[locale]/layout.tsx`:
```tsx
import { siteConfig } from '@/data/site';

// Inside layout return:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": siteConfig.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address.street,
        "addressLocality": "Toulouse",
        "addressCountry": "FR"
      },
      "telephone": siteConfig.phone,
      "url": "https://mowsdeli.fr",
      "servesCuisine": ["American", "French", "Deli"],
      "priceRange": "€€",
      "menu": "https://mowsdeli.fr/menu"
    })
  }}
/>
```

---

## Component Patterns

### All pages are async server components by default
```tsx
// app/[locale]/menu/page.tsx
import { menuSections } from '@/data/menu';

export default async function MenuPage() {
  return (
    <main>
      {menuSections.map(section => (
        <MenuSection key={section.id} section={section} />
      ))}
    </main>
  );
}
```

### Client components only when needed
Mark `'use client'` only for components that need:
- `useState` / `useEffect`
- Browser events (onClick handlers for interactive UI)
- `useTranslations` hook (prefer `getTranslations` in server components)

### Image component usage
```tsx
import Image from 'next/image';

// Always provide width, height, and alt
<Image
  src="/images/hero.jpg"
  alt="Interior of Mow's Deli, Toulouse"
  width={1200}
  height={800}
  priority   // only for above-the-fold images
  className="object-cover w-full h-full"
/>
```

### Language switcher
```tsx
'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggle = () => {
    const next = locale === 'fr' ? 'en' : 'fr';
    const newPath = next === 'fr'
      ? pathname.replace(/^\/en/, '') || '/'
      : `/en${pathname}`;
    router.push(newPath);
  };

  return (
    <button onClick={toggle} className="font-sans text-sm uppercase tracking-wide">
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  );
}
```

---

## Page Sections Checklist

### Homepage (`/`)
- [ ] `<Navbar />` — logo, nav links, language switcher
- [ ] `<Hero />` — full-width image, tagline, 2 CTA buttons ("Voir la carte" / "Nous trouver")
- [ ] `<HoursStrip />` — one-line opening hours + address
- [ ] `<HighlightsRow />` — 3 cards: Sandwiches / Charcuterie / Vins
- [ ] About teaser — photo + short paragraph + link
- [ ] `<FeaturedItems />` — 3–4 menu items with photo, name, price
- [ ] `<ReviewsStrip />` — star rating + 2–3 customer quotes (static placeholder for now)
- [ ] `<Footer />` — address, hours, socials, legal link, language switcher

### Menu (`/menu`)
- [ ] `<MenuSectionNav />` — sticky horizontal tab bar linking to each section
- [ ] `<MenuSection />` per category — title, item list
- [ ] `<MenuItem />` — photo, name, description, dietary badges, price
- [ ] Sections: Sandwichs · Charcuterie · Fromages · Accompagnements · Desserts · Vins & Bières · Composez

### About (`/notre-histoire`)
- [ ] Full-width header photo
- [ ] Story in 3–4 paragraphs (placeholder text, to be replaced)
- [ ] "Our philosophy" block
- [ ] CTA linking to menu

### Épicerie (`/epicerie`)
- [ ] Intro paragraph
- [ ] Product category grid (static, placeholder items)
- [ ] "Come visit us" CTA with hours

### Vins & Bières (`/vins-bieres`)
- [ ] Intro
- [ ] Wine list
- [ ] Beer list
- [ ] Pairing suggestions
- [ ] Photos

### Contact (`/contact`)
- [ ] Address + click-to-navigate link
- [ ] Google Maps embed (`<iframe>` from Google Maps)
- [ ] Phone — `<a href="tel:+33XXXXXXXXX">`
- [ ] Opening hours table
- [ ] Contact form (React Hook Form + Zod + Resend API route)

### Mentions légales (`/mentions-legales`)
- [ ] Standard French legal text (éditeur, hébergeur, RGPD)

---

## Contact Form — API Route

Create `src/app/api/contact/route.ts`:

```ts
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'Invalid input' }, { status: 400 });

  await resend.emails.send({
    from: 'website@mowsdeli.fr',
    to: 'contact@mowsdeli.fr',
    subject: `New message from ${parsed.data.name}`,
    text: parsed.data.message,
    replyTo: parsed.data.email,
  });

  return Response.json({ success: true });
}
```

---

## Environment Variables

Create `.env.local` (never commit this file):
```
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Add to Vercel project settings for production.

---

## Build Order

Build in this sequence to avoid blocking on missing dependencies:

1. `next.config.ts` + `tailwind.config.ts` + font setup
2. `middleware.ts` + `i18n.ts` + `messages/fr.json` + `messages/en.json`
3. `src/data/site.ts` + `src/data/menu.ts` (placeholder data)
4. `Navbar` + `Footer` + `LanguageSwitcher` (needed on every page)
5. `[locale]/layout.tsx` — wraps everything, includes JSON-LD
6. **Homepage** — first full page, validates the layout system
7. **Menu page** — most important page, validates the data layer
8. Remaining pages in order: About → Contact → Épicerie → Vins → Legal

---

## Placeholder Content Rules

- Use realistic French placeholder text — not Lorem Ipsum
- Menu prices: use `TBD` in code comments, not `0` — to avoid publishing wrong prices
- Images: use a local placeholder or `https://placehold.co/800x600/F5F0E8/1A1A1A` until real photos arrive
- Address and phone: use `"À venir"` in the UI until confirmed

---

## What NOT to Do

- Do not use the Pages Router (`/pages/` directory)
- Do not use `getServerSideProps` or `getStaticProps` — use async server components
- Do not hardcode French or English text in JSX — always use `t('key')`
- Do not install a component library (shadcn, MUI, etc.) — build UI from scratch with Tailwind
- Do not use `<img>` tags — always use `next/image`
- Do not add Sanity or any other CMS — content comes from `/src/data/` files for now
- Do not add e-commerce or payment — out of scope for v1

---

*Last updated: April 2026 — v1.0*
