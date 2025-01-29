import { fetchStripeProducts } from './fetchResources/stripeResourceFetchers';
import { PrismaClient } from '@prisma/client';

export const seedStripeProduct = async (prisma: PrismaClient) => {
  const products = await fetchStripeProducts();

  await Promise.all(
    products?.map(async (product) => {
      const upsertObject = {
        productId: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        metadata: product.metadata
      };

      await prisma.stripeProduct.upsert({
        create: upsertObject,
        update: upsertObject,
        where: { productId: product.id }
      });
    })
  );
};
