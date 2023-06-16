import { validateEmail } from '~/utils/utils';
import { sendEmail } from '~/utils/ses.server';
export const sendContactEmail = async (
  requesterName: string,
  requesterEmail: string,
  requesterDetails: string
) => {
  const params = {
    Source: 'no-reply@digitalcanvas.dev',
    Destination: {
      ToAddresses: ['simon@digitalcanvas.dev'],
    },
    Message: {
      Subject: {
        Data: `Contact form request from ${requesterName}`,
      },
      Body: {
        Html: {
          Data: `${requesterName} [${requesterEmail}]<br />${requesterDetails}`,
        },
      },
    },
  };

  const resp = await sendEmail(params);

  return resp.$metadata.httpStatusCode === 200
    ? null
    : `Error code received:
    ${resp.$metadata.httpStatusCode} from requestId ${resp.$metadata.requestId}.
    Please email simon@digitalcanvas.dev directly with this error message and to qualify for a discount.`;
};

export const validateContactForm = (
  requesterName: FormDataEntryValue | null,
  requesterEmail: FormDataEntryValue | null,
  details: FormDataEntryValue | null
): null | {
  name?: string;
  email?: string;
  details?: string;
} => {
  if (!requesterName || !details || !requesterEmail) {
    return {
      ...(requesterName ? {} : { name: 'Required' }),
      ...(requesterEmail
        ? validateEmail(requesterEmail)
          ? {}
          : { email: 'Invalid ' }
        : { email: 'Required' }),
      ...(details ? {} : { details: 'Required' }),
    };
  }

  return null;
};
