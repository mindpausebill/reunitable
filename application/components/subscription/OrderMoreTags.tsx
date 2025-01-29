'use client';

import { Infobox } from '../shared/Infobox';
import { OwnFormPaymentDetails } from '@/submodules/subscriptions/components/own-form/OwnFormPaymentDetails';
import { OwnFormProductCard } from '@/submodules/subscriptions/components/own-form/OwnFormProductCard';
import { StripeProductWithPrices } from '@/submodules/subscriptions/types/StripeProductWithPrices';
import { InfoType } from '@/types/Infobox';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';

interface OrderMoreTagsProps {
  user: User;
  products: StripeProductWithPrices[];
}

export const OrderMoreTags: React.FC<OrderMoreTagsProps> = ({ products }) => {
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);

  const tagBoxProduct = products?.find((product) => product.StripePrice.find((price) => price.type === 'one_time'));

  if (!tagBoxProduct) {
    return (
      <Infobox type={InfoType.Error} visible={true}>
        Product not available
      </Infobox>
    );
  }

  return (
    <>
      <Infobox type={InfoType.Success} visible={purchaseCompleted} onClose={() => setPurchaseCompleted(false)}>
        <span>Purchase successful! Your tag boxes are on the way.</span>
      </Infobox>
      <Infobox type={InfoType.Error} visible={purchaseError} onClose={() => setPurchaseError(false)}>
        <span>Purchase failed. Please try again.</span>
      </Infobox>

      <OwnFormProductCard
        price={tagBoxProduct.StripePrice[0]}
        productName={tagBoxProduct.name ?? ''}
        selectedPrice={tagBoxProduct.StripePrice[0]}
      />

      <OwnFormPaymentDetails
        purchaseType="product"
        parameters={{
          collectionMethod: 'charge_automatically',
          description: 'Reunitable - Tag Box Purchase'
        }}
        clientSecretLocalStorageVariable="tagbox_clientsecret"
        selectedPrice={tagBoxProduct.StripePrice[0]}
        onComplete={() => setPurchaseCompleted(true)}
        onError={() => setPurchaseError(true)}
      />
    </>
  );
};
