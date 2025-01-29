import { StripePrice, StripeProduct } from './StripeDatabaseTypes';

export type StripeProductWithPrices = StripeProduct & { StripePrice: StripePrice[] };
