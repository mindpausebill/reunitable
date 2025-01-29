import { stripe } from '../../utils/stripe';
import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export const createOrRetrieveCustomer = async (
  userId: string,
  email: string,
  supabase: SupabaseClient<Database, 'public'>
) => {
  const { data, error } = await supabase.from('StripeCustomer').select().eq('userId', userId).maybeSingle();

  let stripeSideCustomer: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer> | undefined;

  try {
    const customer = await stripe.customers.retrieve(data?.customerId ?? '');

    if (!customer?.deleted && customer?.id) {
      stripeSideCustomer = customer;
    }
  } catch (e) {
    console.log('ERROR', e);
    stripeSideCustomer = undefined;
  }

  if (error || !data?.customerId || !stripeSideCustomer) {
    const customerData: { metadata: { supabaseUUID: string }; email?: string } = {
      metadata: {
        supabaseUUID: userId
      }
    };

    if (email) customerData.email = email;

    const customer = await stripe.customers.create(customerData);

    const response = await supabase
      .from('StripeCustomer')
      .upsert({ userId: userId, customerId: customer.id }, { onConflict: 'userId' });

    if (response?.error) throw response?.error;

    return customer.id;
  }

  return data.customerId;
};
