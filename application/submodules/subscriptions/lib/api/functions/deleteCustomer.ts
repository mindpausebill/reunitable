import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import Stripe from 'stripe';

export const deleteCustomer = async (customer: Stripe.Customer) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');

  await supabase
    .from('StripeSubscription')
    .delete()
    .eq('userId', customer.metadata?.supabaseUUID ?? '');
  await supabase
    .from('StripeCustomer')
    .delete()
    .eq('userId', customer.metadata?.supabaseUUID ?? '');
};
