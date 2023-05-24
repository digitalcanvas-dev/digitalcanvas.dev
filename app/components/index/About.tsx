import { Box, createStyles, px, Title } from '@mantine/core';
import { IndexSection } from '~/components/IndexSection';
import aboutImg from '../../../public/aboutImg.png';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

interface AboutProps {
  id: string;
  headerHeight: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    margin: '0 0 0 10rem',
    minHeight: '500px',
    display: 'grid',
    gridTemplateAreas: '"text img"',
    alignItems: 'center',
    justifyItems: 'center',
    gridTemplateColumns: '2fr 1fr',
  },
  text: {
    gridArea: 'text',
  },

  img: {
    width: '100%',
    gridArea: 'img',
  },
}));

export const About = ({ id, headerHeight }: AboutProps) => {
  const { classes } = useStyles();
  const sectionHeightStr = `calc(100vh - ${px(headerHeight)})`;
  const { getHTMLHeadingElementRef } = useRefManagerContext();

  const titleRef = getHTMLHeadingElementRef('title');

  return (
    <IndexSection
      id={id}
      className={classes.root}
      style={{ height: sectionHeightStr }}
    >
      <Box className={classes.text}>
        <Title order={1} color="orange" ref={titleRef}>
          Digital Canvas Development
        </Title>
        <p>
          Specializing in the unique needs of businesses and startups,{' '}
          <b>Digital Canvas Development</b> provides tailored solutions in
          custom development and software consulting.
        </p>
        <p>
          We empower your growth and innovation by bridging technology gaps and
          enhancing your digital presence.
        </p>
      </Box>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <img
        src={aboutImg}
        className={classes.img}
        alt="Accessibility is important, but this image isn't."
      />
    </IndexSection>
  );
};
