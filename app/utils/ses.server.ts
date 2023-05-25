import AWS, { SES } from 'aws-sdk';
import { validateEmail } from '~/utils';
const getAWSCredentials = async (): Promise<{
  accessKeyId: string;
  secretAccessKey: string;
}> => {
  return new Promise((resolve, reject) => {
    AWS.config.getCredentials(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          accessKeyId: `${AWS.config.credentials?.accessKeyId}`,
          secretAccessKey: `${AWS.config.credentials?.secretAccessKey}`,
        });
      }
    });
  });
};

export const sendContactEmail = async (
  requesterName: string,
  requesterEmail: string,
  requesterDetails: string
) => {
  const { accessKeyId, secretAccessKey } = await getAWSCredentials();

  try {
    const ses = new SES({
      region: 'us-east-1',
      credentials: {
        // @ts-ignore
        accessKeyId,
        // @ts-ignore
        secretAccessKey,
      },
    });

    const charset = 'utf-8';

    const params = {
      Source: 'no-reply@digitalcanvas.dev',
      Destination: {
        ToAddresses: ['simon@digitalcanvas.dev'],
      },
      Message: {
        Subject: {
          Data: `Contact form request from ${requesterName}`,
          Charset: charset,
        },
        Body: {
          Html: {
            Data: `${requesterName} [${requesterEmail}]<br />${requesterDetails}`,
            Charset: charset,
          },
        },
      },
    };

    const resp = await ses.sendEmail(params).promise();

    const { error } = resp.$response;

    return error ?? null;
  } catch (e) {
    return e;
  }
};

export const validateContactForm = (
  requesterName: FormDataEntryValue | null,
  requesterEmail: FormDataEntryValue | null,
  details: FormDataEntryValue | null
): null | {
  name?: string | null;
  email?: string | null;
  details?: string | null;
} => {
  if (!requesterName || !details || !requesterEmail) {
    return {
      name: !requesterName ? 'Required' : null,
      email: !requesterEmail ? 'Required' : null,
      details: !details ? 'Required' : null,
    };
  }

  if (!validateEmail(requesterEmail)) {
    return {
      email: 'Invalid',
    };
  }

  return null;
};
