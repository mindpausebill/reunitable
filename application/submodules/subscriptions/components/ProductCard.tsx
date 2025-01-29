import { StripeSubscription } from '../types/StripeDatabaseTypes';
import { StripeProductWithPrices } from '../types/StripeProductWithPrices';
import { StripeSubscriptionWithPricesAndProducts } from '../types/StripeSubscriptionWithPrices';
import { SubscriptionButton } from './SubscriptionButton';
import { handleCheckout } from './handleCheckout';
import { User } from '@supabase/supabase-js';
import { Ring } from '@uiball/loaders';
import clsx from 'clsx';
import _ from 'lodash';
import { useRouter } from 'next/router';

interface ProductCardProps {
  product: StripeProductWithPrices;
  subscription?: StripeSubscriptionWithPricesAndProducts | null;
  productsToShow: string;
  setPriceIdLoading: (priceId: string | undefined) => void;
  priceIdLoading: string | undefined;
  user: User | null;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  subscription,
  productsToShow,
  setPriceIdLoading,
  priceIdLoading,
  user
}) => {
  const router = useRouter();

  const price = product?.StripePrice?.find((price) => price.pricingPlanInterval === productsToShow);
  if (!price) return null;
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency ?? '',
    minimumFractionDigits: 0
  }).format((price?.unitAmount || 0) / 100);

  return (
    <div
      key={product.id}
      className={clsx([
        'divide-y divide-nsAdmin-200 rounded-lg bg-nsAdmin-900 shadow-sm',
        subscription && subscription?.StripePrice?.StripeProduct?.name === product.name && 'border border-pink-500'
      ])}
    >
      <div className="relative flex h-full flex-col items-center p-6 text-white">
        <h2 className="text-2xl font-semibold leading-6 text-white">{product.name}</h2>
        <p className="mt-4 h-full text-white">{product.description}</p>
        <p className="my-12">
          <span className="white text-5xl font-extrabold">{priceString}</span>
          <span className="text-base font-medium text-zinc-100">/{_.lowerCase(productsToShow)}</span>
        </p>
        <SubscriptionButton
          classes="absolute bottom-6 block rounded-md py-2 text-sm font-semibold text-white text-center"
          isLoading={priceIdLoading === price.id}
          onClick={async () => {
            setPriceIdLoading(price?.id);
            await handleCheckout([{ price: price?.id, quantity: 1 }], user, subscription as StripeSubscription, router);
            setPriceIdLoading(undefined);
          }}
        >
          <div className="flex h-12 w-24 items-center justify-center rounded-md bg-nsAdmin-400 font-bold">
            {priceIdLoading !== price?.id && (
              <>
                {product.name === subscription?.StripePrice?.StripeProduct?.name || subscription
                  ? 'Manage'
                  : 'Subscribe'}
              </>
            )}
            {priceIdLoading === price.id && <Ring size={20} color="white" />}
          </div>
        </SubscriptionButton>
      </div>
    </div>
  );
};
