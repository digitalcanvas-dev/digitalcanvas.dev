import {
  Links,
  LiveReload,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';

import { GlobalStyles, theme } from './theme';

createEmotionCache({ key: 'mantine' });

export default function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <GlobalStyles />
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <meta
            name="description"
            content="Custom website development for small businesses and startups."
          />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
