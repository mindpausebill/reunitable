//This is an auto-generated file. Please do not modify manually.
import { createOrRetrieveCustomer } from '@/submodules/subscriptions/lib/api/functions/createOrRetrieveCustomer';
import { stripe } from '@/submodules/subscriptions/lib/utils/stripe';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { NextResponse } from 'next/server';

export const revalidate = 0;

interface CreatePoralLinkBody {
  returnUrl?: string;
}

export const POST = async (request: Request) => {
  const requestBody: CreatePoralLinkBody = await request.json();

  if (!process.env.NEXT_PUBLIC_STRIPE_RETURN_URL && !requestBody?.returnUrl) {
    throw new Error(
      'NO RETURN URL SPECIFIED EITHER SET ONE IN ENV VARS ON NEXT_PUBLIC_STRIPE_RETURN_URL OR PROVIDE ONE IN THE REQUEST BODY'
    );
  }

  try {
    const supabase = createSupabaseServerClient<'public'>('public');
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) throw Error('Could not get user');
    const customer = await createOrRetrieveCustomer(user?.id ?? '', user?.email ?? '', supabase);

    if (!customer) throw Error('Could not get customer');
    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: requestBody?.returnUrl ?? `${process.env.NEXT_PUBLIC_STRIPE_RETURN_URL}`
    });

    return NextResponse.json({ url });
  } catch (err: any) {
    return new Response('ERROR GETTING PORTAL LINK' + err.message, { status: 500 });
  }
};
