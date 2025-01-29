import { z } from 'zod';

const itemsSchema = z.array(z.object({ price: z.string() }));

export const purchaseSubscriptionZodBody = z.object({
  subscriptionPrice: itemsSchema,
  invoiceItems: itemsSchema.optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z
    .object({
      address1: z.string(),
      address2: z.string(),
      address3: z.string().optional(),
      postcode: z.string(),
      city: z.string()
    })
    .optional(),
  name: z
    .object({
      first: z.string(),
      last: z.string()
    })
    .optional(),
  discountCode: z.string().optional()
});

export type PurchaseSubscriptionRequestBody = z.infer<typeof purchaseSubscriptionZodBody>;
