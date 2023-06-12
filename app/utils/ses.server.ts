import AWS, { SES } from 'aws-sdk';
import { validateEmail } from '~/utils';
const getAWSCredentials = async (): Promise<{
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string;
}> => {
  return new Promise((resolve, reject) => {
    AWS.config.getCredentials(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({
          sessionToken: `${AWS.config.credentials?.sessionToken}`,
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
  const { accessKeyId, secretAccessKey, sessionToken } =
    await getAWSCredentials();

  try {
    const ses = new SES({
      region: 'us-east-1',
      credentials: {
        accessKeyId,
        secretAccessKey,
        sessionToken,
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

    if (process.env.NODE_ENV !== 'development') {
      const resp = await ses.sendEmail(params).promise();
      const { error } = resp.$response;
      return error ?? null;
    } else {
      console.log(JSON.stringify(params));
      return null;
    }
  } catch (e) {
    return e;
  }
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
