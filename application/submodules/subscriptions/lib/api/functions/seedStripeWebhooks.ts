import { getEventStringFromEventType } from '../../utils/getEventStringFromEventType';
import { stripe } from '../../utils/stripe';
import { deleteStripeData } from './deleteStripeData';
import { seedStripeCoupon } from './seedStripeCoupon';
import { seedStripeCustomer } from './seedStripeCustomer';
import { seedStripePrice } from './seedStripePrice';
import { seedStripeProduct } from './seedStripeProduct';
import { seedStripeRPCs } from './seedStripeRPCs';
import { seedStripeSubscription } from './seedStripeSubscription';
import { stripeWebhookObject } from '@/database/seed/webhooks/stripeWebhookObject';
import { StripeWebhookEndpoints } from '@/submodules/subscriptions/types/StripeWebhookEndpoints';
import { PrismaClient } from '@prisma/client';
import _ from 'lodash';

require('dotenv').config();

const prisma = new PrismaClient();

export const seedStripeWebhooks = async () => {
  if (!process.env.STRIPE_SECRET_KEY_LIVE && !process.env.STRIPE_SECRET_KEY) {
    throw new Error('NO STRIPE KEY IN ENV VARS. SET EITHER STRIPE_SECRET_KEY_LIVE OR STRIPE_SECRET_KEY.');
  }

  const { data: initialWebhooks } = await stripe.webhookEndpoints.list();

  console.log('Deleting exisitng webhooks stripe side...');
  for (const webhook of initialWebhooks) {
    await stripe.webhookEndpoints.del(webhook?.id);
  }
  console.log('Success');

  await deleteStripeData(prisma);

  console.log('Seeding stripe customers...');
  const customers = await seedStripeCustomer(prisma);
  console.log('Success');

  console.log('Seeding stripe products...');
  await seedStripeProduct(prisma);
  console.log('Success');

  console.log('Seeding stripe prices...');
  await seedStripePrice(prisma);
  console.log('Success');

  console.log('Seeding stripe subscriptions...');
  await seedStripeSubscription(prisma, customers);
  console.log('Success');

  if (stripeWebhookObject?.endpoints?.couponEvent && stripeWebhookObject.endpoints.couponEvent.length > 0) {
    console.log('Seeding stripe coupons and promotion codes...');
    await seedStripeCoupon(prisma, stripe);
    console.log('Success');
  }

  console.log('Creating webhooks stripe side...');
  const webhooks = await Promise.all(
    Object.entries(stripeWebhookObject?.endpoints).map(async ([event, listeners]) => {
      const eventEndpointName = _.startCase(event).replaceAll(' ', '');

      const enabledEvents = listeners.map((listener) =>
        getEventStringFromEventType(event as keyof StripeWebhookEndpoints, listener)
      );

      const webhook = await stripe.webhookEndpoints.create({
        url: `${stripeWebhookObject.url}/api/stripe/${eventEndpointName}`,
        enabled_events: enabledEvents
      });

      return { envEnd: _.upperCase(event).replaceAll(' ', ''), secret: webhook?.secret };
    })
  );
  console.log('Success');

  await seedStripeRPCs(prisma);

  console.log('WEBHOOK SECRETS FOR ENV VARS', webhooks);
};
