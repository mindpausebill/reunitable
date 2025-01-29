'use client';

import { toggleCancelAtPeriodEndClient } from '../../lib/front-end/own-form/toggleCancelAtPeriodEndClient';
import { StripePrice } from '../../types/StripeDatabaseTypes';
import { OwnFormPaymentDetails } from './OwnFormPaymentDetails';
import { OwnFormProductCard } from './OwnFormProductCard';
import { StripeProductWithPrices } from '@/submodules/subscriptions/types/StripeProductWithPrices';
import { StripeSubscriptionWithPricesAndProducts } from '@/submodules/subscriptions/types/StripeSubscriptionWithPrices';
import { useSupabase } from '@/submodules/supabase-functions/components/SupabaseProvider';
import { Ring } from '@uiball/loaders';
import { format } from 'date-fns';
import _ from 'lodash';
import { useEffect, useState } from 'react';

interface OwnFormManageSubscriptionProps {
  products: StripeProductWithPrices[];
  subscription: StripeSubscriptionWithPricesAndProducts | null;
  userId: string;
  onError?: () => void | Promise<void>;
  onComplete?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

export const OwnFormManageSubscription: React.FC<OwnFormManageSubscriptionProps> = ({
  products,
  subscription,
  userId,
  onError,
  onComplete,
  onCancel
}) => {
  const { supabase } = useSupabase<'public'>('public');

  const [updatingSubscription, setUpdatingSubscription] = useState(false);
  const [subscriptionState, setSubscriptionState] = useState(subscription);
  const [selectedPrice, setSelectedPrice] = useState<StripePrice>();
  const [purchaseSuccessful, setPurchaseSuccessful] = useState(false);
  const [productsToShow, setProductsToShow] = useState<'month' | 'year'>('month');

  const subscriptionProducts = products?.filter((product) =>
    product.StripePrice.find((price) => price.type === 'recurring')
  );

  const priceString = subscriptionState
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: subscriptionState?.StripePrice?.currency ?? '',
        minimumFractionDigits: 0
      }).format((subscriptionState?.StripePrice?.unitAmount || 0) / 100)
    : null;

  useEffect(() => {
    const waitAndFetchSubscription = async () => {
      let attempts = 0;

      while (attempts <= 10) {
        const { data: subscription } = await supabase
          .from('StripeSubscription')
          .select('*, StripePrice(*, StripeProduct(*))')
          .eq('userId', userId)
          .maybeSingle();

        if (subscription) {
          setSubscriptionState(subscription as StripeSubscriptionWithPricesAndProducts);
          setPurchaseSuccessful(false);
          break;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (attempts === 10) setPurchaseSuccessful(false);
          attempts += 1;
        }
      }
    };

    if (purchaseSuccessful && !subscriptionState) waitAndFetchSubscription();
  }, [purchaseSuccessful]);

  const productPrices = _.flatten(
    subscriptionProducts?.map((product) => product.StripePrice.map((price) => ({ product, price })))
  );

  return (
    <>
      {!purchaseSuccessful && (
        <>
          <div className="flex flex-col gap-6">
            <h2 className="font-heading text-2xl text-alpha-dark-600">
              {subscriptionState ? 'My subscription' : 'Subscribe Today!'}
            </h2>
            <hr />
          </div>

          {!subscriptionState && (
            <div className="mt-12 flex flex-col">
              <div className="flex w-full justify-center gap-6">
                <button
                  onClick={() => {
                    setProductsToShow('month');
                    setSelectedPrice(undefined);
                  }}
                  type="button"
                  className={`${
                    productsToShow === 'month' ? 'bg-alpha text-white' : 'bg-white text-alpha'
                  } relative m-1 whitespace-nowrap rounded-md border border-alpha py-2 px-8 text-lg font-bold font-medium shadow-sm focus:z-10`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => {
                    setProductsToShow('year');
                    setSelectedPrice(undefined);
                  }}
                  type="button"
                  className={`${
                    productsToShow === 'year' ? 'bg-alpha text-white' : 'bg-white text-alpha'
                  } relative m-1 whitespace-nowrap rounded-md border border-alpha py-2 px-8 text-lg font-bold font-medium shadow-sm focus:z-10`}
                >
                  Yearly
                </button>
              </div>
              <div className="flex w-full flex-col items-center justify-center gap-6 p-6">
                {productPrices &&
                  productPrices
                    .filter(({ price }) => price.pricingPlanInterval === productsToShow)
                    .map((productPriceObject) => (
                      <button onClick={() => setSelectedPrice(productPriceObject.price)}>
                        <OwnFormProductCard
                          productName={productPriceObject.product.name ?? ''}
                          price={productPriceObject.price}
                          selectedPrice={selectedPrice}
                        />
                      </button>
                    ))}
                {(!subscriptionProducts || subscriptionProducts?.length < 1) && (
                  <span>No products currently available...</span>
                )}
                <OwnFormPaymentDetails
                  selectedPrice={selectedPrice}
                  purchaseType={'subscription'}
                  parameters={{ invoiceItems: undefined }}
                  clientSecretLocalStorageVariable="account_subscription_clientsecret"
                  onError={onError}
                  onComplete={async () => {
                    onComplete && (await onComplete());
                    setPurchaseSuccessful(true);
                  }}
                  onCancel={onCancel}
                />
              </div>
            </div>
          )}

          {subscriptionState && (
            <div className="flex w-full justify-center">
              <div className="flex w-full flex-col justify-center gap-6 rounded-md bg-white px-5 py-4">
                <dl className="grid grid-cols-1 gap-6 p-4 text-2xl md:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <dt className="text-lg uppercase text-gray-600">Name:</dt>
                    <dd className="text-xl font-bold text-gray-700">
                      {subscriptionState?.StripePrice?.StripeProduct?.name}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dl className="text-lg  uppercase text-gray-600">Price:</dl>
                    <dd className="text-xl font-bold text-gray-700">{priceString}</dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-lg  uppercase text-gray-600">
                      Current Period Start Date <span className="lowercase text-gray-400">(dd/MM/yyyy)</span>:
                    </dt>
                    <dd className="text-lg font-bold text-gray-700">
                      {format(new Date(subscriptionState?.currentPeriodStart), 'dd/MM/yyyy')}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-lg  uppercase text-gray-600">
                      Current Period End Date <span className="lowercase text-gray-400">(dd/MM/yyyy)</span>:
                    </dt>
                    <dd className="text-lg font-bold text-gray-700">
                      {format(new Date(subscriptionState?.currentPeriodEnd), 'dd/MM/yyyy')}
                    </dd>
                  </div>
                </dl>
                <div className="flex w-full justify-center">
                  <button
                    className="flex h-16 w-64 items-center justify-center rounded-md bg-nsAdmin-400 text-lg font-bold text-white"
                    onClick={async () => {
                      setUpdatingSubscription(true);

                      const response = await toggleCancelAtPeriodEndClient(
                        subscriptionState.subscriptionId,
                        !subscriptionState.cancelAtPeriodEnd
                      );

                      if (response?.success) {
                        setSubscriptionState({
                          ...subscriptionState,
                          cancelAtPeriodEnd: !subscriptionState.cancelAtPeriodEnd
                        });
                      }

                      setUpdatingSubscription(false);
                    }}
                  >
                    {!updatingSubscription && (
                      <>
                        {!subscriptionState.cancelAtPeriodEnd && 'Cancel subscription'}
                        {subscriptionState.cancelAtPeriodEnd && 'Continue subscription'}
                      </>
                    )}
                    {updatingSubscription && <Ring size={20} color="white" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {purchaseSuccessful && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-2xl text-alpha-dark-600">My Subscription</h2>
            <hr />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 p-24">
            <Ring color="black" size={40} />
            <span>Fetching new subscription...</span>
          </div>
        </div>
      )}
    </>
  );
};
