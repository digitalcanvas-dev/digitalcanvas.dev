import type {
  CSSObject,
  MantineTheme,
  MantineThemeOverride,
} from '@mantine/core';
import { Global } from '@mantine/core';
import { css } from '@emotion/react';

const globalStyles = (theme: MantineTheme) =>
  [
    css`
      @import url('https://fonts.googleapis.com/css2?family=Fira+Mono&family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@300;400;700&display=swap');
    `,
  ] as unknown as CSSObject[];

export const GlobalStyles = () => <Global styles={globalStyles} />;

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    // prettier-ignore
    'brand': ['#DDEFF1', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
  },
  fontFamily: 'Source Sans Pro, Arial, sans-serif',
  fontFamilyMonospace: 'Fira Mono, Courier, monospace',
  headings: {
    fontWeight: '400',
    fontFamily: 'Merriweather, Times New Roman, serif',

    // properties for individual headings, all of them are optional
    sizes: {
      h1: { fontWeight: 400, fontSize: '2rem' },
      h2: { fontSize: '1.8rem' },
      h3: { fontSize: '1.7rem' },
      h4: { fontSize: '1.5rem' },
      h5: { fontSize: '1.4rem' },
      h6: { fontSize: '1.25rem' },
    },
  },
};
