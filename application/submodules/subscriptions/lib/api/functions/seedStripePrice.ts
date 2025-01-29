import { fetchStripePrices } from './fetchResources/stripeResourceFetchers';
import { PrismaClient } from '@prisma/client';

export const seedStripePrice = async (prisma: PrismaClient) => {
  const prices = await fetchStripePrices();

  await Promise.all(
    prices?.map(async (price) => {
      const upsertObject = {
        priceId: price.id,
        productId: typeof price.product === 'string' ? price.product : '',
        active: price.active,
        currency: price.currency,
        description: price.nickname ?? null,
        type: price.type,
        unitAmount: price.unit_amount ?? null,
        pricingPlanInterval: price.recurring?.interval ?? null,
        intervalCount: price.recurring?.interval_count ?? null,
        trialPeriodDays: price.recurring?.trial_period_days ?? null,
        metadata: price.metadata
      };

      await prisma.stripePrice.upsert({
        create: upsertObject,
        update: upsertObject,
        where: { priceId: price.id }
      });
    })
  );
};
