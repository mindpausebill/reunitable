import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import _ from 'lodash';

type DiscountFetchResponse = {
  amountOff: number | null;
  percentOff: number | null;
  validCode: boolean;
  productIds: string[];
};

export const useFetchDiscountInfoByCode = () => {
  const { supabase } = useSupabase<'public'>();

  return async (code: string): Promise<DiscountFetchResponse> => {
    try {
      const { data: couponData, error: couponFetchError } = await supabase
        .rpc('fetchCouponIdByCode', { codeToRetrieve: code })
        .maybeSingle();

      if (!couponData || couponFetchError) throw new Error();

      const { data: discountData, error: discountFetchError } = await supabase
        .rpc('fetchDiscountByCouponId', {
          couponIdToFetch: couponData.couponId
        })
        .maybeSingle();

      if (!discountData || discountFetchError) throw new Error();

      const { data: productIds, error: productIdsFetchError } = await supabase
        .rpc('fetchCouponDiscountProducts', {
          couponIdToRetrieve: couponData.couponId
        })
        .select();

      if ((productIds?.length ?? 0) < 1 || productIdsFetchError) throw new Error();

      return { ...discountData, validCode: true, productIds: _.map(productIds, 'productId') };
    } catch (e) {
      return { amountOff: null, percentOff: null, validCode: false, productIds: [] as string[] };
    }
  };
};
