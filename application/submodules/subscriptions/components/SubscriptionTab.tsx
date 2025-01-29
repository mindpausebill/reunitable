import { StripePriceInterval } from '../types/StripeDatabaseTypes';

interface SubscriptionTabProps {
  setProductsToShow: (productsToShow: StripePriceInterval) => void;
  productsToShow: StripePriceInterval;
  billingInterval: StripePriceInterval;
  label: string;
}

export const SubscriptionTab: React.FC<SubscriptionTabProps> = ({
  setProductsToShow,
  productsToShow,
  billingInterval,
  label
}) => {
  return (
    <button
      onClick={() => setProductsToShow(billingInterval)}
      type="button"
      className={`${
        productsToShow === billingInterval
          ? 'relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white'
          : 'ml-0.5 relative w-1/2 border border-transparent text-zinc-400'
      } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
    >
      {label}
    </button>
  );
};
