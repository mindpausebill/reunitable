import z from 'zod';

export const purchaseProductZodBody = z.object({
  collectionMethod: z.enum(['charge_automatically']),
  description: z.string(),
  price: z.string(),
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
    .optional()
});

export type PurchaseProductRequestBody = z.infer<typeof purchaseProductZodBody>;