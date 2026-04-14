'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const getNextPathname = (locale: string, pathname: string) => {
  if (locale === 'fr') {
    const normalizedPath = pathname === '/fr' ? '/' : pathname.replace(/^\/fr/, '');
    return normalizedPath === '' ? '/' : normalizedPath;
  }

  if (pathname === '/') {
    return '/en';
  }

  if (pathname.startsWith('/en')) {
    return pathname;
  }

  return `/en${pathname}`;
};

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleToggleLanguage = () => {
    const nextLocale = locale === 'fr' ? 'en' : 'fr';
    router.push(getNextPathname(nextLocale, pathname));
  };

  return (
    <button
      type="button"
      onClick={handleToggleLanguage}
      className="font-sans text-sm uppercase tracking-widest text-brand-black transition hover:text-brand-red"
      aria-label={locale === 'fr' ? 'Switch language to English' : 'Changer la langue en francais'}
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  );
};
