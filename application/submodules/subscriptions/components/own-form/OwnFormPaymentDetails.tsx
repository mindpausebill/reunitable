import {
  getClientSecretForPurchaseType,
  getClientSecretParams
} from '../../lib/front-end/own-form/getClientSecretForPurchaseType';
import { getStripe } from '../../lib/utils/getStripe';
import { StripePrice } from '../../types/StripeDatabaseTypes';
import { OwnFormStripePayment } from './OwnFormStripePayment';
import { Elements } from '@stripe/react-stripe-js';
import { Ring } from '@uiball/loaders';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface OwnFormPaymentDetailsProps<PT extends keyof getClientSecretParams> {
  selectedPrice?: StripePrice;
  purchaseType: PT;
  parameters: getClientSecretParams[PT];
  clientSecretLocalStorageVariable: string;
  onError?: (message?: string) => void | Promise<void>;
  onComplete?: (userId: string) => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  paymentButtonText?: string;
  createUser?: boolean;
  redirectOnCreate?: string;
  disableButton?: boolean;
  discountCode?: string;
}

export const OwnFormPaymentDetails = <PT extends keyof getClientSecretParams>({
  selectedPrice,
  purchaseType,
  parameters,
  clientSecretLocalStorageVariable,
  onError,
  onComplete,
  onCancel,
  paymentButtonText,
  createUser,
  redirectOnCreate,
  disableButton = false,
  discountCode
}: OwnFormPaymentDetailsProps<PT>) => {
  const [clientSecret, setClientSecret] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [loadingMakePurchase, setLoadingMakePurchase] = useState<boolean>(false);

  const onMakePayment = async (price: StripePrice) => {
    setLoadingMakePurchase(true);

    const localStorageClientSecret = window.localStorage.getItem(clientSecretLocalStorageVariable);
    const localStorageUserId = window.localStorage.getItem('userId');

    if (localStorageClientSecret && localStorageUserId) {
      setClientSecret(localStorageClientSecret);
      setUserId(localStorageUserId);
      setLoadingMakePurchase(false);
      return;
    }

    try {
      const { data: response } = await getClientSecretForPurchaseType(
        purchaseType,
        price.priceId,
        parameters,
        createUser,
        redirectOnCreate,
        discountCode
      );

      if (response?.clientSecret) {
        window.localStorage.setItem(clientSecretLocalStorageVariable, response?.clientSecret);
        window.localStorage.setItem('userId', response?.user.id);

        setClientSecret(response?.clientSecret);
        setUserId(response?.user.id);
      } else {
        onComplete && (await onComplete(response?.user.id));
      }
    } catch (e) {
      onError && (await onError((e as { message?: string })?.message));
    } finally {
      setLoadingMakePurchase(false);
    }
  };

  useEffect(() => {
    setClientSecret(undefined);
    setUserId(undefined);
    window.localStorage.removeItem(clientSecretLocalStorageVariable);
    window.localStorage.removeItem('userId');
  }, [discountCode]);

  return (
    <>
      {!clientSecret && (
        <div className="flex w-full justify-center p-4">
          <button
            type="button"
            disabled={disableButton || !selectedPrice}
            onClick={() => selectedPrice && onMakePayment(selectedPrice)}
            className={clsx(
              'flex h-16 w-72 items-center justify-center rounded-md bg-alpha text-xl font-bold text-white',
              (disableButton || !selectedPrice) && 'bg-gray-500'
            )}
          >
            {!loadingMakePurchase && <span>{paymentButtonText ?? 'Make Payment'}</span>}
            {loadingMakePurchase && <Ring size={20} color="white" />}
          </button>
        </div>
      )}
      {clientSecret && userId && (
        <Elements stripe={getStripe()} options={{ clientSecret }}>
          <OwnFormStripePayment
            selectedPrice={selectedPrice}
            onComplete={async (complete) => {
              if (complete) {
                window.localStorage.removeItem(clientSecretLocalStorageVariable);
                window.localStorage.removeItem('userId');

                setClientSecret(undefined);
                onComplete && (await onComplete(userId));
              } else {
                onError && (await onError('An error occurred purchasing packs and signing up please try again.'));
              }
            }}
            onCancel={async () => {
              setClientSecret(undefined);
              onCancel && (await onCancel());
            }}
            clientSecret={clientSecret}
          />
        </Elements>
      )}
    </>
  );
};
