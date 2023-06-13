import type { SendEmailCommandInput } from '@aws-sdk/client-ses';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

export const sendEmail = async (params: SendEmailCommandInput) => {
  const sesClient = new SESClient({
    region: 'us-east-1',
  });

  const command = new SendEmailCommand(params);

  const resp = await sesClient.send(command);

  if (process.env.NODE_ENV === 'development') {
    console.log(JSON.stringify(params));
    console.log(JSON.stringify(resp));
  }

  return resp;
};
