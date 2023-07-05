/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// todo: see if there's a better way to do this without console errors or warnings...
// @ts-ignore
const root = createRoot(document);
root.render(
  <StrictMode>
    <RemixBrowser />
  </StrictMode>,
);
