import { dropAndCreateDeletePolicy } from '../shared/defaultPolicies/dropAndCreateDeletePolicy';
import { dropAndCreateInsertPolicy } from '../shared/defaultPolicies/dropAndCreateInsertPolicy';
import { dropAndCreateSelectPolicy } from '../shared/defaultPolicies/dropAndCreateSelectPolicy';
import { dropAndCreateUpdatePolicy } from '../shared/defaultPolicies/dropAndCreateUpdatePolicy';
import { enableRLS } from '../shared/enableRLS';
import { PrismaClient } from '@prisma/client';

const tables = [
  'Conversation',
  'Message',
  'Samaritan',
  'Setting',
  'StripeCustomer',
  'StripePrice',
  'StripeProduct',
  'StripeSubscription',
  'StripeCoupon',
  'StripeCouponProduct',
  'StripePromotionCode'
];

export const seedPublic = async (prismaClient: PrismaClient) => {
  console.log("Seeding security for schema 'Public'...");

  for (const table of tables) {
    await enableRLS(prismaClient, 'public', table);
    await dropAndCreateSelectPolicy(prismaClient, 'public', table);
    await dropAndCreateInsertPolicy(prismaClient, 'public', table);
    await dropAndCreateUpdatePolicy(prismaClient, 'public', table);
    await dropAndCreateDeletePolicy(prismaClient, 'public', table);
  }
};
