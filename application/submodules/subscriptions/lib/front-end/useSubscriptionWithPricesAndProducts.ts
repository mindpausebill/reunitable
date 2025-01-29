'use client';

import { getSubscriptionsWithPricesAndProducts } from './getSubscriptionsWithPricesAndProducts';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { useQuery } from '@supabase-cache-helpers/postgrest-swr';
import { User } from '@supabase/supabase-js';
import { isArray } from 'lodash';

export const useSubscriptionWithPricesAndProducts = (user: User) => {
  const { supabase: publicSupabase } = useSupabase<'public'>('public');
  const { data: subscription } = useQuery(getSubscriptionsWithPricesAndProducts(publicSupabase, user));

  const formatData = () => {
    const price = isArray(subscription?.StripePrice) ? subscription?.StripePrice[0] : subscription?.StripePrice;
    const product = isArray(price?.StripeProduct) ? price?.StripeProduct[0] : price?.StripeProduct;

    return { ...subscription, StripePrice: { ...price, StripeProduct: product } };
  };

  return subscription ? formatData() : undefined;
};
