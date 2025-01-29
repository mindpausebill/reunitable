//This is an auto-generated file. Please do not modify manually.
import { createOrRetrieveCustomer } from '@/submodules/subscriptions/lib/api/functions/createOrRetrieveCustomer';
import { stripe } from '@/submodules/subscriptions/lib/utils/stripe';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

interface CreateStripeCheckoutSessionBody {
  prices: (Stripe.Checkout.SessionCreateParams.LineItem & { quantity: number })[];
  metadata?: Record<string, string>;
  successReturnUrl?: string;
  errorReturnUrl?: string;
  paymentMode?: Stripe.Checkout.SessionCreateParams.Mode;
}

export const revalidate = 0;

export const POST = async (request: Request) => {
  const {
    prices,
    metadata = {},
    successReturnUrl,
    errorReturnUrl,
    paymentMode
  }: CreateStripeCheckoutSessionBody = await request.json();

  if (!process.env.NEXT_PUBLIC_STRIPE_SUCCESS_RETURN_URL && !successReturnUrl) {
    throw new Error(
      'NO SUCCESS RETURN URL PROVIDED IN BODY AND NO NEXT_PUBLIC_STRIPE_SUCCESS_RETURN_URL ENV VAR FOUND'
    );
  }
  if (!process.env.NEXT_PUBLIC_STRIPE_RETURN_URL && !errorReturnUrl) {
    throw new Error('NO ERROR/CANCEL RETURN URL PROVIDED IN BODY AND NO NEXT_PUBLIC_STRIPE_RETURN_URL ENV VAR FOUND');
  }

  try {
    const supabase = createSupabaseServerClient<'public'>('public');
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const customer = await createOrRetrieveCustomer(user?.id || '', user?.email || '', supabase);

    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: prices,
      mode: paymentMode ?? 'subscription',
      allow_promotion_codes: true,
      subscription_data:
        paymentMode === 'subscription'
          ? {
              metadata
            }
          : undefined,
      success_url: successReturnUrl ?? `${process.env.NEXT_PUBLIC_STRIPE_SUCCESS_RETURN_URL}`,
      cancel_url: errorReturnUrl ?? `${process.env.NEXT_PUBLIC_STRIPE_RETURN_URL}`
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    return new Response('ERROR CHECKING OUT', { status: 500 });
  }
};
