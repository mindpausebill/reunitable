import { createDangerousSupabaseServiceRoleClient } from '@/submodules/supabase-functions/lib/supabase-service-server';
import Stripe from 'stripe';

export const deleteProduct = async (product: Stripe.Product) => {
  const supabase = createDangerousSupabaseServiceRoleClient<'public'>('public');

  const { error: productError } = await supabase.from('StripeProduct').delete().eq('productId', product.id);
  if (productError) throw new Response('Error deleting product' + productError.message, { status: 403 });

  const { error: priceError } = await supabase.from('StripePrice').delete().eq('productId', product.id);
  if (priceError) throw new Response('Error deleting price' + priceError.message, { status: 403 });
};
