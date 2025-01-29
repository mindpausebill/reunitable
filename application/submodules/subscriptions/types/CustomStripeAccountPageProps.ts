import { StripeSubscriptionWithPricesAndProducts } from './StripeSubscriptionWithPrices';

export type CustomStripeaccountPageProps = {
  subscription: StripeSubscriptionWithPricesAndProducts | null;
  redirectToCustomerPortal: () => Promise<void>;
  subscriptionPrice?: string;
};
