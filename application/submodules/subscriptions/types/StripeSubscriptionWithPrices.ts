import { StripeProduct } from '@prisma/client';
import { StripePrice, StripeSubscription } from './StripeDatabaseTypes';

export type StripeSubscriptionWithPricesAndProducts = StripeSubscription & {
  StripePrice: StripePrice & { StripeProduct: StripeProduct };
};
