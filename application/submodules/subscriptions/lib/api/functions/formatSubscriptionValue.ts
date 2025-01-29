import { StripeSubscriptionWithPricesAndProducts } from '@/submodules/subscriptions/types/StripeSubscriptionWithPrices';

export const formatSubscriptionValue = (subscription: StripeSubscriptionWithPricesAndProducts) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: subscription?.StripePrice?.currency ?? '',
    minimumFractionDigits: 0
  }).format((subscription?.StripePrice?.unitAmount ?? 0) / 100);
};
