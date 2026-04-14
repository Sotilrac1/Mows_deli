'use client';

import { useEffect, useMemo, useState } from 'react';

import type { MenuSection } from '@/data/menu';

type MenuSectionNavProps = {
  sections: MenuSection[];
  locale: string;
  ariaLabel: string;
};

const getLocalizedSectionTitle = (locale: string, section: MenuSection) => {
  return locale === 'fr' ? section.titleFr : section.titleEn;
};

export const MenuSectionNav = ({ sections, locale, ariaLabel }: MenuSectionNavProps) => {
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? '');

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && sectionIds.includes(hash)) {
        setActiveSectionId(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [sectionIds]);

  useEffect(() => {
    const observers = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (observers.length === 0) {
      return;
    }

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSectionId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.2, 0.5, 0.8],
      },
    );

    observers.forEach((section) => intersectionObserver.observe(section));

    return () => {
      intersectionObserver.disconnect();
    };
  }, [sectionIds]);

  const handleTabClick = (sectionId: string) => {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) {
      return;
    }

    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${sectionId}`);
    setActiveSectionId(sectionId);
  };

  return (
    <nav
      className="sticky top-20 z-40 overflow-x-auto border-b border-brand-black/10 bg-brand-cream"
      aria-label={ariaLabel}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-nowrap gap-6 px-6 md:px-0">
        {sections.map((section) => {
          const isActive = activeSectionId === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleTabClick(section.id)}
              className={`shrink-0 border-b-2 py-4 font-sans text-sm uppercase tracking-widest transition ${
                isActive ? 'border-brand-red text-brand-red' : 'border-transparent text-brand-black hover:text-brand-red'
              }`}
            >
              {getLocalizedSectionTitle(locale, section)}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
