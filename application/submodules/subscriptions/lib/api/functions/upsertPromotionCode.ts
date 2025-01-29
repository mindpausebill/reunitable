import { StripePromotionCode } from '@/submodules/subscriptions/types/StripeDatabaseTypes';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import { formatISO } from 'date-fns';
import _ from 'lodash';
import Stripe from 'stripe';

export const upsertPromotionCode = async (promotionCode: Stripe.PromotionCode) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');

  const { data: coupon } = await supabase
    .from('StripeCoupon')
    .select()
    .eq('couponId', promotionCode.coupon.id)
    .maybeSingle();

  if (coupon) {
    const formattedPromotionCode: Omit<StripePromotionCode, 'id'> = {
      promotionCodeId: promotionCode.id,
      couponId: coupon.couponId,
      userId: null,
      active: promotionCode.active,
      code: promotionCode.code,
      maxRedemptions: promotionCode.max_redemptions,
      expires_at: promotionCode?.expires_at ? formatISO(new Date(promotionCode.expires_at)) : null
    };

    if (promotionCode.customer) {
      const { data: customer } = await supabase
        .from('StripeCustomer')
        .select()
        .eq('customerId', promotionCode.customer)
        .maybeSingle();

      if (customer) {
        _.set(formattedPromotionCode, 'userId', customer.userId);
      }
    }

    await supabase.from('StripePromotionCode').upsert(formattedPromotionCode, { onConflict: 'promotionCodeId' });
  }
};
