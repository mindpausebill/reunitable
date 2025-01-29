import { stripe } from '@/submodules/subscriptions/lib/utils/stripe';
import { StripeCoupon } from '@/submodules/subscriptions/types/StripeDatabaseTypes';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import _ from 'lodash';
import Stripe from 'stripe';

export const upsertCoupon = async (coupon: Stripe.Coupon) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');

  const stripeCoupon = await stripe.coupons.retrieve(coupon.id, { expand: ['applies_to'] });

  const formattedCoupon: Omit<StripeCoupon, 'id'> = {
    couponId: stripeCoupon.id,
    amountOff: stripeCoupon?.amount_off,
    currency: stripeCoupon?.currency,
    duration: stripeCoupon?.duration,
    duration_in_months: stripeCoupon?.duration_in_months,
    name: stripeCoupon?.name,
    percentOff: stripeCoupon?.percent_off
  };

  await supabase.from('StripeCoupon').upsert(formattedCoupon, { onConflict: 'couponId' });

  if (stripeCoupon?.applies_to) {
    const { data: couponProducts } = await supabase
      .from('StripeCouponProduct')
      .select()
      .eq('couponId', stripeCoupon.id);

    const couponProductsToDelete = (couponProducts ?? []).filter(
      (couponProduct) => !stripeCoupon?.applies_to?.products.some((productId) => productId === couponProduct.productId)
    );
    const couponProductsToCreate = (stripeCoupon?.applies_to?.products ?? []).filter(
      (productId) => !couponProducts?.some((couponProduct) => productId === couponProduct.productId)
    );

    await supabase
      .from('StripeCouponProduct')
      .delete()
      .eq('couponId', stripeCoupon.id)
      .in('productId', _.map(couponProductsToDelete, 'productId'));

    await supabase
      .from('StripeCouponProduct')
      .insert(couponProductsToCreate.map((productId) => ({ productId, couponId: stripeCoupon.id })));
  }
};
