import { getSubscriptionsWithPricesAndProducts } from './getSubscriptionsWithPricesAndProducts';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { User } from '@supabase/supabase-js';
import { use } from 'react';

export const useServerSubscriptionsWithPricesAndProducts = (user: User) => {
  const supabase = createSupabaseServerClient('public');
  return use(getSubscriptionsWithPricesAndProducts(supabase, user));
};
