import { stripe } from '../../../utils/stripe';
import { createOrRetrieveCustomer } from '../createOrRetrieveCustomer';
import { purchaseSubscriptionZodBody } from './purchaseSubscriptionZodBody';
import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

export const purchaseSubscription = async (request: NextRequest) => {
  const requestUrl = new URL(request.url);
  const createUser = requestUrl.searchParams.get('createUser') === 'true';
  const redirect = requestUrl.searchParams.get('redirect');
  const requestBody = await request.json();

  try {
    const { subscriptionPrice, invoiceItems, email, address, name, discountCode, phone } =
      purchaseSubscriptionZodBody.parse(requestBody);

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

      if (address) {
        _.set(userMetadata, 'address', {
          address1: address?.address1,
          address2: address?.address2,
          address3: address?.address3,
          postcode: address?.postcode,
          city: address?.city
        });
      }

      if (phone) {
        _.set(userMetadata, 'phone', phone);
      }

      const { data: response, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/authenticated?redirectUrl=${redirect}`,
        data: userMetadata
      });

      if (error || !response?.user) return new NextResponse(error?.message, { status: 500 });

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

    let coupon = undefined;

    if (discountCode) {
      const { data: promotionCode } = await supabaseAdmin
        .from('StripePromotionCode')
        .select()
        .eq('code', discountCode)
        .maybeSingle();

      if (promotionCode) {
        coupon = promotionCode.couponId;
      }
    }

    const subscription = await stripe.subscriptions.create({
      customer,
      items: subscriptionPrice,
      add_invoice_items: invoiceItems,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      coupon
    });

    if (subscription && subscription.latest_invoice) {
      return NextResponse.json(
        // @ts-ignore -- issue with the typing here
        { clientSecret: subscription?.latest_invoice.payment_intent?.client_secret, user },
        {
          status: 200
        }
      );
    } else {
      return new NextResponse(JSON.stringify('Error'), { status: 400 });
    }
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400
    });
  }
};
