//This is an auto-generated file. Please do not modify manually.
import { upsertPromotionCode } from '@/submodules/subscriptions/lib/api/functions/upsertPromotionCode';
import { stripe } from '@/submodules/subscriptions/lib/utils/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body = await request.text();
  const sig = headers().get('Stripe-Signature') as string;
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE_PROMOTIONCODEEVENT ?? process.env.STRIPE_WEBHOOK_SECRET_PROMOTIONCODEEVENT;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    throw new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event?.type === 'promotion_code.created' || event?.type === 'promotion_code.updated') {
    await upsertPromotionCode(event.data.object as Stripe.PromotionCode);
  }

  return new Response(JSON.stringify({ received: true }));
};
