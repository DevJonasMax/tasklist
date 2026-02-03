import serverlessExpress from '@vendia/serverless-express';
import type { Handler } from 'aws-lambda';
import { createApp } from './main';

let cachedHandler: Handler;

async function bootstrap() {
  const app = await createApp();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event, context, callback) => {
  if (!cachedHandler) {
    cachedHandler = await bootstrap();
  }
  return cachedHandler(event, context, callback);
};
