'use client';

import { useSubscriptionWithPricesAndProducts } from '../lib/front-end/useSubscriptionWithPricesAndProducts';
import { StripePriceInterval } from '../types/StripeDatabaseTypes';
import { StripeProductWithPrices } from '../types/StripeProductWithPrices';
import { StripeSubscriptionWithPricesAndProducts } from '../types/StripeSubscriptionWithPrices';
import { NoProducts } from './NoProducts';
import { ProductCard } from './ProductCard';
import { SubscriptionTab } from './SubscriptionTab';
import { User } from '@supabase/supabase-js';
import _ from 'lodash';
import { useState } from 'react';

interface SubscriptionPaymentsProps {
  user: User;
  products: StripeProductWithPrices[];
}

export const SubscriptionPayments: React.FC<SubscriptionPaymentsProps> = ({ user, products }) => {
  const subscription = useSubscriptionWithPricesAndProducts(user);
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const monthlyProductsExist = products.find((product) =>
    product?.StripePrice?.some((price) => price.pricingPlanInterval === 'month')
  );
  const yearlyProductsExist = products.find((product) =>
    product?.StripePrice?.some((price) => price.pricingPlanInterval === 'year')
  );

  const [productsToShow, setProductsToShow] = useState<StripePriceInterval>(
    !monthlyProductsExist && yearlyProductsExist ? 'year' : 'month'
  );

  return (
    <>
      {!products?.length && <NoProducts />}
      {products?.length && (
        <section className="min-h-screen bg-black">
          <div className="mx-auto max-w-6xl py-8 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="sm:align-center sm:flex sm:flex-col">
              <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">Pricing Plans</h1>
              <div className="relative mt-6 flex self-center rounded-lg border border-zinc-800 bg-zinc-900 p-0.5 sm:mt-8">
                {monthlyProductsExist && yearlyProductsExist && (
                  <>
                    <SubscriptionTab
                      setProductsToShow={setProductsToShow}
                      productsToShow={productsToShow}
                      billingInterval="month"
                      label="Monthly Billing"
                    />
                    <SubscriptionTab
                      setProductsToShow={setProductsToShow}
                      productsToShow={productsToShow}
                      billingInterval="year"
                      label="Yearly Billing"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="mt-12 flex w-full justify-center space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
              {products.map((product) => {
                return (
                  <ProductCard
                    product={product}
                    subscription={subscription as StripeSubscriptionWithPricesAndProducts}
                    productsToShow={productsToShow}
                    setPriceIdLoading={setPriceIdLoading}
                    priceIdLoading={priceIdLoading}
                    user={user}
                    key={product.id}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
