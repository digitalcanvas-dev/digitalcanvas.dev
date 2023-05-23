import type { MouseEvent } from 'react';
import {
  Button,
  Container,
  createStyles,
  Group,
  Header,
  px,
  Title,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
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

const clickHandler = (evt: MouseEvent, to: string, offsetPx: number) => {
  const target = document.getElementById(to);

  if (!target) {
    console.error(`missing target: ${to}`);
    return;
  }

  const { top } = target.getBoundingClientRect();

  window.scrollBy({ top: top - offsetPx, behavior: 'smooth' });
};

export const SiteHeader = ({
  links,
  mainCta,
  headerHeight,
}: SiteHeaderProps) => {
  const { classes } = useStyles();

  const [scrolled, setScrolled] = useState(false);

  const { getHTMLElementRef, getHTMLHeadingElementRef } =
    useRefManagerContext();

  const titleRef = getHTMLHeadingElementRef('title');
  const headerRef = getHTMLElementRef('header');

  useEffect(() => {
    const handler = () => {
      const top = titleRef?.current?.getBoundingClientRect().top ?? null;

      if (top === null) {
        return;
      }

      setScrolled(top < 0);
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [titleRef]);

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
        <Group>
          <Title
            color="orange"
            sx={{
              transition: 'opacity 300ms ease-in-out',
              opacity: scrolled ? 1 : 0,
            }}
            order={1}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }}
          >
            Digital Canvas Development
          </Title>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Group
          spacing={5}
          sx={{
            alignSelf: 'start',
          }}
        >
          <Button
            radius="lg"
            h="auto"
            sx={{
              fontSize: '1rem',
              padding: '22px 75px',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            color="orange"
            onClick={(evt) => clickHandler(evt, mainCta.link, px(headerHeight))}
          >
            {mainCta.label}
          </Button>
        </Group>
      </Container>
    </Header>
  );
};
