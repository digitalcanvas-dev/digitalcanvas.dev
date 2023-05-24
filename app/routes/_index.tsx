import React, { useRef } from 'react';
import type { ActionArgs, TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';
import { createStyles, Footer, rem } from '@mantine/core';

import { SiteHeader } from '~/components/SiteHeader';
import { About } from '~/components/index/About';
import type { ContactFormValues } from '~/components/index/Contact';
import { Contact } from '~/components/index/Contact';

import {
  RefManagerContextProvider,
  useRefManagerContext,
} from '~/components/index/RefManagerContext';

import bg from '../../public/bg-dark.jpg';
import type { Globals } from '~/types';
import { validateCaptcha } from '~/utils/captcha.server';
import { sendContactEmail, validateContactForm } from '~/utils/ses.server';

export const loader = async (): Promise<TypedResponse<{ ENV: Globals }>> => {
  return json<{ ENV: any }>({
    ENV: {
      CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY,
      NODE_ENV: process.env.NODE_ENV,
    },
  });
};

export async function action({
  request,
}: ActionArgs): Promise<null | TypedResponse<{
  errors?: { [K in keyof Partial<ContactFormValues>]: string | null };
}>> {
  const formData = await request.formData();
  const intent = formData.get('intent');
  if (intent !== 'contact') {
    throw new Error(`Unexpected intent: ${intent}`);
  }

  const requesterName = formData.get('name');
  const requesterEmail = formData.get('email');
  const details = formData.get('details');

  if (process.env.NODE_ENV !== 'development') {
    const recaptchaValue = formData.get('recaptchaValue');

    const resp = await validateCaptcha(recaptchaValue);

    if (!resp.success) {
      console.error('invalid captcha response', JSON.stringify(resp));
      return json({
        errors: {
          recaptchaValue: 'Invalid reCAPTCHA response.',
        },
      });
    }
  }

  const validationResult = validateContactForm(
    requesterName,
    requesterEmail,
    details
  );

  if (validationResult !== null) {
    return json({ errors: validationResult });
  }

  const sentSuccess = await sendContactEmail(
    `${requesterName}`,
    `${requesterEmail}`,
    `${details}`
  );

  if (sentSuccess) {
    return null;
  } else {
    return json({
      errors: {
        intent: null,
        email: null,
        name: null,
        recaptchaValue: null,
        details: 'Unknown error',
      },
    });
  }
}

const enum Section {
  'about' = 'about',
  'services' = 'services',
  'testimonials' = 'testimonials',
  'contact' = 'contact',
}

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
  const contactRef = useRef<HTMLElement>(null);

  return (
    <RefManagerContextProvider
      refs={{
        HTMLElement: {
          main: mainRef,
          header: headerRef,
          contact: contactRef,
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
