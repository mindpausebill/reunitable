import { toDateTime } from '../../utils/toDateTime';
import { fetchStripeSubscriptions } from './fetchResources/stripeResourceFetchers';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

export const seedStripeSubscription = async (prisma: PrismaClient, customers: Stripe.Customer[]) => {
  const subscriptions = await fetchStripeSubscriptions();

  await Promise.all(
    subscriptions?.map(async (subscription) => {
      const userId = customers.find((customer) => customer?.id === subscription.customer)?.metadata?.supabaseUUID ?? '';

      if (userId) {
        const upsertObject = {
          subscriptionId: subscription.id,
          userId: userId,
          metadata: subscription.metadata,
          subscriptionStatus: subscription.status,
          priceId: subscription.items.data[0].price.id,
          // @ts-ignore
          quantity: subscription.quantity,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          cancelAt: subscription.cancel_at ? toDateTime(subscription.cancel_at) : null,
          canceledAt: subscription.canceled_at ? toDateTime(subscription.canceled_at) : null,
          currentPeriodStart: toDateTime(subscription.current_period_start),
          currentPeriodEnd: toDateTime(subscription.current_period_end),
          created: toDateTime(subscription.created),
          endedAt: subscription.ended_at ? toDateTime(subscription.ended_at) : null,
          trialStart: subscription.trial_start ? toDateTime(subscription.trial_start) : null,
          trialEnd: subscription.trial_end ? toDateTime(subscription.trial_end) : null
        };

        await prisma.stripeSubscription.upsert({
          create: upsertObject,
          update: upsertObject,
          where: { userId: userId }
        });
      }
    })
  );
};
