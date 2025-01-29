import { StripePrice, StripeSubscription } from './StripeDatabaseTypes';
import { StripeProductWithPrices } from './StripeProductWithPrices';
import { StripeSubscriptionWithPricesAndProducts } from './StripeSubscriptionWithPrices';
import { User } from '@supabase/supabase-js';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type CustomSubscriptionPaymentsPageProps = {
  products: StripeProductWithPrices[];
  user: User | null;
  subscription: StripeSubscriptionWithPricesAndProducts;
  handleCheckout: (
    price: StripePrice,
    user: User | null,
    subscription: StripeSubscription,
    router: AppRouterInstance
  ) => void;
};
