import ReCAPTCHA from 'react-google-recaptcha';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from '@remix-run/react';
import React, { useRef, useState } from 'react';
import type { FormEventHandler } from 'react';
import type { TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';

import type { Globals } from '~/types';

import { validateCaptcha } from '~/utils/captcha.server';
import { sendContactEmail, validateContactForm } from '~/utils/contact.server';

import { useRefManagerContext } from '~/components/index/RefManagerContext';
import { InputText } from '~/components/InputText';
import { Textarea } from '~/components/Textarea';
import { IndexSection } from '~/components/index/IndexSection';

interface ContactFormValues {
  name: string;
  email: string;
  details: string;
  recaptchaValue: string;
  _action: string;
}

type FormErrors = {
  [K in keyof Pick<
    ContactFormValues,
    'name' | 'email' | 'details' | 'recaptchaValue'
  >]?: string;
} & {
  form?: string;
};

export async function sendContact(formData: FormData): Promise<
  TypedResponse<
    | { success: true; successMessage: string }
    | {
        success: false;
        errors?: FormErrors;
      }
  >
> {
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
    successMessage: 'Thank you for reaching out! Expect to hear back soon.',
  });
}

export const Contact = () => {
  // using the ref to get the value would be cumbersome since it would involve a
  // useEffect with a ref dependency.
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const actionData = useActionData<
    | {
        errors: FormErrors;
        success: false;
      }
    | { success: true; successMessage: string }
  >();

  const navigation = useNavigation();

  const data = useLoaderData<{
    ENV: Pick<Globals, 'CAPTCHA_SITE_KEY' | 'NODE_ENV'>;
  }>();

  const skipClientRecaptcha = data.ENV.NODE_ENV === 'development';

  const { getRef } = useRefManagerContext();

  const contactRef = getRef('contact');

  const submit = useSubmit();

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    await submit(e.currentTarget);
    setRecaptchaValue(null);
    recaptchaRef?.current?.reset();
    return;
  };

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  return (
    <IndexSection ref={contactRef}>
      <h3 className="font-heading text-3xl text-brand">Get in Touch</h3>

      <Form method="POST" onSubmit={onSubmit}>
        <div className="mt-2.5 grid grid-flow-row auto-rows-auto gap-4 py-4">
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
          <Textarea
            name="details"
            label="Details"
            rows={5}
            errorFeedback={
              !actionData?.success && actionData?.errors?.details
                ? actionData?.errors?.details
                : undefined
            }
          />
          {recaptchaValue ? (
            <input type="hidden" name="recaptchaValue" value={recaptchaValue} />
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
              ref={recaptchaRef}
              onChange={handleRecaptchaChange}
              sitekey={data.ENV.CAPTCHA_SITE_KEY}
            />
          )}
          <button
            name="_action"
            value="contact"
            disabled={
              navigation.state === 'submitting' ||
              (!skipClientRecaptcha && !recaptchaValue)
            }
            className="justify-self-start rounded-3xl bg-brand px-6 py-3 text-sm text-white transition-transform hover:scale-105 disabled:bg-neutral-400"
            type="submit"
          >
            Send
          </button>
        </div>
      </Form>
    </IndexSection>
  );
};
