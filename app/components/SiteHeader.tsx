import type { MouseEvent } from 'react';
import {
  Button,
  clsx,
  createStyles,
  em,
  getBreakpointValue,
  Group,
  Header,
  px,
  rem,
} from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import logo from '../../public/dcdLogo.svg';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

const useStyles = createStyles((theme) => ({
  header: {
    transition: 'background-color 300ms ease-in-out',
    backgroundColor: 'transparent',
    position: 'sticky',
    padding: '0 10rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {
        height: '100%',
        justifyContent: 'center',
      },
  },

  scrolledHeader: {
    backgroundColor: `${theme.colors.teal[1]}DD`,
  },

  logo: {
    /// alignSelf: 'center',
    height: rem(80),
    transition: 'opacity 300ms ease-in-out',
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {
        opacity: 1,
      },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  contactButton: {
    alignSelf: 'start',
    fontSize: '1rem',
    padding: '1.5rem 4.5rem',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {
        display: 'none',
      },
  },
}));

interface SiteHeaderProps {
  links: {
    link: string;
    label: string;
  }[];
  mainCta: {
    link: string;
    label: string;
  };
  headerHeight: string;
}

export const SiteHeader = ({
  links,
  mainCta,
  headerHeight,
}: SiteHeaderProps) => {
  const clickHandler = useCallback(
    (evt: MouseEvent, to: string, offsetPx: number) => {
      const target = document?.getElementById(to);

      if (!target) {
        console.error(`missing target: ${to}`);
        return;
      }

      const { top } = target.getBoundingClientRect();

      window.scrollBy({ top: top - offsetPx, behavior: 'smooth' });
    },
    []
  );

  const { classes } = useStyles();

  const [scrolled, setScrolled] = useState(0);

  const { getHTMLElementRef, getHTMLImgElementRef } = useRefManagerContext();

  const titleLogoRef = getHTMLImgElementRef('titleLogo');
  const headerRef = getHTMLElementRef('header');

  useEffect(() => {
    if (!globalThis) {
      return;
    }
    const handler = () => {
      const top = titleLogoRef?.current?.getBoundingClientRect().top ?? null;

      if (top === null) {
        return;
      }

      setScrolled(top);
    };

    globalThis.addEventListener('scroll', handler);

    return () => {
      globalThis.removeEventListener('scroll', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleLogoRef?.current, globalThis]);

  const items = links.map((link) => {
    return (
      <Button
        variant="subtle"
        key={link.label}
        radius="xl"
        color="brand"
        sx={{
          fontWeight: 'normal',
        }}
        h={44}
        onClick={(evt) => clickHandler(evt, link.link, 0)}
      >
        {link.label}
      </Button>
    );
  });

  return (
    <Header
      ref={headerRef}
      height={headerHeight}
      withBorder={false}
      className={clsx(classes.header, { [classes.scrolledHeader]: scrolled })}
    >
      <img
        src={logo}
        className={classes.logo}
        style={{
          opacity: scrolled < 0 ? 1 : 0,
        }}
        alt=""
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }}
      />
      {items.length ? (
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
      ) : null}
      <Button
        radius="lg"
        h="auto"
        className={classes.contactButton}
        color="orange"
        onClick={(evt) => clickHandler(evt, mainCta.link, px(headerHeight))}
      >
        {mainCta.label}
      </Button>
    </Header>
  );
};
