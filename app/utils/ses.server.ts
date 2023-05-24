import AWS, { SES } from 'aws-sdk';
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

    const preSendResp = await ses.sendEmail(params);

    await preSendResp.send();
    return true;
  } catch (e) {
    return false;
  }
};
