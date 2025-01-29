//This is an auto-generated file. Please do not modify manually.

import Stripe from 'stripe';
import { stripe } from '@/submodules/subscriptions/lib/utils/stripe';
import { headers } from 'next/headers';
import { upsertProductRecord } from '@/submodules/subscriptions/lib/api/functions/upsertProductRecord';
import { deleteProduct } from '@/submodules/subscriptions/lib/api/functions/deleteProduct';

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body = await request.text();
  const sig = headers().get('Stripe-Signature') as string;
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE_PRODUCTEVENT ?? process.env.STRIPE_WEBHOOK_SECRET_PRODUCTEVENT;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    throw new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event?.type === 'product.created' || event?.type === 'product.updated') {
    await upsertProductRecord(event.data.object as Stripe.Product);
  }

  if (event?.type === 'product.deleted') {
    await deleteProduct(event.data.object as Stripe.Product);
  }

  return new Response(JSON.stringify({ received: true }));
};
