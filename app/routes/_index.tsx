import React, { useRef } from 'react';
import type { ActionArgs, TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';

import { SiteHeader } from '~/components/SiteHeader';
import { About } from '~/components/index/About';
import type { ContactFormValues } from '~/components/index/Contact';
import { Contact } from '~/components/index/Contact';
import { Services } from '~/components/index/Services';

import {
  RefManagerContextProvider,
  useRefManagerContext,
} from '~/components/index/RefManagerContext';

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

  const sentError = await sendContactEmail(
    `${requesterName}`,
    `${requesterEmail}`,
    `${details}`
  );

  if (sentError) {
    return json({
      errors: {
        intent: null,
        email: null,
        name: null,
        recaptchaValue: null,
        details: `${sentError}`,
      },
    });
  }
  return null;
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

const HEADER_HEIGHT = '130px';

const Index = () => {
  const { getHTMLElementRef } = useRefManagerContext();

  const mainRef = getHTMLElementRef('main');

  return (
    <>
      <SiteHeader headerHeight={HEADER_HEIGHT} mainCta={mainCta} />
      <main ref={mainRef} className="-mt-32 px-8 md:px-32">
        <About id={Section.about} />
        <Services id={Section.services} />
        <Contact id={Section.contact} />
      </main>
      <footer className="w-full px-32 py-8 text-gray-950 md:p-8">
        Copyright &copy; 2023 Digital Canvas LLC
      </footer>
    </>
  );
};
export default () => {
  const mainRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const titleLogoRef = useRef<HTMLImageElement>(null);

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
        HTMLImgElement: {
          titleLogo: titleLogoRef,
        },
      }}
    >
      <Index />
    </RefManagerContextProvider>
  );
};
