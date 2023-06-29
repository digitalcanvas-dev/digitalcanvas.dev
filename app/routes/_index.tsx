import React, { useRef } from 'react';
import type { ActionArgs, TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';

import { SiteHeader } from '~/components/SiteHeader';

import { About } from './about';
import { Consultation } from './consultation';
import { CustomDevelopment } from './custom-development';
import { Services } from './services';
import { Testimonials } from './testimonials';
import { WebsiteBuilders } from './website-builders';
import { Contact, sendContact } from './contact';
import { Hero } from './hero';

import {
  RefManagerContextProvider,
  useRefManagerContext,
} from '~/components/index/RefManagerContext';
import { SiteFooter } from '~/components/SiteFooter';
import type { Globals } from '~/types';

export const loader = async (): Promise<
  TypedResponse<{ ENV: Pick<Globals, 'CAPTCHA_SITE_KEY' | 'NODE_ENV'> }>
> => {
  return json<{
    ENV: Pick<Globals, 'CAPTCHA_SITE_KEY' | 'NODE_ENV'>;
  }>({
    ENV: {
      CAPTCHA_SITE_KEY: `${process.env.CAPTCHA_SITE_KEY}`,
      NODE_ENV: process.env.NODE_ENV,
    },
  });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const action = formData.get('_action');
  if (action !== 'contact') {
    throw new Error(`Unexpected _action: ${action}`);
  }

  return sendContact(formData);
};

const HEADER_HEIGHT = '112px';

const Index = () => {
  const { getRef } = useRefManagerContext();

  const mainRef = getRef('main');

  return (
    <>
      <SiteHeader headerHeight={HEADER_HEIGHT} />
      <main ref={mainRef}>
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
  // TODO: find a better approach
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
        main: mainRef,
        header: headerRef,
        contact: contactRef,
        services: servicesRef,
        about: aboutRef,
        testimonials: testimonialsRef,
        title: titleRef,
        contactTitle: contactTitleRef,
        titleLogo: titleLogoRef,
      }}
    >
      <Index />
    </RefManagerContextProvider>
  );
};
