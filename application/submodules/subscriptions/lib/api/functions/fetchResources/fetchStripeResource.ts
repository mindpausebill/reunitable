import { stripe } from '../../../utils/stripe';
import Stripe from 'stripe';

type ListFunc<T> = (params: {
  limit: number;
  starting_after?: string;
  expand?: string[];
}) => Promise<{ data: T[]; has_more: boolean }>;

export const fetchStripeResource = async <T extends { id: string }>(
  tableKey: keyof typeof stripe,
  expand?: string[]
): Promise<T[]> => {
  const resources: T[] = [];
  let hasMore = false;

  do {
    const { data: stripeResources, has_more } = await (stripe[tableKey] as { list: ListFunc<T> }).list({
      limit: 100,
      starting_after: resources.at(-1)?.id,
      expand
    });
    resources.push(...stripeResources);
    hasMore = has_more;
  } while (hasMore);

  return resources;
};
