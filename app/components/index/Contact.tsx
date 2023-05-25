import {
  Button,
  Card,
  createStyles,
  px,
  rem,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
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

const useStyles = createStyles((theme) => ({
  root: {
    minHeight: '500px',
  },
  contactForm: {
    marginTop: rem(10),
    borderRadius: theme.radius.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: rem(20),
  },
  submitButton: {
    alignSelf: 'start',
  },
}));
interface ContactProps {
  id: string;
  headerHeight: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  details: string;
  recaptchaValue: string;
  intent: string;
}

export const Contact = ({ id, headerHeight }: ContactProps) => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const { classes } = useStyles();

  const actionData = useActionData<{
    errors?: Record<Partial<keyof ContactFormValues>, string>;
  }>();

  const data = useLoaderData<{ ENV: Globals }>();

  const skipClientRecaptcha = data.ENV.NODE_ENV === 'development';

  const { getHTMLHeadingElementRef } = useRefManagerContext();

  const contactTitleRef = getHTMLHeadingElementRef('contactTitle');

  const submit = useSubmit();
  const form = useForm();

  const sectionHeightStr = `calc(100vh - ${px(headerHeight)})`;

  const onSubmit = form.onSubmit((_v, e) => submit(e.currentTarget));

  const onError: FormEventHandler<HTMLFormElement> = (e) => {
    console.log(e);
  };

  const onCaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  return (
    <IndexSection
      id={id}
      className={classes.root}
      style={{ height: sectionHeightStr }}
    >
      <Title order={2} color="orange" ref={contactTitleRef}>
        Contact
      </Title>

      <Form method="POST" onSubmit={onSubmit} onError={onError}>
        <Card className={classes.contactForm}>
          <TextInput
            name="name"
            label="Name"
            autoComplete="off"
            error={actionData?.errors?.name ?? undefined}
          />
          <TextInput
            name="email"
            label="Contact email"
            autoComplete="off"
            error={actionData?.errors?.email ?? undefined}
          />
          <Textarea
            name="details"
            label="Details"
            error={actionData?.errors?.details ?? undefined}
          />
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
          <Button
            disabled={!skipClientRecaptcha && !recaptchaValue}
            className={classes.submitButton}
            type="submit"
          >
            Send
          </Button>
        </Card>
      </Form>
    </IndexSection>
  );
};
