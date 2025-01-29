//This is an auto-generated file. Please do not modify manually.
import { deleteCoupon } from '@/submodules/subscriptions/lib/api/functions/deleteCoupon';
import { upsertCoupon } from '@/submodules/subscriptions/lib/api/functions/upsertCoupon';
import { stripe } from '@/submodules/subscriptions/lib/utils/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body = await request.text();
  const sig = headers().get('Stripe-Signature') as string;
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE_CUSTOMEREVENT ?? process.env.STRIPE_WEBHOOK_SECRET_COUPONEVENT;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    throw new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event?.type === 'coupon.created' || event?.type === 'coupon.updated') {
    await upsertCoupon(event.data.object as Stripe.Coupon);
  }

  if (event?.type === 'coupon.deleted') {
    await deleteCoupon(event.data.object as Stripe.Coupon);
  }

  return new Response(JSON.stringify({ received: true }));
};
