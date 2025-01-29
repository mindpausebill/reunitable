//This is an auto-generated file. Please do not modify manually.
import { upsertPriceRecord } from '@/submodules/subscriptions/lib/api/functions/upsertPriceRecord';
import { stripe } from '@/submodules/subscriptions/lib/utils/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body = await request.text();
  const sig = headers().get('Stripe-Signature') as string;
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE_PRICEEVENT ?? process.env.STRIPE_WEBHOOK_SECRET_PRICEEVENT;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    throw new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  await upsertPriceRecord(event.data.object as Stripe.Price);

  return new Response(JSON.stringify({ received: true }));
};
