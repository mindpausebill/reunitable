import { Database } from '@/types/supabase';
import { SupabaseClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

export const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod,
  supabase: SupabaseClient<Database, 'public'>
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });
  const { error } = await supabase
    .from('StripeCustomer')
    .update({
      billingAddress: { ...address },
      paymentMethod: { ...payment_method[payment_method.type] }
    })
    .eq('customerId', uuid);
  if (error) throw error;
};
