import React, { useRef } from 'react';
import type { ActionArgs, TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';

import { SiteHeader } from '~/components/SiteHeader';
import {
  About,
  Consultation,
  Contact,
  CustomDevelopment,
  Hero,
  Services,
  Testimonials,
  WebsiteBuilders,
} from '~/components/index';
import type { FormErrors } from '~/components/index';

import {
  RefManagerContextProvider,
  useRefManagerContext,
} from '~/components/index/RefManagerContext';

import type { Globals } from '~/types';
import { validateCaptcha } from '~/utils/captcha.server';
import { sendContactEmail, validateContactForm } from '~/utils/ses.server';

import { SiteFooter } from '~/components/SiteFooter';

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
    successMessage: 'Message sent! Expect to hear back soon.',
  });
}

const HEADER_HEIGHT = '112px';

const Index = () => {
  const { getHTMLElementRef } = useRefManagerContext();

  const mainRef = getHTMLElementRef('main');

  return (
    <>
      <SiteHeader headerHeight={HEADER_HEIGHT} />
      <main ref={mainRef} style={{}}>
        <Hero />
        <About />
        <Services />
        <CustomDevelopment />
        <Consultation />
        <WebsiteBuilders />
        <Testimonials />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
};
export default () => {
  const mainRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactTitleRef = useRef<HTMLHeadingElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const titleLogoRef = useRef<HTMLImageElement>(null);

  return (
    <RefManagerContextProvider
      refs={{
        HTMLElement: {
          main: mainRef,
          header: headerRef,
          contact: contactRef,
          services: servicesRef,
          about: aboutRef,
          testimonials: testimonialsRef,
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
