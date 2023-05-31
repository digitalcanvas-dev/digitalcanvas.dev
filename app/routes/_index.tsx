import React, { useRef } from 'react';
import type { ActionArgs, TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';

import { SiteHeader } from '~/components/SiteHeader';
import { About } from '~/components/index/About';
import type { FormErrors } from '~/components/index/Contact';
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

export async function action({ request }: ActionArgs): Promise<
  TypedResponse<
    | { success: true; successMessage: string }
    | {
        success: false;
        errors?: FormErrors;
      }
  >
> {
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
      return json({
        success: false,
        errors: {
          recaptchaValue: 'Invalid ReCAPTCHA response.',
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
    return json({ success: false, errors: validationResult });
  }

  const sentError = await sendContactEmail(
    `${requesterName}`,
    `${requesterEmail}`,
    `${details}`
  );

  if (sentError) {
    return json({
      success: false,
      errors: {
        form: `${sentError}`,
      },
    });
  }

  return json({
    success: true,
    successMessage: 'Message sent!',
  });
}

const enum Section {
  'about' = 'about',
  'services' = 'services',
  'testimonials' = 'testimonials',
  'contact' = 'contact',
}

const contactSelector = `#${Section.contact}`;

const mainCta = {
  link: contactSelector,
  label: 'Contact',
};

const HEADER_HEIGHT = '130px';

const Index = () => {
  const { getHTMLElementRef } = useRefManagerContext();

  const mainRef = getHTMLElementRef('main');

  return (
    <>
      <SiteHeader headerHeight={HEADER_HEIGHT} mainCta={mainCta} />
      <main
        ref={mainRef}
        className="mx-auto -mt-32 max-w-screen-xl px-8 md:px-32"
      >
        <About id={Section.about} contactSelector={contactSelector} />
        <Services id={Section.services} />
        <Contact id={Section.contact} />
      </main>
      <footer className="w-full border-t-2 border-t-teal-100 bg-teal-800 bg-opacity-60 p-8 text-teal-50 md:px-32">
        <p className="mb-4">Copyright &copy; 2023 Digital Canvas LLC</p>
        <p className="text-xs">
          This site collects anonymized usage statistics that cannot be used to
          identify anyone, only for aggregated data to help my business.
          <br />
          Use an adblocker to opt out (I use{' '}
          <a
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
            href="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm"
          >
            uBlock Origin
          </a>
          ).
        </p>
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
