import { stripe } from '../../utils/stripe';
import { toDateTime } from '../../utils/toDateTime';
import { copyBillingDetailsToCustomer } from './copyBillingDetailsToCustomer';
import { StripeSubscription } from '@/submodules/subscriptions/types/StripeDatabaseTypes';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import Stripe from 'stripe';

export const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');

  const { data: customerData, error: noCustomerError } = await supabase
    .from('StripeCustomer')
    .select('userId')
    .eq('customerId', customerId)
    .single();
  if (noCustomerError) throw noCustomerError;

  const { userId } = customerData;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });

  const subscriptionData: Omit<StripeSubscription, 'id'> = {
    subscriptionId: subscription.id,
    userId: userId,
    metadata: subscription.metadata,
    subscriptionStatus: subscription.status,
    priceId: subscription.items.data[0].price.id,
    // @ts-ignore
    quantity: subscription.quantity,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    cancelAt: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
    canceledAt: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString() : null,
    currentPeriodStart: toDateTime(subscription.current_period_start).toISOString(),
    currentPeriodEnd: toDateTime(subscription.current_period_end).toISOString(),
    created: toDateTime(subscription.created).toISOString(),
    endedAt: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
    trialStart: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
    trialEnd: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null
  };

  const { error } = await supabase.from('StripeSubscription').upsert(subscriptionData, { onConflict: 'userId' });
  if (error) throw error;

  // For a new subscription copy the billing details to the customer object.
  if (createAction && subscription.default_payment_method && userId) {
    await copyBillingDetailsToCustomer(userId, subscription.default_payment_method as Stripe.PaymentMethod, supabase);
  }

  return subscriptionData;
};
