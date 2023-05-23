import { Button, createStyles, Loader, Title } from '@mantine/core';
import { IndexSection } from '~/components/IndexSection';
import bg from '~/theme/main-bg-3.png';

interface AboutProps {
  id: string;
  height: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateAreas: '"text img"',
    alignItems: 'center',
    justifyItems: 'center',
    gridTemplateColumns: '.5fr .5fr',
    background: `url(${bg})`,
    backgroundSize: 'cover',
  },
  text: {
    gridArea: 'text',
    marginLeft: '10vw',
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
        <Title order={1}>Specialised Software Development</Title>
        <p>
          Specializing in the unique needs of small businesses and startups,
          <b>Digital Canvas Development</b> provides tailored solutions in
          custom development and software consulting.
        </p>
        <p>
          We empower your growth and innovation by bridging technology gaps and
          enhancing your digital presence.
        </p>
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
      <Loader className={classes.img} color="orange" />
    </IndexSection>
  );
};
