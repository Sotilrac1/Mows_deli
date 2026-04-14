'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const languages = [
  { locale: 'fr', flag: '🇫🇷', label: 'Français', prefix: '' },
  { locale: 'en', flag: '🇬🇧', label: 'English', prefix: '/en' },
  { locale: 'de', flag: '🇩🇪', label: 'Deutsch', prefix: '/de' },
  { locale: 'es', flag: '🇪🇸', label: 'Español', prefix: '/es' },
] as const;

const getTargetPath = (targetLocale: (typeof languages)[number]['locale'], pathname: string) => {
  const strippedPath = pathname.replace(/^\/(en|de|es)(?=\/|$)/, '');
  const normalizedPath = strippedPath === '' ? '/' : strippedPath;

  if (targetLocale === 'fr') {
    return normalizedPath;
  }

  const targetLanguage = languages.find((language) => language.locale === targetLocale);
  if (!targetLanguage) {
    return normalizedPath;
  }

  return normalizedPath === '/' ? targetLanguage.prefix : `${targetLanguage.prefix}${normalizedPath}`;
};

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const currentLanguage = languages.find((language) => language.locale === locale) ?? languages[0];

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="cursor-pointer border-none bg-transparent text-2xl"
        aria-label="Choisir la langue"
      >
        {currentLanguage.flag}
      </button>

      {isOpen ? (
        <div className="absolute top-full right-0 z-50 mt-2 min-w-[160px] rounded-none border border-brand-black/10 bg-white shadow-lg">
          {languages.map((language) => {
            const isActive = language.locale === locale;

            return (
              <button
                key={language.locale}
                type="button"
                onClick={() => {
                  router.push(getTargetPath(language.locale, pathname));
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left font-sans text-sm text-brand-black transition hover:bg-brand-cream ${
                  isActive ? 'font-medium' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.label}</span>
                {isActive ? <span className="ml-auto">✓</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
