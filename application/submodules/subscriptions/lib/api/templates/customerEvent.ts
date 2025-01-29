//This is an auto-generated file. Please do not modify manually.

import Stripe from 'stripe';
import { stripe } from '@/submodules/subscriptions/lib/utils/stripe';
import { headers } from 'next/headers';
import { deleteCustomer } from '@/submodules/subscriptions/lib/api/functions/deleteCustomer';

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body = await request.text();
  const sig = headers().get('Stripe-Signature') as string;
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE_CUSTOMEREVENT ?? process.env.STRIPE_WEBHOOK_SECRET_CUSTOMEREVENT;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    throw new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event?.type === 'customer.deleted') {
    await deleteCustomer(event.data.object as Stripe.Customer);
  }

  return new Response(JSON.stringify({ received: true }));
};
