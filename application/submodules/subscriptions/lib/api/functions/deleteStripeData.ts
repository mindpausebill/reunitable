import {
  fetchStripeCustomers,
  fetchStripePrices,
  fetchStripeProducts,
  fetchStripeSubscriptions
} from './fetchResources/stripeResourceFetchers';
import { PrismaClient } from '@prisma/client';

export const deleteStripeData = async (prisma: PrismaClient) => {
  const customers = await fetchStripeCustomers();
  const products = await fetchStripeProducts();
  const prices = await fetchStripePrices();
  const subscriptions = await fetchStripeSubscriptions();

  console.log('Deleting Stripe data from DB...');
  await prisma.stripeSubscription.deleteMany({
    where: {
      subscriptionId: {
        notIn: subscriptions?.map((subscription) => subscription.id)
      }
    }
  });

  await prisma.stripePrice.deleteMany({
    where: {
      priceId: {
        notIn: prices?.map((price) => price.id)
      }
    }
  });

  await prisma.stripeProduct.deleteMany({
    where: {
      productId: {
        notIn: products?.map((product) => product.id)
      }
    }
  });

  await prisma.stripeCustomer.deleteMany({
    where: {
      customerId: {
        notIn: customers?.map((customer) => customer.id)
      }
    }
  });
  console.log('Success');
};
