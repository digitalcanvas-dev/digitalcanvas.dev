import {
  Box,
  createStyles,
  em,
  getBreakpointValue,
  rem,
  Text,
} from '@mantine/core';
import { IndexSection } from '~/components/IndexSection';
import logo from '../../../public/dcdLogo.svg';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

interface AboutProps {
  id: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    height: 'calc(100vh - var(--mantine-header-height))',
    display: 'grid',
    gridTemplateAreas: '"img text"',
    alignItems: 'center',
    justifyItems: 'center',
    gridTemplateColumns: 'auto auto',
    gap: 50,
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {
        gridTemplateAreas: '"img" "text"',
        gridTemplateColumns: 'auto',
        gridTemplateRows: 'auto',
      },
  },
  text: {
    gridArea: 'text',
  },
  img: {
    gridArea: 'img',
    height: rem(100),
    [`@media (max-width: ${em(getBreakpointValue(theme.breakpoints.sm) - 1)})`]:
      {},
  },
}));

export const About = ({ id }: AboutProps) => {
  const { classes } = useStyles();
  const { getHTMLImgElementRef } = useRefManagerContext();

  const titleLogoRef = getHTMLImgElementRef('titleLogo');

  return (
    <IndexSection id={id} className={classes.root}>
      <img src={logo} className={classes.img} alt="" ref={titleLogoRef} />
      <Box className={classes.text}>
        <Text component="p" size="xl">
          Specializing in the unique needs of both businesses and startups,{' '}
          <strong>Digital Canvas Development</strong> provides tailored
          solutions in custom software development and consulting.
        </Text>
        <Text component="p" size="xl">
          Whether you need a new or updated website, or you're looking for
          someone with over 10 years' of experience to coordinate with an
          existing team, <strong>Digital Canvas Development</strong> can help!
        </Text>
      </Box>
    </IndexSection>
  );
};
