import { StripePrice } from '../../types/StripeDatabaseTypes';

interface OwnFormProductCardProps {
  productName: string;
  price: StripePrice;
  selectedPrice?: StripePrice;
}

export const OwnFormProductCard: React.FC<OwnFormProductCardProps> = ({ productName, price, selectedPrice }) => {
  const options = { style: 'currency', currency: price.currency ?? undefined };
  const val = new Intl.NumberFormat('en-US', options).format(price.unitAmount! / 100);

  return (
    <div
      className={`flex w-full cursor-pointer items-center justify-between rounded-lg border pt-6 pb-6 pl-8 pr-8 shadow-sm ${
        price.id === selectedPrice?.id ? 'border-sky-500 ring-2 ring-sky-500' : 'border-gray-300'
      }`}
    >
      <h1 className="font-heading text-xl text-alpha-dark-700">{productName}</h1>
      <p>
        {val} {price.pricingPlanInterval && `p/${price.pricingPlanInterval}`}
      </p>
    </div>
  );
};
