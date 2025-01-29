import { StripeProduct } from '@/submodules/subscriptions/types/StripeDatabaseTypes';
import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import Stripe from 'stripe';

export const upsertProductRecord = async (product: Stripe.Product) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');

  const productData: Omit<StripeProduct, 'id'> = {
    productId: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  };

  const { error } = await supabase.from('StripeProduct').upsert(productData, { onConflict: 'productId' });
  if (error) throw error;
};
