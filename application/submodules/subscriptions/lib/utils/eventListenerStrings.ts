import { StripeWebhookEndpoints } from '../../types/StripeWebhookEndpoints';

export const eventListenerStrings: Record<keyof StripeWebhookEndpoints, string> = {
  customerSubscriptionEvent: 'customer.subscription',
  customerEvent: 'customer',
  productEvent: 'product',
  priceEvent: 'price',
  checkoutEvent: 'checkout.session',
  couponEvent: 'coupon',
  promotionCodeEvent: 'promotion_code'
};
