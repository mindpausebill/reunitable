import { getActiveProductWithPrices } from '../lib/front-end/getActiveProductWithPrice';
import { StripeProductWithPrices } from '../types/StripeProductWithPrices';
import { SubscriptionPayments } from './SubscriptionPayments';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';

export const StripeSubscriptions = async () => {
  const supabase = createSupabaseServerClient<'public'>('public');
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const products = await getActiveProductWithPrices();

  if (!user) {
    return <div>No user exists</div>;
  }

  return <SubscriptionPayments products={(products ?? []) as StripeProductWithPrices[]} user={user} />;
};
