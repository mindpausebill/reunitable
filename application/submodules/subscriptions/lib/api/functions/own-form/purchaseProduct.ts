import { stripe } from '../../../utils/stripe';
import { createOrRetrieveCustomer } from '../createOrRetrieveCustomer';
import { purchaseProductZodBody } from './purchaseProductZodBody';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export const purchaseProduct = async (request: NextRequest) => {
  const requestUrl = new URL(request.url);
  const createUser = requestUrl.searchParams.get('createUser') === 'true';
  const redirect = requestUrl.searchParams.get('redirect');
  const requestBody = await request.json();

  try {
    const { collectionMethod, description, price, email, address, name, phone } =
      purchaseProductZodBody.parse(requestBody);

    const supabaseAdmin = createDangerousSupabaseServiceRoleClient<'public'>('public');

    let user: { id: string; email?: string } | null;

    if (createUser) {
      if (!email) return new NextResponse('No email provided for create user flow', { status: 400 });

      const userMetadata = {
        signUpHost: process.env.NEXT_PUBLIC_SITE_URL
      };

      if (name) {
        _.set(userMetadata, 'northStarFirstName', name.first);
        _.set(userMetadata, 'northStarLastName', name.last);
      }

      if (phone) {
        _.set(userMetadata, 'phone', phone);
      }

      if (address) {
        _.set(userMetadata, 'address', {
          address1: address?.address1,
          address2: address?.address2,
          address3: address?.address3,
          postcode: address?.postcode,
          city: address?.city
        });
      }

      const { data: response, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/authenticated?redirectUrl=${redirect}`,
        data: userMetadata
      });

      if (error || response?.user) return new NextResponse(error?.message, { status: 500 });

      user = response?.user;
    } else {
      const supabase = createSupabaseServerClient<'access'>('access');

      if (email) {
        const { data: response } = await supabase
          .from('User')
          .select()
          .eq('email', email ?? '')
          .single();

        user = response;
      } else {
        const { data: response } = await supabase.auth.getUser();

        user = response?.user;
      }
    }

    if (!user) return new NextResponse('Error fetching user', { status: 500 });

    const customer = await createOrRetrieveCustomer(user?.id || '', user?.email || '', supabaseAdmin);

    if (!customer) return new NextResponse('Error fetching customer', { status: 500 });

    const newInvoice = await stripe.invoices.create({
      customer,
      collection_method: collectionMethod,
      description
    });

    if (!newInvoice) return new NextResponse('Error creating payment invoice', { status: 500 });

    const invoiceItems = await stripe.invoiceItems.create({
      customer,
      invoice: newInvoice.id,
      price,
      discounts: []
    });

    if (!invoiceItems) return new NextResponse('Error creating invoice items', { status: 500 });

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(newInvoice.id);

    if (!finalizedInvoice.payment_intent) return new NextResponse('Error finalizing invoice');

    const paymentIntent = await stripe.paymentIntents.retrieve(finalizedInvoice.payment_intent as string);

    if (paymentIntent) {
      return NextResponse.json(
        { clientSecret: paymentIntent.client_secret, user },
        {
          status: 200
        }
      );
    } else {
      return new NextResponse('Error retrieving payment intent', { status: 400 });
    }
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400
    });
  }
};
