import { createSupabaseServerClient } from '@/submodules/supabase-functions/lib/supabase-server';
import { isArray } from 'lodash';

export const getActiveProductWithPrices = async () => {
  const supabase = createSupabaseServerClient<'public'>('public');

  const { data: productsWithPrices, error } = await supabase
    .from('StripeProduct')
    .select('*, StripePrice(*)')
    .eq('active', true)
    .eq('StripePrice.active', true)
    .order('metadata->index')
    .order('unitAmount', { foreignTable: 'StripePrice' });

  if (error) {
    console.log(error);
  }

  const formatData = () => {
    return productsWithPrices?.flatMap((productWithPrice) => {
      const price = isArray(productWithPrice?.StripePrice)
        ? productWithPrice?.StripePrice
        : [productWithPrice?.StripePrice];

      return { ...productWithPrice, StripePrice: price };
    });
  };

  return formatData();
};
