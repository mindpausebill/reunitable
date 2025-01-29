import z from 'zod';

export const validateUserNotReachedNotificationBody = z.object({
  conversationId: z.string().uuid(),
  samaritanId: z.string().uuid()
});
