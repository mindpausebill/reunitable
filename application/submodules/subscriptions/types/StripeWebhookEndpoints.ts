export type StripeWebhookEndpoints = {
  productEvent?: ('created' | 'updated' | 'deleted')[];
  priceEvent?: ('created' | 'updated')[];
  customerSubscriptionEvent?: ('created' | 'updated' | 'deleted')[];
  checkoutEvent?: 'completed'[];
  customerEvent?: 'deleted'[];
  couponEvent?: ('created' | 'updated' | 'deleted')[];
  promotionCodeEvent?: ('created' | 'updated')[];
};
