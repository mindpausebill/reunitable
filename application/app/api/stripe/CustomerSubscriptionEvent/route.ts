//This is an auto-generated file. Please do not modify manually.
import { manageSubscriptionStatusChange } from '@/submodules/subscriptions/lib/api/functions/manageSubscriptionStatusChange';
import { manageSubscriptionRoles } from '@/submodules/subscriptions/lib/utils/role/manageSubscriptionRoles';
import { stripe } from '@/submodules/subscriptions/lib/utils/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export const revalidate = 0;

export const POST = async (request: Request) => {
  const body = await request.text();
  const sig = headers().get('Stripe-Signature') as string;
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE_CUSTOMERSUBSCRIPTIONEVENT ??
    process.env.STRIPE_WEBHOOK_SECRET_CUSTOMERSUBSCRIPTIONEVENT;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    throw new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  const subscription = event.data.object as Stripe.Subscription;

  const subscriptionData = await manageSubscriptionStatusChange(
    subscription.id,
    subscription.customer as string,
    event.type === 'customer.subscription.created'
  );

  console.log('subscriptionData', subscriptionData);
  console.log('subscription.customer', subscription.customer);

  await manageSubscriptionRoles(subscriptionData, subscription?.customer as string, ['Customer']);

  return new Response(JSON.stringify({ received: true }));
};
