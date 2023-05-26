import type { MouseEvent } from 'react';
import {
  Button,
  Container,
  createStyles,
  em,
  getBreakpointValue,
  Group,
  Header,
  px,
  Title,
} from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {
        height: '100%',
        justifyContent: 'center',
      },
  },

  title: {
    transition: 'opacity 300ms ease-in-out',
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {
        opacity: 1,
        fontSize: '1.5rem',
      },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  contactButton: {
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

  const [scrolled, setScrolled] = useState(false);

  const { getHTMLElementRef, getHTMLHeadingElementRef } =
    useRefManagerContext();

  const titleRef = getHTMLHeadingElementRef('title');
  const headerRef = getHTMLElementRef('header');

  useEffect(() => {
    if (!globalThis) {
      return;
    }
    const handler = () => {
      const top = titleRef?.current?.getBoundingClientRect().top ?? null;

      if (top === null) {
        return;
      }

      setScrolled(top < 0);
    };

    globalThis.addEventListener('scroll', handler);

    return () => {
      globalThis.removeEventListener('scroll', handler);
    };
  }, [titleRef?.current, globalThis]);

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
      sx={(theme) => ({
        transition: 'background-color 300ms ease-in-out',
        backgroundColor: `${theme.colors.dark[9]}DD`,
        position: 'sticky',
      })}
    >
      <Container className={classes.inner} fluid>
        <Title
          color="orange"
          className={classes.title}
          sx={{
            opacity: scrolled ? 1 : 0,
          }}
          order={1}
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          }}
        >
          Digital Canvas Development
        </Title>
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
      </Container>
    </Header>
  );
};
