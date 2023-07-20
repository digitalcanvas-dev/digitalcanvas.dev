import { useEffect, useState } from 'react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';
import LogoDark from '../../public/LogoDark.svg';
import LogoLight from '../../public/LogoLight.svg';
import { useNavigate } from '@remix-run/react';

const navItems = [
  {
    label: 'About',
    refId: 'about',
  },
  {
    label: 'Services',
    refId: 'services',
  },
  {
    label: 'Testimonials',
    refId: 'testimonials',
  },
];
const NavItem = ({
  label,
  refId,
  scrolledDown,
  clickHandler,
}: {
  label: string;
  refId: string;
  scrolledDown: boolean;
  clickHandler: (targetId: string) => void;
}) => (
  <button
    className={`font-body text-opacity-80 transition-colors hover:text-opacity-100 hover:underline hover:underline-offset-4 ${
      scrolledDown ? 'text-white' : 'text-brand'
    }`}
    onClick={() => clickHandler(refId)}
  >
    {label}
  </button>
);

interface SiteHeaderProps {
  headerHeight: string;
}

export const SiteHeader = ({ headerHeight }: SiteHeaderProps) => {
  const headerHeightPx = parseInt(headerHeight, 10);

  const [scrolledPx, setScrolledPx] = useState(0);

  const {
    refs: { header: headerRef },
  } = useRefManagerContext();

  const nav = useNavigate();

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
  }, []);

  useEffect(() => {
    /** initiate correct header styling on load */
    const { top } = document.body.getBoundingClientRect();
    setScrolledPx(top);
  }, []);

  const isScrolledDown = scrolledPx < 0;

  const onNavClick = (targetId: string) => {
    nav(`#${targetId}`, { preventScrollReset: true, relative: 'path' });
    // scrollToElement(targetId);
  };

  return (
    <header
      ref={headerRef}
      style={{
        height: headerHeight,
      }}
      className={`sticky top-0 z-20 flex flex-row items-center justify-between px-8 transition-colors ${
        isScrolledDown ? 'bg-brand' : 'bg-white'
      }`}
    >
      <img
        src={isScrolledDown ? LogoLight : LogoDark}
        style={{
          height: `${Math.floor(headerHeightPx * 0.5)}px`,
        }}
        alt="Digital Canvas Development"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
      <div className="hidden items-center justify-between gap-14 md:flex">
        {navItems.map(({ label, refId }) => {
          return (
            <NavItem
              key={label}
              label={label}
              refId={refId}
              scrolledDown={isScrolledDown}
              clickHandler={onNavClick}
            />
          );
        })}
      </div>
      <button
        type="button"
        className={`rounded-3xl px-4 py-2 font-body text-opacity-80 transition-all hover:scale-105 hover:text-opacity-100 md:px-8 md:py-3.5 ${
          isScrolledDown ? 'bg-white text-brand' : 'bg-brand text-white'
        }`}
        onClick={() => onNavClick('contact')}
      >
        Contact Us
      </button>
    </header>
  );
};
