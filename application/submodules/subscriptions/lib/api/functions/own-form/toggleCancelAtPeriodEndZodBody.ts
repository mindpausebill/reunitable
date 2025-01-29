import z from 'zod';

export const toggleCancelAtPeriodEndZodBody = z.object({
  subscriptionId: z.string(),
  cancelAtPeriodEnd: z.boolean()
});

export type ToggleCancelAtPeriodEndBody = z.infer<typeof toggleCancelAtPeriodEndZodBody>;
