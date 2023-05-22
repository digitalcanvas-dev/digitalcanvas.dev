import type { MouseEvent } from 'react';
import {
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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

const clickHandler = (evt: MouseEvent, to: string) => {
  const target = document.getElementById(to);

  if (!target) {
    console.error(`missing target: ${to}`);
    return;
  }

  const { top } = target.getBoundingClientRect();

  console.log(top);

  window.scrollBy({ top: top - 60, behavior: 'smooth' });
};

export const SiteHeader = ({
  headerHeight,
  links,
  mainCta,
}: SiteHeaderProps) => {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => {
    return (
      <Button
        variant="light"
        key={link.label}
        radius="xl"
        color="brand"
        sx={{
          fontWeight: 'normal',
        }}
        h={44}
        onClick={(evt) => clickHandler(evt, link.link)}
      >
        {link.label}
      </Button>
    );
  });

  const innerStyle = {
    height: headerHeight,
  };

  return (
    <Header
      height={headerHeight}
      sx={{
        borderBottom: 0,
        position: 'sticky',
        border: '0px solid #fff',
        borderBottomWidth: 1,
      }}
    >
      <Container className={classes.inner} style={innerStyle} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Title
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
          <Button
            radius="xl"
            h={44}
            color="orange"
            onClick={(evt) => clickHandler(evt, mainCta.link)}
          >
            {mainCta.label}
          </Button>
        </Group>
      </Container>
    </Header>
  );
};
