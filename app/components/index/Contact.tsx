import ReCAPTCHA from 'react-google-recaptcha';
import {
  Form,
  useActionData,
  useLoaderData,
  useSubmit,
} from '@remix-run/react';
import React, { useState } from 'react';
import type { FormEventHandler } from 'react';
import type { Globals } from '~/types';

import { IndexSection } from '~/components/IndexSection';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

import { InputText } from '~/components/InputText';
import { Textarea } from '~/components/Textarea';

interface ContactProps {}

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

export const Contact = ({}: ContactProps) => {
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

  const { getHTMLElementRef } = useRefManagerContext();

  const contactRef = getHTMLElementRef('contact');

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
    <IndexSection
      className="grid grid-flow-row items-center justify-stretch gap-20 pb-20 md:gap-8 lg:grid-flow-col lg:grid-cols-3"
      ref={contactRef}
    >
      <div className="w-full lg:col-span-2">
        <h2 className="font-heading text-3xl text-orange-500">Contact</h2>

        <Form method="POST" onSubmit={onSubmit} onError={onError} className="">
          <div className="mt-2.5 grid grid-flow-row auto-rows-auto gap-4 rounded-2xl bg-white p-4">
            <InputText
              name="name"
              label="Name"
              errorFeedback={
                !actionData?.success && actionData?.errors?.name
                  ? actionData?.errors?.name
                  : undefined
              }
            />
            <InputText
              type="email"
              name="email"
              label="Email"
              errorFeedback={
                !actionData?.success && actionData?.errors?.email
                  ? actionData?.errors?.email
                  : undefined
              }
            />
            <InputText
              name="name"
              label="Name"
              errorFeedback={
                !actionData?.success && actionData?.errors?.name
                  ? actionData?.errors?.name
                  : undefined
              }
            />
            <Textarea
              name="details"
              label="Details"
              errorFeedback={
                !actionData?.success && actionData?.errors?.details
                  ? actionData?.errors?.details
                  : undefined
              }
            />
            {recaptchaValue ? (
              <input
                type="hidden"
                name="recaptchaValue"
                value={recaptchaValue}
              />
            ) : null}
            {!actionData?.success &&
            (actionData?.errors?.form || actionData?.errors?.recaptchaValue) ? (
              <p className="text-xs italic text-red-500">
                {actionData?.errors?.form || actionData?.errors?.recaptchaValue}
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
      </div>
    </IndexSection>
  );
};
