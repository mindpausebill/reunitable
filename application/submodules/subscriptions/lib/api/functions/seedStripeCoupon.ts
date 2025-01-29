import { fetchStripeCoupons, fetchStripePromotionCodes } from './fetchResources/stripeResourceFetchers';
import { StripeCoupon } from '@/submodules/subscriptions/types/StripeDatabaseTypes';
import { PrismaClient, StripeCouponProduct, StripePromotionCode } from '@prisma/client';
import Stripe from 'stripe';

export const seedStripeCoupon = async (prisma: PrismaClient, stripe: Stripe) => {
  const coupons = await fetchStripeCoupons(['data.applies_to']);
  const promotionCodes = await fetchStripePromotionCodes(['data.customer']);

  const formattedCoupons: Omit<StripeCoupon, 'id'>[] = coupons.map((coupon) => ({
    couponId: coupon.id,
    amountOff: coupon.amount_off,
    currency: coupon.currency,
    duration: coupon.duration,
    duration_in_months: coupon.duration_in_months,
    name: coupon.name,
    percentOff: coupon.percent_off
  }));

  await prisma.$transaction(
    formattedCoupons.map((coupon) =>
      prisma.stripeCoupon.upsert({ create: coupon, update: coupon, where: { couponId: coupon.couponId } })
    )
  );

  const couponProducts: Omit<StripeCouponProduct, 'id'>[] = coupons.flatMap((coupon) => {
    return (
      coupon.applies_to?.products.flatMap((couponProduct) => ({
        couponId: coupon.id,
        productId: couponProduct
      })) ?? []
    );
  });

  await prisma.$transaction(
    couponProducts.map((couponProduct) =>
      prisma.stripeCouponProduct.deleteMany({
        where: { couponId: couponProduct.couponId, productId: couponProduct.productId }
      })
    )
  );

  await prisma.stripeCouponProduct.createMany({
    data: couponProducts
  });

  const formattedPromotionCodes: Omit<StripePromotionCode, 'id'>[] = promotionCodes
    .map((promotionCode) => ({
      userId: promotionCode?.customer ? (promotionCode?.customer as Stripe.Customer)?.metadata?.supabaseUUID : null,
      promotionCodeId: promotionCode.id,
      couponId: promotionCode.coupon.id,
      active: promotionCode.active,
      code: promotionCode.code,
      maxRedemptions: promotionCode.max_redemptions,
      expires_at: promotionCode?.expires_at ? new Date(promotionCode.expires_at) : null
    }))
    .filter((promotionCode) => promotionCode.active);

  await prisma.$transaction(
    formattedPromotionCodes.map((promotionCode) =>
      prisma.stripePromotionCode.upsert({
        create: promotionCode,
        update: promotionCode,
        where: { promotionCodeId: promotionCode.promotionCodeId }
      })
    )
  );
};
