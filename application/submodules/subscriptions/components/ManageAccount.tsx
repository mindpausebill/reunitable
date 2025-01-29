'use client';

import { formatSubscriptionValue } from '../lib/api/functions/formatSubscriptionValue';
import { redirectToCustomerPortal } from '../lib/api/functions/redirectToCustomerPortal';
import { useSubscriptionWithPricesAndProducts } from '../lib/front-end/useSubscriptionWithPricesAndProducts';
import { StripeSubscriptionWithPricesAndProducts } from '../types/StripeSubscriptionWithPrices';
import { AccountCard } from './AccountCard';
import { SubscriptionButton } from './SubscriptionButton';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';

interface ManageAccountProps {
  user: User;
}

export const ManageAccount: React.FC<ManageAccountProps> = ({ user }) => {
  const subscription = useSubscriptionWithPricesAndProducts(user);
  const subscriptionPrice =
    subscription && formatSubscriptionValue(subscription as StripeSubscriptionWithPricesAndProducts);

  return (
    <>
      <section className="min-h-screen bg-black">
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-8 sm:px-6 sm:pt-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">Account</h1>
          </div>
        </div>
        <div className="p-4">
          <AccountCard
            title="Your Plan"
            description={
              subscription ? `You are currently on the ${subscription?.StripePrice?.StripeProduct?.name} plan.` : ''
            }
            footer={
              <div className="flex w-full justify-between  sm:flex-row sm:items-center">
                <p className="pb-4 text-white sm:pb-0">Manage your subscription on Stripe.</p>
                <SubscriptionButton classes="" isLoading={!subscription} onClick={redirectToCustomerPortal}>
                  <div className="rounded-md bg-nsAdmin-400 p-4 text-lg font-bold text-white">Open customer portal</div>
                </SubscriptionButton>
              </div>
            }
          >
            <div className="mt-8 mb-4 flex w-full justify-center text-3xl font-semibold text-white">
              {subscription ? (
                `${subscriptionPrice}/${subscription?.StripePrice?.pricingPlanInterval}`
              ) : (
                <Link href={process.env.NEXT_PUBLIC_STRIPE_RETURN_URL ?? ''}>Choose your plan</Link>
              )}
            </div>
          </AccountCard>
        </div>
      </section>
    </>
  );
};
