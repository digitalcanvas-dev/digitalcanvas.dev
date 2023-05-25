import {
  Box,
  createStyles,
  em,
  getBreakpointValue,
  Title,
} from '@mantine/core';
import { IndexSection } from '~/components/IndexSection';
import aboutImg from '../../../public/aboutImg.png';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

interface AboutProps {
  id: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    height: 'calc(100vh - var(--mantine-header-height))',
    display: 'grid',
    gridTemplateAreas: '"text img"',
    alignItems: 'center',
    justifyItems: 'center',
    gridTemplateColumns: 'auto 20rem',
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {
        gridTemplateColumns: 'auto',
      },
  },
  text: {
    gridArea: 'text',
  },

  title: {
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {
        display: 'none',
      },
  },

  img: {
    marginRight: '-20rem',
    width: '20rem',
    gridArea: 'img',
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {
        display: 'none',
      },
  },
}));

export const About = ({ id }: AboutProps) => {
  const { classes } = useStyles();
  const { getHTMLHeadingElementRef } = useRefManagerContext();

  const titleRef = getHTMLHeadingElementRef('title');

  return (
    <IndexSection id={id} className={classes.root}>
      <Box className={classes.text}>
        <Title
          className={classes.title}
          order={1}
          color="orange"
          ref={titleRef}
        >
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
