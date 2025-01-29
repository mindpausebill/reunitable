import { fetchStripeCustomers } from './fetchResources/stripeResourceFetchers';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

export const seedStripeCustomer = async (prisma: PrismaClient) => {
  const customers = await fetchStripeCustomers();

  await Promise.all(
    customers.map(async (customer) => {
      const upsertObject = {
        customerId: customer.id,
        userId: customer.metadata?.supabaseUUID ?? null
      };

      await prisma.stripeCustomer.upsert({
        create: upsertObject,
        update: upsertObject,
        where: { userId: customer?.metadata?.supabaseUUID ?? null }
      });
    })
  );

  return customers;
};
