import ReCAPTCHA from 'react-google-recaptcha';
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import React, { useEffect, useRef, useState } from 'react';
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
  const formRef = useRef<HTMLFormElement>(null);

  const navigation = useNavigation();

  const { getRef } = useRefManagerContext();

  const data = useLoaderData<{
    ENV: Pick<Globals, 'CAPTCHA_SITE_KEY' | 'NODE_ENV'>;
  }>();

  const skipClientRecaptcha = data.ENV.NODE_ENV === 'development';

  const contactRef = getRef('contact');

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const actionData = useActionData<{
    successMessage?: string;
    errors?: FormErrors;
  }>();

  useEffect(() => {
    if (actionData?.successMessage && !actionData.errors) {
      formRef.current?.reset();
    }
  }, [actionData?.successMessage, actionData?.errors]);

  const isSubmitting = navigation.state === 'submitting';

  return (
    <IndexSection ref={contactRef}>
      <h3 className="font-heading text-3xl text-brand">Get in Touch</h3>

      <Form method="POST" ref={formRef}>
        <div className="mt-2.5 grid grid-flow-row auto-rows-auto gap-4 py-4">
          <InputText
            name="name"
            label="Name"
            readOnly={isSubmitting}
            errorFeedback={actionData?.errors?.name ?? undefined}
          />
          <InputText
            type="email"
            name="email"
            label="Email"
            readOnly={isSubmitting}
            errorFeedback={actionData?.errors?.email}
          />
          <Textarea
            name="details"
            label="Details"
            rows={5}
            readOnly={isSubmitting}
            errorFeedback={actionData?.errors?.details}
          />
          {recaptchaValue ? (
            <input type="hidden" name="recaptchaValue" value={recaptchaValue} />
          ) : null}
          {actionData?.errors?.form || actionData?.errors?.recaptchaValue ? (
            <p className="text-xs italic text-red-500">
              {actionData?.errors?.form || actionData?.errors?.recaptchaValue}
            </p>
          ) : null}
          {actionData?.successMessage ? (
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
            disabled={isSubmitting || (!skipClientRecaptcha && !recaptchaValue)}
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
