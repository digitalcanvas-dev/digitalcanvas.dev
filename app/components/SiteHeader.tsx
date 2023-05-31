import type { MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import logo from '../../public/dcdLogo.svg';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

interface SiteHeaderProps {
  mainCta: {
    link: string;
    label: string;
  };
  headerHeight: string;
}

export const SiteHeader = ({ mainCta, headerHeight }: SiteHeaderProps) => {
  const clickHandler = useCallback(
    (evt: MouseEvent, to: string, offsetPx: number) => {
      const target = document.querySelector(to);

      if (!target) {
        console.error(`missing target: ${to}`);
        return;
      }

      const { top } = target.getBoundingClientRect();

      window.scrollBy({ top: top - offsetPx, behavior: 'smooth' });
    },
    []
  );

  const [scrolled, setScrolled] = useState(0);

  const headerHeightPx = parseInt(headerHeight, 10);

  const { getHTMLElementRef, getHTMLImgElementRef } = useRefManagerContext();

  const titleLogoRef = getHTMLImgElementRef('titleLogo');
  const headerRef = getHTMLElementRef('header');

  useEffect(() => {
    if (!window) {
      return;
    }

    const handler = () => {
      const bottom =
        titleLogoRef?.current?.getBoundingClientRect().bottom ?? null;

      if (bottom === null) {
        return;
      }

      setScrolled(bottom);
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleLogoRef?.current]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 flex h-32 flex-row justify-center bg-teal-100 bg-opacity-0 px-8 opacity-0 bg-blend-color transition-opacity md:justify-between md:px-32 md:opacity-100 md:transition-opacity ${
        scrolled < 0 ? 'bg-opacity-80 opacity-100 md:bg-opacity-80' : ''
      }`}
    >
      <img
        src={logo}
        className={`mb-2 mt-5 h-20 opacity-0 transition-opacity ${
          scrolled < 0 ? 'opacity-100' : ''
        }`}
        alt="Digital Canvas Development"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }}
      />
      <button
        type="button"
        className="hidden self-start rounded-b-3xl bg-orange-500 px-20 py-6 align-top font-body text-white hover:bg-orange-600 md:block"
        onClick={(evt) => clickHandler(evt, mainCta.link, headerHeightPx)}
      >
        {mainCta.label}
      </button>
    </header>
  );
};
