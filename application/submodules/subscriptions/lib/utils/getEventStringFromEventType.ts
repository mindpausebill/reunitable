import Stripe from 'stripe';
import { StripeWebhookEndpoints } from '../../types/StripeWebhookEndpoints';
import { eventListenerStrings } from './eventListenerStrings';

export const getEventStringFromEventType = (event: keyof StripeWebhookEndpoints, listener: string) => {
  return `${eventListenerStrings?.[event]}.${listener}` as Stripe.WebhookEndpointCreateParams.EnabledEvent;
};
