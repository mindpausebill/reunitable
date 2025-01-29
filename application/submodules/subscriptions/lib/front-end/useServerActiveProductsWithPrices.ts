import { getActiveProductWithPrices } from './getActiveProductWithPrice';
import { use } from 'react';

export const useServerActiveProductsWithPrices = () => {
  return use(getActiveProductWithPrices());
};
