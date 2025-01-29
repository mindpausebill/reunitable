import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import Stripe from 'stripe';

export const deleteCoupon = async (coupon: Stripe.Coupon) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');

  await supabase.from('StripePromotionCode').delete().eq('couponId', coupon.id);
  await supabase.from('StripeCouponProduct').delete().eq('couponId', coupon.id);
  await supabase.from('StripeCoupon').delete().eq('couponId', coupon.id);
};
