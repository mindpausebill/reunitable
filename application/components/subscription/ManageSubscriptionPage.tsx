'use client';

import { Infobox } from '../shared/Infobox';
import { OwnFormManageSubscription } from '@/submodules/subscriptions/components/own-form/OwnFormManageSubscription';
import { StripeProductWithPrices } from '@/submodules/subscriptions/types/StripeProductWithPrices';
import { StripeSubscriptionWithPricesAndProducts } from '@/submodules/subscriptions/types/StripeSubscriptionWithPrices';
import { InfoType } from '@/types/Infobox';
import { useState } from 'react';

interface ManageSubscriptionPageProps {
  products: StripeProductWithPrices[];
  subscription: StripeSubscriptionWithPricesAndProducts | null;
  userId: string;
}

export const ManageSubscriptionPage: React.FC<ManageSubscriptionPageProps> = ({ products, subscription, userId }) => {
  const [error, setError] = useState<String>();

  return (
    <div className="flex flex-col gap-6">
      <Infobox type={InfoType.Error} visible={!!error} onClose={() => setError(undefined)}>
        {error}
      </Infobox>
      <OwnFormManageSubscription
        products={products ?? []}
        userId={userId}
        subscription={subscription as StripeSubscriptionWithPricesAndProducts}
        onError={() => setError('An error occurred purchasing your subscription. Please try again later.')}
      />
    </div>
  );
};
