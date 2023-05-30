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

export type FormErrors = {
  [K in keyof Pick<
    ContactFormValues,
    'name' | 'email' | 'details' | 'recaptchaValue'
  >]?: string;
} & {
  form?: string;
};

export const Contact = ({ id }: ContactProps) => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const actionData = useActionData<
    | {
        errors: FormErrors;
        success: false;
      }
    | { success: true; successMessage: string }
  >();

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

  const inputStyles =
    'w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none';
  const focusInputStyles = 'focus:border-teal-300 focus:border-opacity-80';
  const hoverInputStyles = 'hover:border-teal-300 hover:border-opacity-30';

  return (
    <IndexSection id={id} style={{ height: 'calc(100vh - 5rem)' }}>
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
              className={`${inputStyles} ${
                !actionData?.success && actionData?.errors?.name
                  ? 'border-red-500'
                  : `${hoverInputStyles} ${focusInputStyles}`
              }`}
            />
            {!actionData?.success && actionData?.errors?.name ? (
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
              className={`${inputStyles} ${
                !actionData?.success && actionData?.errors?.name
                  ? 'border-red-500'
                  : `${hoverInputStyles} ${focusInputStyles}`
              }`}
            />
            {!actionData?.success && actionData?.errors?.email ? (
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
              className={`${inputStyles} ${
                !actionData?.success && actionData?.errors?.name
                  ? 'border-red-500'
                  : `${hoverInputStyles} ${focusInputStyles}`
              }`}
            />
            {!actionData?.success && actionData?.errors?.details ? (
              <p className="text-xs italic text-red-500">
                {actionData?.errors?.details}
              </p>
            ) : null}
          </div>
          {recaptchaValue ? (
            <input type="hidden" name="recaptchaValue" value={recaptchaValue} />
          ) : null}
          {!actionData?.success && actionData?.errors?.recaptchaValue ? (
            <p className="text-xs italic text-red-500">
              {actionData?.errors?.recaptchaValue}
            </p>
          ) : null}
          {!actionData?.success && actionData?.errors?.form ? (
            <p className="text-xs italic text-red-500">
              {actionData?.errors?.form}
            </p>
          ) : null}
          {actionData?.success && actionData?.successMessage ? (
            <p className="text-xs italic text-green-800">
              {actionData?.successMessage}
            </p>
          ) : null}
          {skipClientRecaptcha ? null : (
            <ReCAPTCHA
              onChange={onCaptchaChange}
              sitekey={data.ENV.CAPTCHA_SITE_KEY}
            />
          )}
          <input type="hidden" name="intent" value="contact" />
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
