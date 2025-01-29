import { StripePrice } from '@/submodules/subscriptions/types/StripeDatabaseTypes';
import clsx from 'clsx';
import { Check } from 'lucide-react';

interface BundledProductProps {
  subscriptionName: string;
  subscriptionPrice: StripePrice;
  subscriptionDiscount?: { amountOff: number | null; percentOff: number | null };
  oneTimeProductName: string;
  oneTimePrice: StripePrice;
  oneTimeDiscount?: { amountOff: number | null; percentOff: number | null };
  selectedPrice?: StripePrice | null;
  setSelectedPrice: (price: StripePrice) => void;
}

export const BundledProduct: React.FC<BundledProductProps> = ({
  subscriptionName,
  subscriptionPrice,
  subscriptionDiscount,
  oneTimeProductName,
  oneTimePrice,
  oneTimeDiscount,
  selectedPrice,
  setSelectedPrice
}) => {
  const options = { style: 'currency', currency: subscriptionPrice.currency ?? undefined };

  const applyDiscount = (
    discountObject: { amountOff: number | null; percentOff: number | null },
    basePrice: number
  ) => {
    if (discountObject.amountOff) {
      return basePrice - discountObject.amountOff;
    } else if (discountObject.percentOff) {
      const discountAmount = basePrice * (discountObject.percentOff / 100);
      return basePrice - discountAmount;
    }

    return basePrice;
  };

  const subscriptionPriceValue = subscriptionPrice.unitAmount ?? 0;
  const oneTimePriceValue = oneTimePrice.unitAmount ?? 0;

  const discountedSubscriptionPriceValue = subscriptionDiscount
    ? applyDiscount(subscriptionDiscount, subscriptionPriceValue)
    : subscriptionPriceValue;
  const discountedOneTimePriceValue = oneTimeDiscount
    ? applyDiscount(oneTimeDiscount, oneTimePriceValue)
    : oneTimePriceValue;

  const baseSubscriptionPriceString = new Intl.NumberFormat('en-US', options).format(subscriptionPriceValue / 100);
  const baseOneTimePriceString = new Intl.NumberFormat('en-US', options).format(oneTimePriceValue / 100);

  const discountedSubscriptionPriceString = subscriptionDiscount
    ? new Intl.NumberFormat('en-US', options).format(discountedSubscriptionPriceValue / 100)
    : 0;
  const discountedOneTimePriceString = oneTimeDiscount
    ? new Intl.NumberFormat('en-US', options).format(discountedOneTimePriceValue / 100)
    : 0;

  const baseTotalPriceString = new Intl.NumberFormat('en-US', options).format(
    (subscriptionPriceValue + oneTimePriceValue) / 100
  );

  const discountedTotalPriceString = new Intl.NumberFormat('en-US', options).format(
    (discountedSubscriptionPriceValue + discountedOneTimePriceValue) / 100
  );

  return (
    <button
      onClick={() => setSelectedPrice(subscriptionPrice)}
      className={clsx(
        'relative flex cursor-pointer flex-col gap-6 rounded-lg border p-6',
        subscriptionPrice.id === selectedPrice?.id ? 'border-success ring-2 ring-success' : 'border-gray-300'
      )}
    >
      <h2 className="text-2xl font-bold">
        Pay {subscriptionPrice.pricingPlanInterval === 'month' ? 'Monthly' : 'Yearly'}
      </h2>

      {subscriptionPrice.id === selectedPrice?.id && (
        <div className="absolute top-0 right-0 h-9 w-9 -translate-x-6 translate-y-6 rounded-full bg-success text-white">
          <Check className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2" strokeWidth="4" />
        </div>
      )}
      <div className="flex w-full flex-col gap-3">
        <div className="flex justify-between gap-6">
          <p className="text-left font-heading text-alpha-dark-700">{subscriptionName}</p>
          <p className="flex gap-2 text-right">
            <span className={clsx(subscriptionDiscount && 'line-through')}>{baseSubscriptionPriceString}</span>
            {subscriptionDiscount && <span>{discountedSubscriptionPriceString}</span>} /{' '}
            {subscriptionPrice.pricingPlanInterval}
          </p>
        </div>
        <hr />
        <div className="flex justify-between gap-6">
          <p className="text-left font-heading text-alpha-dark-700">{oneTimeProductName}</p>
          <div className="flex gap-2">
            <p className={clsx('text-right', oneTimeDiscount && 'line-through')}>{baseOneTimePriceString}</p>
            {oneTimeDiscount && <p className="text-right">{discountedOneTimePriceString}</p>}
          </div>
        </div>
        <hr />
        <div className="flex justify-between gap-6">
          <p className="text-left font-heading text-alpha-dark-700">To pay now</p>
          <div className="flex gap-2">
            <p className={clsx('text-right', (oneTimeDiscount || subscriptionDiscount) && 'line-through')}>
              {baseTotalPriceString}
            </p>
            {(oneTimeDiscount || subscriptionDiscount) && <p className="text-right">{discountedTotalPriceString}</p>}
          </div>
        </div>
      </div>
    </button>
  );
};
