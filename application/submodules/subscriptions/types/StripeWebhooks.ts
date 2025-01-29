import { StripeWebhookEndpoints } from './StripeWebhookEndpoints';

export type StripeWebhooks = {
  url: string;
  endpoints: StripeWebhookEndpoints;
};
