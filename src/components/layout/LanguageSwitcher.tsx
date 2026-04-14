'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const getNextPathname = (nextLocale: string, pathname: string) => {
  if (nextLocale === 'fr') {
    // Switching TO French — strip the /en prefix
    const stripped = pathname.replace(/^\/en/, '');
    return stripped === '' ? '/' : stripped;
  }
  // Switching TO English — add /en prefix
  if (pathname === '/') return '/en';
  if (pathname.startsWith('/en')) return pathname;
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
