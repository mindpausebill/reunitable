'use client';

import { StripePrice } from '../../types/StripeDatabaseTypes';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Ring } from '@uiball/loaders';
import React, { useState } from 'react';

interface Props {
  selectedPrice?: StripePrice;
  clientSecret?: string | null;
  onComplete: (completed: boolean) => void;
  onCancel: () => void;
  confirmButton?: React.ReactNode;
  cancelButton?: React.ReactNode;
}

export const OwnFormStripePayment = ({
  selectedPrice,
  clientSecret,
  onComplete,
  onCancel,
  confirmButton,
  cancelButton
}: Props) => {
  const [paymentError, setPaymentError] = useState<string>();
  const [confirmingPayment, setConfirmingPayment] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    setConfirmingPayment(true);

    if (!selectedPrice) {
      setPaymentError('Please select a product');
      setConfirmingPayment(false);
      return;
    }

    try {
      if (stripe && selectedPrice && clientSecret && elements) {
        const payment = await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
          }
        });

        if (!payment.error) {
          onComplete(true);
        } else {
          setConfirmingPayment(false);
          throw new Error();
        }
      } else {
        return null;
      }
    } catch (error) {
      onComplete(false);
      setPaymentError('There was an error completing your payment');
      return;
    }
  };

  return (
    <div>
      <div className="rounded-md border border-success-light bg-success-lightest p-6">
        <PaymentElement id="payment-element" />
      </div>

      <div className="mt-4 flex w-full flex-row-reverse justify-between gap-6">
        {!confirmButton && (
          <button
            className="flex w-48 items-center justify-center gap-2 rounded-md border-success bg-alpha py-4 font-bold text-white"
            onClick={handleSubmit}
          >
            {!confirmingPayment && <span>Complete Payment</span>}
            {confirmingPayment && <Ring color="white" size={20} />}
          </button>
        )}
        {confirmButton}
        {!cancelButton && !confirmingPayment && (
          <button
            className="flex items-center gap-2 rounded-md border-success bg-alpha p-4 font-bold text-white"
            onClick={onCancel}
          >
            {!confirmingPayment && <span>Cancel</span>}
          </button>
        )}
        {cancelButton}
      </div>
      {paymentError && (
        <div>
          <p className={'text-error'}>{paymentError}</p>
        </div>
      )}
    </div>
  );
};
