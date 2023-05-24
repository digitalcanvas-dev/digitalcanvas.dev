import React, { useRef } from 'react';
import { CloneReceiptRuleSetCommand, SESClient } from '@aws-sdk/client-ses';
import type { ActionArgs } from '@remix-run/node';
import { createStyles, Footer, rem } from '@mantine/core';

import { SiteHeader } from '~/components/SiteHeader';
import { About } from '~/components/index/About';
import { Contact } from '~/components/index/Contact';

import bg from '../../public/bg-dark.jpg';
import {
  RefManagerContextProvider,
  useRefManagerContext,
} from '~/components/index/RefManagerContext';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  console.log(global);
  if (intent !== 'contact') {
    throw new Error(`Unexpected intent: ${intent}`);
  }

  const requesterName = formData.get('name');
  const requesterEmail = formData.get('email');
  const details = formData.get('details');

  console.log({ requesterName, details, requesterEmail });
  if (!requesterName || !details || !requesterEmail) {
    return {
      name: !requesterName ? 'Required' : null,
      email: !requesterEmail ? 'Required' : null,
      details: !details ? 'Required' : null,
    };
  }

  // @ts-ignore

  try {
    const ses = new SESClient({ region: 'es-east-1' });
    const charset = 'utf-8';

    const params = {
      Source: 'no-reply@digitalcanvas.dev',
      Destination: {
        ToAddresses: ['simon@digitalcanvas.dev'],
      },
      Message: {
        Subject: {
          Data: `Contact form request from ${requesterName}`,
          Charset: charset,
        },
        Body: {
          Html: {
            Data: `${requesterName} [${requesterEmail}]<br />${requesterName}`,
            Charset: charset,
          },
        },
      },
    };

    const command = new CloneReceiptRuleSetCommand(params);

    const resp = await ses.send(command);
    console.log(resp);
  } catch (e) {
    console.log(e);
    return {
      name: e instanceof Error ? e.message : `Unknown error ${e}`,
    };
  }
  return null;
}

const enum Section {
  'about' = 'about',
  'services' = 'services',
  'testimonials' = 'testimonials',
  'contact' = 'contact',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const links = [
  {
    link: `${Section.about}`,
    label: 'About',
  },
  {
    link: `${Section.services}`,
    label: 'Services',
  },
  {
    link: `${Section.testimonials}`,
    label: 'Testimonials',
  },
];

const mainCta = {
  link: `${Section.contact}`,
  label: 'Contact',
};

const HEADER_HEIGHT = rem(90);

const useStyles = createStyles((theme) => ({
  main: {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  footer: {
    padding: '5rem 20rem',
    color: theme.colors.dark[1],
  },
}));

const Index = () => {
  const { classes } = useStyles();

  const { getHTMLElementRef } = useRefManagerContext();

  const mainRef = getHTMLElementRef('main');

  return (
    <>
      <SiteHeader headerHeight={HEADER_HEIGHT} links={[]} mainCta={mainCta} />
      <main ref={mainRef} className={classes.main}>
        <About id={Section.about} headerHeight={HEADER_HEIGHT} />
        {/*<Services id={Section.services} />*/}
        <Contact id={Section.contact} headerHeight={HEADER_HEIGHT} />
      </main>
      <Footer height="auto" className={classes.footer}>
        Copyright <span dangerouslySetInnerHTML={{ __html: `&copy;` }} /> 2023
        Digital Canvas LLC
      </Footer>
    </>
  );
};
export default () => {
  const mainRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);

  return (
    <RefManagerContextProvider
      refs={{
        HTMLElement: {
          main: mainRef,
          header: headerRef,
        },
        HTMLHeadingElement: {
          title: titleRef,
          contactTitle: contactTitleRef,
        },
      }}
    >
      <Index />
    </RefManagerContextProvider>
  );
};
