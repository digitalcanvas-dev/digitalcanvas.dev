import ReCAPTCHA from 'react-google-recaptcha';
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import type { FormEventHandler } from 'react';
import type { Globals } from '~/types';

import { IndexSection } from '~/components/IndexSection';
import { useRefManagerContext } from '~/components/index/RefManagerContext';
import React, { useState } from 'react';

interface ContactProps {
  id: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  details: string;
  recaptchaValue: string;
  intent: string;
}

export const Contact = ({ id }: ContactProps) => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const actionData = useActionData<{
    errors?: Record<Partial<keyof ContactFormValues>, string>;
  }>();

  const data = useLoaderData<{ ENV: Globals }>();

  const skipClientRecaptcha = data.ENV.NODE_ENV === 'development';

  const { getHTMLHeadingElementRef } = useRefManagerContext();

  const contactTitleRef = getHTMLHeadingElementRef('contactTitle');

  const submit = useSubmit();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    await submit(e.currentTarget);
    setRecaptchaValue(null);
    return;
  };

  const onError: FormEventHandler<HTMLFormElement> = (e) => {
    console.error(e);
  };

  const onCaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  return (
    <IndexSection id={id} className="" style={{ height: 'calc(100vh - 5rem)' }}>
      <h2
        ref={contactTitleRef}
        className="font-heading text-xl text-orange-500"
      >
        Contact
      </h2>

      <Form method="POST" onSubmit={onSubmit} onError={onError} className="">
        <div className="mt-2.5 grid grid-flow-row auto-rows-auto gap-4 rounded-2xl bg-white p-4">
          <div>
            <label className="mb-2 block text-sm text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
                actionData?.errors?.name ? 'border-red-500' : ''
              }`}
            />
            {actionData?.errors?.name ? (
              <p className="text-xs italic text-red-500">
                {actionData?.errors?.name}
              </p>
            ) : null}
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-700" htmlFor="email">
              Contact email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
                actionData?.errors?.name ? 'border-red-500' : ''
              }`}
            />
            {actionData?.errors?.email ? (
              <p className="text-xs italic text-red-500">
                {actionData?.errors?.email}
              </p>
            ) : null}
          </div>
          <div>
            <label
              className="mb-2 block text-sm text-gray-700"
              htmlFor="details"
            >
              Details
            </label>
            <textarea
              name="details"
              id="details"
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${
                actionData?.errors?.name ? 'border-red-500' : ''
              }`}
            />
            {actionData?.errors?.details ? (
              <p className="text-xs italic text-red-500">
                {actionData?.errors?.details}
              </p>
            ) : null}
          </div>
          <input type="hidden" name="intent" value="contact" />
          {recaptchaValue ? (
            <input type="hidden" name="recaptchaValue" value={recaptchaValue} />
          ) : null}
          {actionData?.errors?.recaptchaValue ?? undefined}
          {skipClientRecaptcha ? null : (
            <ReCAPTCHA
              onChange={onCaptchaChange}
              sitekey={data.ENV.CAPTCHA_SITE_KEY}
            />
          )}
          <button
            disabled={!skipClientRecaptcha && !recaptchaValue}
            className="justify-self-start rounded-xl bg-orange-500 px-6 py-3 text-sm text-white hover:bg-orange-600"
            type="submit"
          >
            Send
          </button>
        </div>
      </Form>
    </IndexSection>
  );
};
