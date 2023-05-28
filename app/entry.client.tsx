/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.client
 */

import { ClientProvider } from '@mantine/remix';
import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrate } from 'react-dom';

startTransition(() => {
  hydrate(
    <StrictMode>
      <ClientProvider>
        <RemixBrowser />
      </ClientProvider>
    </StrictMode>,
    document
  );
});
