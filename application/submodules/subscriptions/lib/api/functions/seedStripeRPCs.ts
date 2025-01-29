import { addFetchCouponDiscountProducts } from './rpcs/addFetchCouponDiscountProducts';
import { addFetchCouponIdByCode } from './rpcs/addFetchCouponIdByCode';
import { addFetchDiscountByCouponId } from './rpcs/addFetchDiscountByCouponId';
import { stripeWebhookObject } from '@/database/seed/webhooks/stripeWebhookObject';
import { PrismaClient } from '@prisma/client';

export const seedStripeRPCs = async (prismaClient: PrismaClient) => {
  console.log("CREATING STRIPE RPC'S...");

  if (stripeWebhookObject?.endpoints?.couponEvent && stripeWebhookObject?.endpoints?.promotionCodeEvent) {
    console.log('Creating security definer function to fetch a coupon id by promotion code...');
    await addFetchCouponIdByCode(prismaClient);

    console.log('Creating security definer function fetch amount and percent off of coupon by couponId...');
    await addFetchDiscountByCouponId(prismaClient);

    console.log('Creating security definer function to fetch products included in coupon discount...');
    await addFetchCouponDiscountProducts(prismaClient);
  }

  console.log("...STRIPE RPC's CREATED - REGENERATE SUPABASE TYPES IF THIS IS THE FIRST RUN");
};
