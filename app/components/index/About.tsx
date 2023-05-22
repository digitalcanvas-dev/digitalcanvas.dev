import { Button, createStyles, Loader, Title } from '@mantine/core';
import { IndexSection } from '~/components/IndexSection';
import { Link } from '@remix-run/react';

interface AboutProps {
  id: string;
  height: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateAreas: '"text img"',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    gridArea: 'text',
  },
  img: {
    gridArea: 'img',
  },
}));

export const About = ({ id, height }: AboutProps) => {
  const { classes } = useStyles();

  return (
    <IndexSection id={id} height={height} className={classes.root}>
      <div className={classes.text}>
        <Title order={2}>Expert Web Development</Title>
        <p>
          Digital Canvas Development provides website and application
          development for your business or startup.
        </p>
        <p>Digital Canvas Development can help you a lot.</p>
        <Button
          h={30}
          color="orange"
          onClick={() => {
            const target = document.getElementById('contact');

            if (!target) {
              console.error(`missing target: contact`);
              return;
            }

            const { top } = target.getBoundingClientRect();

            console.log(top);

            window.scrollBy({ top: top - 60, behavior: 'smooth' });
          }}
        >
          Get in touch
        </Button>
      </div>
      <Loader className={classes.img} />
    </IndexSection>
  );
};
