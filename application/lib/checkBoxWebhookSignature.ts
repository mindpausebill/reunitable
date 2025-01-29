import BoxSDK from 'box-node-sdk';
import { NextRequest, NextResponse } from 'next/server';

export const checkBoxWebhookSignature = async (request: NextRequest): Promise<{ source: { id: string } }> => {
  const primaryKey = process.env.BOX_WEBHOOK_PRIMARY_KEY;
  const secondaryKey = process.env.BOX_WEBHOOK_SECONDARY_KEY;

  console.log('PRIMARY KEY', primaryKey);
  console.log('SECONDARY KEY', secondaryKey);

  if (!primaryKey || !secondaryKey) {
    throw new NextResponse('Invalid API configuration', { status: 500 });
  }

  const requestBody = await request.text();
  const headers = request.headers;

  console.log('REQUEST BODY', requestBody);

  const formattedHeaders = {
    'box-delivery-id': headers.get('box-delivery-id'),
    'box-delivery-timestamp': headers.get('box-delivery-timestamp'),
    'box-signature-algorithm': headers.get('box-signature-algorithm'),
    'box-signature-primary': headers.get('box-signature-primary'),
    'box-signature-secondary': headers.get('box-signature-secondary'),
    'box-signature-version': headers.get('box-signature-version')
  };

  console.log('FORMATTED HEADERS', formattedHeaders);

  const isValid = await BoxSDK.validateWebhookMessage(requestBody, formattedHeaders, primaryKey, secondaryKey);

  console.log('IS VALID', isValid, formattedHeaders);

  if (isValid) {
    return JSON.parse(requestBody);
  }

  throw new NextResponse('Unauthorised', { status: 403 });
};
