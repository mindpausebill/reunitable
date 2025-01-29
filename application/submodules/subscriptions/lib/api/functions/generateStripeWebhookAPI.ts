import fs from 'fs';
import { stripeWebhookObject } from '@/database/seed/webhooks/stripeWebhookObject';
import _ from 'lodash';
import { seedStripeWebhooks } from './seedStripeWebhooks';
require('dotenv').config();

export const generateStripeWebhookAPI = async () => {
  if (!process.env.STRIPE_SECRET_KEY_LIVE && !process.env.STRIPE_SECRET_KEY) {
    throw new Error('NO STRIPE KEY IN ENV VARS. SET EITHER STRIPE_SECRET_KEY_LIVE OR STRIPE_SECRET_KEY.');
  }

  const stripeApiRoute = './app/api/stripe';

  try {
    console.log(`Removing directory "./app/api/stripe"...`);
    fs.rmSync(stripeApiRoute, { recursive: true, force: true });
  } catch (e) {
    console.log(`Removal not required. Directory "./app/api/stripe" does not exist.`);
  }

  fs.mkdirSync(`${stripeApiRoute}/CreateStripeCheckoutSession`, { recursive: true });
  fs.mkdirSync(`${stripeApiRoute}/CreateStripePortalLink`, { recursive: true });

  const createCheckoutSessionTemplate = fs.readFileSync(
    './submodules/subscriptions/lib/api/templates/createCheckoutSession.ts'
  );
  const createPortalLinkTemplate = fs.readFileSync('./submodules/subscriptions/lib/api/templates/createPortalLink.ts');

  fs.writeFileSync(`${stripeApiRoute}/CreateStripeCheckoutSession/route.ts`, createCheckoutSessionTemplate);
  fs.writeFileSync(`${stripeApiRoute}/CreateStripePortalLink/route.ts`, createPortalLinkTemplate);

  Object.entries(stripeWebhookObject?.endpoints).map(([eventType]) => {
    const eventEndpointFile = fs.readFileSync(`./submodules/subscriptions/lib/api/templates/${eventType}.ts`);
    const eventEndpointName = _.startCase(eventType).replaceAll(' ', '');

    console.log(`Creating directory ${stripeApiRoute}/${eventEndpointName}"...`);
    fs.mkdirSync(`${stripeApiRoute}/${eventEndpointName}`, { recursive: true });

    console.log('Writing endpoint...');
    fs.writeFileSync(`${stripeApiRoute}/${eventEndpointName}/route.ts`, eventEndpointFile);
  });

  await seedStripeWebhooks();
};

generateStripeWebhookAPI();
