import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Courier_Prime, Inter, Playfair_Display } from 'next/font/google';

import { siteConfig } from '@/data/site';
import { defaultLocale, locales } from '@/i18n';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier-prime',
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const generateMetadata = async ({ params }: LocaleLayoutProps): Promise<Metadata> => {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: tMeta('homeTitle'),
    description: tMeta('homeDescription'),
    openGraph: {
      title: tMeta('homeTitle'),
      description: tMeta('homeDescription'),
      images: ['/images/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: tMeta('homeTitle'),
      description: tMeta('homeDescription'),
      images: ['/images/og-image.jpg'],
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: 'FR',
    },
    telephone: siteConfig.phone,
    url: siteConfig.url,
    servesCuisine: ['American', 'French', 'Deli'],
    priceRange: 'EUR',
    menu: `${siteConfig.url}/menu`,
    inLanguage: [defaultLocale, 'en'],
  };

  return (
    <div
      className={`${playfairDisplay.variable} ${inter.variable} ${courierPrime.variable} min-h-full bg-brand-cream text-brand-black`}
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <div className="flex min-h-screen flex-col">
          <Navbar locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </div>
      </NextIntlClientProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </div>
  );
}
