import { StripePrice } from '@/submodules/subscriptions/types/StripeDatabaseTypes';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import Stripe from 'stripe';

export const upsertPriceRecord = async (price: Stripe.Price) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');

  const priceData: Omit<StripePrice, 'id'> = {
    priceId: price.id,
    productId: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? null,
    type: price.type,
    unitAmount: price.unit_amount ?? null,
    pricingPlanInterval: price.recurring?.interval ?? null,
    intervalCount: price.recurring?.interval_count ?? null,
    trialPeriodDays: price.recurring?.trial_period_days ?? null,
    metadata: price.metadata
  };

  const { error } = await supabase.from('StripePrice').upsert(priceData, { onConflict: 'priceId' });
  if (error) throw error;
};
