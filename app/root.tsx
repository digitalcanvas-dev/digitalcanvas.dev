import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction, V2_MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import ReactGA from 'react-ga4';

import stylesheet from '~/tailwind.css';
import global from '~/global.css';
import React from 'react';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'stylesheet', href: global },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  // NOTE: Architect deploys the public directory to /_static/
  { rel: 'icon', href: '/_static/favicon.ico' },
];

export const meta: V2_MetaFunction = () => [
  {
    charSet: 'utf-8',
  },
  {
    name: 'description',
    content: 'Custom website development for small businesses and startups.',
  },
  {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1',
  },
  {
    name: 'og:image',
    content: '/_static/LogoWhiteBg.jpg',
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
      {
        void ReactGA.initialize('G-3CJL1CV5C5', {
          testMode: process.env.NODE_ENV === 'development',
        })
      }
    </html>
  );
}
