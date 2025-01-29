import { Database } from '@/types/supabase';
import { SupabaseClient, User } from '@supabase/supabase-js';

export const getSubscriptionsWithPricesAndProducts = (supabase: SupabaseClient<Database, 'public'>, user: User) => {
  return supabase
    .from('StripeSubscription')
    .select('*, StripePrice(*, StripeProduct(*))')
    .in('subscriptionStatus', ['active', 'trialing'])
    .eq('userId', user?.id)
    .maybeSingle();
};
