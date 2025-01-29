import { StripeWebhooks } from '@/submodules/subscriptions/types/StripeWebhooks';

export const stripeWebhookObject: StripeWebhooks = {
  url: process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_URL ?? '',
  endpoints: {
    priceEvent: ['created', 'updated'],
    customerSubscriptionEvent: ['created', 'updated', 'deleted'],
    productEvent: ['created', 'updated', 'deleted'],
    checkoutEvent: ['completed'],
    customerEvent: ['deleted'],
    couponEvent: ['created', 'updated', 'deleted'],
    promotionCodeEvent: ['created', 'updated']
  }
};
