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
import { Form, useSubmit } from '@remix-run/react';
import { useForm } from '@mantine/form';
import type { FormEventHandler } from 'react';

import { IndexSection } from '~/components/IndexSection';
import { useRefManagerContext } from '~/components/index/RefManagerContext';

const useStyles = createStyles((theme) => ({
  root: {
    minHeight: '500px',
    marginLeft: '10rem',
    marginRight: '10rem',
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

export const Contact = ({ id, headerHeight }: ContactProps) => {
  const { classes } = useStyles();

  const { getHTMLHeadingElementRef } = useRefManagerContext();

  const contactTitleRef = getHTMLHeadingElementRef('contactTitle');

  const submit = useSubmit();
  const form = useForm();

  const sectionHeightStr = `calc(100vh - ${px(headerHeight)})`;

  const onSubmit = form.onSubmit((_v, e) => submit(e.currentTarget));

  const onError: FormEventHandler<HTMLFormElement> = (e) => {
    console.log(e);
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
          <TextInput name="name" label="Name" autoComplete="off" />
          <TextInput name="email" label="Contact email" autoComplete="off" />
          <Textarea name="details" label="Details" />
          <input type="hidden" name="intent" value="contact" />
          <Button className={classes.submitButton} type="submit">
            Send
          </Button>
        </Card>
      </Form>
    </IndexSection>
  );
};
