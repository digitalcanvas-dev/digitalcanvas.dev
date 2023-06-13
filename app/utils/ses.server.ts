import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from '@aws-sdk/client-ses';
import { ConfigServiceClient } from '@aws-sdk/client-config-service';

const getAWSCredentials = async (): Promise<{
  accessKeyId: string;
  secretAccessKey: string;
}> => {
  const configServiceClient = new ConfigServiceClient({
    region: 'us-east-1',
  });

  const {
    config: { credentials },
  } = configServiceClient;

  const fetchedCredentials = await credentials();

  const { accessKeyId, secretAccessKey } = fetchedCredentials;

  return {
    accessKeyId,
    secretAccessKey,
  };
};

export const sendEmail = async (params: SendEmailCommandInput) => {
  const { accessKeyId, secretAccessKey } = await getAWSCredentials();

  const sesClient = new SESClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const command = new SendEmailCommand(params);

  const resp = await sesClient.send(command);

  if (process.env.NODE_ENV === 'development') {
    console.log(JSON.stringify(params));
    console.log(JSON.stringify(resp));
  }

  return resp;
};
