import { cssBundleHref } from '@remix-run/css-bundle';
import type {
  LinksFunction,
  TypedResponse,
  V2_MetaFunction,
} from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import ReactGA from 'react-ga4';

import React, { useEffect } from 'react';
import { json } from '@remix-run/node';
import type { Globals } from '~/types';

import stylesheet from '~/tailwind.css';
import global from '~/global.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  { rel: 'stylesheet', href: global },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  // NOTE: Architect deploys the public directory to /_static/
  { rel: 'icon', href: '/_static/favicon.ico' },
];

const META_TITLE =
  'Digital Canvas Development - Custom Web Software and Consultation';

const META_DESCRIPTION =
  'Custom website development and consultation services for small businesses and startups.';

export const meta: V2_MetaFunction = () => [
  {
    charSet: 'utf-8',
  },
  {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1',
  },
  {
    title: META_TITLE,
  },
  {
    name: 'description',
    content: META_DESCRIPTION,
  },
  {
    property: 'og:title',
    content: META_TITLE,
  },
  {
    property: 'og:description',
    content: META_DESCRIPTION,
  },
  {
    property: 'og:image',
    content: '/_static/LogoWhiteBgCropped1200x720.webp',
  },
  {
    property: 'og:image:width',
    content: '1200',
  },
  {
    property: 'og:image:height',
    content: '720',
  },
];

export const loader = async (): Promise<
  TypedResponse<{
    ENV: Pick<Globals, 'GOOGLE_ADS_KEY' | 'GOOGLE_ANALYTICS_KEY'>;
  }>
> => {
  return json<{
    ENV: Pick<Globals, 'GOOGLE_ADS_KEY' | 'GOOGLE_ANALYTICS_KEY'>;
  }>({
    ENV: {
      GOOGLE_ADS_KEY: `${process.env.GOOGLE_ADS_KEY}`,
      GOOGLE_ANALYTICS_KEY: `${process.env.GOOGLE_ANALYTICS_KEY}`,
    },
  });
};

export default function App() {
  const data = useLoaderData();

  useEffect(() => {
    setTimeout(() => {
      if (!data.ENV.GOOGLE_ADS_KEY) {
        return;
      }

      // @ts-ignore
      window.dataLayer = window.dataLayer || [];

      // @ts-ignore
      window.gtag = () => {
        // @ts-ignore
        window.dataLayer.push(arguments);
      };

      // @ts-ignore
      window.gtag('js', new Date());
      // @ts-ignore
      window.gtag('config', data.ENV.GOOGLE_ADS_KEY);
    }, 0);
  }, [data.ENV.GOOGLE_ADS_KEY]);

  useEffect(() => {
    setTimeout(() => {
      if (!data.ENV.GOOGLE_ANALYTICS_KEY) {
        return;
      }
      ReactGA.initialize(data.ENV.GOOGLE_ANALYTICS_KEY, {
        testMode: process.env.NODE_ENV === 'development',
      });
    }, 0);
  }, [data.ENV.GOOGLE_ANALYTICS_KEY]);

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
        {process.env.NODE_ENV !== 'development' ? (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${data.ENV.GOOGLE_ADS_KEY}`}
          />
        ) : null}
        <LiveReload />
      </body>
    </html>
  );
}
