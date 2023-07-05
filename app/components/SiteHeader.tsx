import type { MouseEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';
import LogoDark from '../../public/LogoDark.svg';
import LogoLight from '../../public/LogoLight.svg';

interface SiteHeaderProps {
  headerHeight: string;
}

const NavItem = ({
  label,
  target,
  scrolledDown,
}: {
  label: string;
  target: HTMLElement;
  scrolledDown: boolean;
}) => {
  const scrollToTarget = useCallback(() => {
    if (!target) {
      return;
    }
    target.scrollIntoView({ behavior: 'smooth' });
  }, [target]);

  return (
    <button
      className={`font-body text-opacity-80 transition-colors hover:text-opacity-100 hover:underline hover:underline-offset-4 ${
        scrolledDown ? 'text-white' : 'text-brand'
      }`}
      onClick={scrollToTarget}
    >
      {label}
    </button>
  );
};

export const SiteHeader = ({ headerHeight }: SiteHeaderProps) => {
  const clickHandler = useCallback(
    (evt: MouseEvent, offsetPx: number, target?: HTMLElement | null) => {
      if (!target) {
        console.error(`missing target: ${target}`);
        return;
      }

      const { top } = target.getBoundingClientRect();

      window.scrollBy({ top: top - offsetPx, behavior: 'smooth' });
    },
    [],
  );

  const [scrolledPx, setScrolledPx] = useState(0);
  const [navItems, setNavItems] = useState<
    { label: string; target: HTMLElement }[]
  >([]);

  const headerHeightPx = parseInt(headerHeight, 10);

  const { getRef } = useRefManagerContext();

  const titleLogoRef = getRef('titleLogo');
  const headerRef = getRef('header');
  const contactRef = getRef('contact');
  const testimonialsRef = getRef('testimonials');
  const aboutRef = getRef('about');
  const servicesRef = getRef('services');

  useEffect(() => {
    if (!window) {
      return;
    }

    const handler = () => {
      const { top } = document.body.getBoundingClientRect();
      setScrolledPx(top);
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleLogoRef?.current]);

  useEffect(() => {
    if (aboutRef?.current && testimonialsRef?.current && servicesRef?.current) {
      setNavItems([
        {
          label: 'About',
          target: aboutRef?.current,
        },
        {
          label: 'Services',
          target: servicesRef?.current,
        },
        {
          label: 'Testimonials',
          target: testimonialsRef?.current,
        },
      ]);
    }
  }, [aboutRef, testimonialsRef, servicesRef]);

  const scrolledDown = scrolledPx < 0;

  return (
    <header
      ref={headerRef}
      style={{
        height: headerHeight,
      }}
      className={`sticky top-0 z-20 flex flex-row items-center justify-between px-8 transition-colors ${
        scrolledDown ? 'bg-brand' : 'bg-white'
      }`}
    >
      <img
        src={scrolledDown ? LogoLight : LogoDark}
        style={{
          height: `${Math.floor(headerHeightPx * 0.5)}px`,
        }}
        alt="Digital Canvas Development"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }}
      />
      <div className="hidden items-center justify-between gap-14 md:flex">
        {navItems.map(({ label, target }) => {
          return (
            <NavItem
              key={label}
              label={label}
              target={target}
              scrolledDown={scrolledDown}
            />
          );
        })}
      </div>
      <button
        type="button"
        className={`rounded-3xl px-4 py-2 font-body text-opacity-80 transition-all hover:scale-105 hover:text-opacity-100 md:px-8 md:py-3.5 ${
          scrolledDown ? 'bg-white text-brand' : 'bg-brand text-white'
        }`}
        onClick={(evt) =>
          clickHandler(evt, headerHeightPx, contactRef?.current)
        }
      >
        Contact Us
      </button>
    </header>
  );
};
