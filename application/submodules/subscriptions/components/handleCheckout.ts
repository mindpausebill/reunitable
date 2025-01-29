import { getStripe } from '../lib/utils/getStripe';
import { StripeSubscription } from '../types/StripeDatabaseTypes';
import { User } from '@supabase/supabase-js';
import { NextRouter } from 'next/router';
import Stripe from 'stripe';

export const handleCheckout = async (
  prices: Stripe.Checkout.SessionCreateParams.LineItem[],
  user: User | null,
  subscription: StripeSubscription,
  router: NextRouter,
  successReturnUrl?: string,
  errorReturnUrl?: string,
  paymentMode?: Stripe.Checkout.SessionCreateParams.Mode
) => {
  if (!user) {
    return router.push('/sign-in');
  }
  if (subscription) {
    return router.push(process.env.NEXT_PUBLIC_STRIPE_SUCCESS_RETURN_URL ?? '');
  }

  try {
    const response = await fetch(`/api/stripe/CreateStripeCheckoutSession`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ prices: prices, successReturnUrl, errorReturnUrl, paymentMode }),
      credentials: 'same-origin'
    });

    if (response?.ok) {
      const { sessionId } = await response.json();
      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } else {
      throw Error(response?.statusText);
    }
  } catch (e) {
    console.log(e);
  }
};
