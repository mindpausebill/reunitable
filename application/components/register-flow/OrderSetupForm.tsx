'use client';

import ContentBox from '../shared/ContentBox';
import InputGroup from '../shared/InputGroup';
import {BundledProduct} from './BundledProduct';
import {Infobox} from '@/components/shared/Infobox';
import {OwnFormPaymentDetails} from '@/submodules/subscriptions/components/own-form/OwnFormPaymentDetails';
import {
  AddressObject,
  NameObject
} from '@/submodules/subscriptions/lib/front-end/own-form/getClientSecretForPurchaseType';
import {useFetchDiscountInfoByCode} from '@/submodules/subscriptions/lib/front-end/useFetchDiscountInfoByCode';
import {StripePrice} from '@/submodules/subscriptions/types/StripeDatabaseTypes';
import {StripeProductWithPrices} from '@/submodules/subscriptions/types/StripeProductWithPrices';
import {InfoType} from '@/types/Infobox';
import _ from 'lodash';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import InputWrapper from "@/components/shared/InputWrapper";
import {PhoneInputField} from "@/components/shared/PhoneInputField";

export interface OrderSetupFormProps {
  products: StripeProductWithPrices[];
}

export const OrderSetupForm: React.FC<OrderSetupFormProps> = ({ products }) => {
  const router = useRouter();
  const fetchDiscountInfoByCode = useFetchDiscountInfoByCode();

  const [completionError, setCompletionError] = useState<string>();

  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountedProducts, setDiscountedProducts] =
    useState<{ productId: string; amountOff: number | null; percentOff: number | null }[]>();
  const [discountCodeInfo, setDiscountCodeInfo] = useState<{ valid: boolean }>();

  const [email, setEmail] = useState<string>();
  const [confirmEmail, setConfirmEmail] = useState<string>();
  const [name, setName] = useState<NameObject>({
    first: '',
    last: ''
  });
  const [phone, setPhone] = useState<string>();
  const [address, setAddress] = useState<AddressObject>({
    address1: '',
    address2: '',
    address3: '',
    city: '',
    postcode: ''
  });

  const subscriptionProducts = products?.filter((product) =>
    product.StripePrice.find((price) => price.type === 'recurring')
  );
  const oneTimeProduct = products?.find((product) => product.StripePrice.find((price) => price.type === 'one_time'));

  const invoiceItems = oneTimeProduct?.StripePrice[0].priceId
    ? [{ price: oneTimeProduct.StripePrice[0].priceId }]
    : undefined;

  const allBundles = _.flatten(
    _.flatten(
      subscriptionProducts.map((subProduct) =>
        subProduct.StripePrice.map((subPrice) =>
          oneTimeProduct?.StripePrice.map((otPrice) => {
            const subscriptionDiscount = discountedProducts?.find(
              (product) => product.productId === subProduct.productId
            );
            const oneTimeProductDiscount = discountedProducts?.find(
              (product) => product.productId === oneTimeProduct.productId
            );

            return {
              subscriptionProduct: subProduct,
              subscriptionPrice: subPrice,
              subscriptionDiscount,
              onetimeProduct: oneTimeProduct,
              oneTimeProductPrice: otPrice,
              oneTimeProductDiscount
            };
          })
        )
      )
    )
  );

  const [selectedPrice, setSelectedPrice] = useState<StripePrice | undefined>(allBundles[0]?.subscriptionPrice);

  const invalidAddress = Object.entries(address).some(
    ([key, value]) => key !== 'address2' && key !== 'address3' && !value
  );

  return (
    <div className="mb-24 flex flex-col gap-6">
      <ContentBox className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-2xl text-alpha-dark-600">Your Details</h2>
          <hr />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputGroup
            name="firstName"
            id="firstName"
            label="First name"
            type="text"
            placeholder="Enter your first name"
            required
            onChange={(e) => setName({ ...name, first: e.target.value })}
          />
          <InputGroup
            name="lastName"
            id="lastName"
            label="Last name"
            type="text"
            placeholder="Enter your last name"
            required
            onChange={(e) => setName({ ...name, last: e.target.value })}
          />
          <InputGroup
            id="email"
            label="Email address"
            placeholder="Enter your email address"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup
            name="confirmEmail"
            id="confirm-email"
            label="Confirm email"
            type="email"
            placeholder="Confirm your email"
            required
            onChange={(e) => setConfirmEmail(e.target.value)}
          />
          <InputWrapper id="mobile-number" required={false} showOptionalText={true} icon={<></>} label={'Mobile number'}>
            <PhoneInputField onChange={(val) => setPhone(val)} />
          </InputWrapper>
          <div className="md:col-span-2">
            <Infobox type={InfoType.Warn} visible={true} dismissible={false}>
              Please ensure you enter the correct email address as this will be used to send you details about your
              order.
            </Infobox>
          </div>
        </div>
      </ContentBox>

      <ContentBox className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-2xl text-alpha-dark-600">Address</h2>
          <hr />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputGroup
            name="address1"
            id="address1"
            label="Address line one"
            type="text"
            placeholder="Enter the first line of your address"
            required
            onChange={(e) => setAddress({ ...address, address1: e.target.value })}
          />
          <InputGroup
            name="address2"
            id="address2"
            label="Address line two"
            type="text"
            placeholder="Enter the second line of your address"
            onChange={(e) => setAddress({ ...address, address2: e.target.value })}
          />
          <InputGroup
            name="address3"
            id="address3"
            label="Address line three"
            type="text"
            placeholder="Enter the third line of your address"
            onChange={(e) => setAddress({ ...address, address3: e.target.value })}
          />
          <InputGroup
            name="city"
            id="city"
            label="Town or City"
            type="text"
            placeholder="Enter your town or city"
            required
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <InputGroup
            name="postcode"
            id="postcode"
            label="Postal Code"
            type="text"
            placeholder="Enter your postal code"
            required
            onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
          />
        </div>
      </ContentBox>

      <ContentBox className="flex flex-col gap-6">
        <Infobox type={InfoType.Info} visible={true} dismissible={false}>
          Your pack will contain everything you need to get started, including a number of tags, cards, stickers and
          labels for your possessions.
          <br />
          <br />
          Your subscription will start from today and you will be charged monthly using the payment details provided
          below.
        </Infobox>
        <div className="flex flex-col gap-6">
          {discountCodeInfo?.valid !== undefined && (
            <Infobox visible={true} type={discountCodeInfo?.valid ? InfoType.Success : InfoType.Error}>
              {discountCodeInfo?.valid && <span>Sucessfully added the discount code!</span>}
              {!discountCodeInfo?.valid && <span>Invalid discount code.</span>}
            </Infobox>
          )}
          <div className="flex items-center gap-2">
            <InputGroup
              disabled={discountCodeInfo?.valid}
              id="discount-code"
              value={discountCode}
              label="Discount Code"
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button
              onClick={async () => {
                if (!discountCodeInfo?.valid) {
                  const data = await fetchDiscountInfoByCode(discountCode);

                  if (data.validCode) {
                    setDiscountCodeInfo({ valid: true });
                    setDiscountedProducts(
                      data.productIds.map((productId) => ({
                        productId,
                        amountOff: data.amountOff,
                        percentOff: data.percentOff
                      }))
                    );
                  } else {
                    setDiscountCodeInfo({ valid: false });
                  }
                } else {
                  setDiscountCodeInfo(undefined);
                  setDiscountCode('');
                  setDiscountedProducts(undefined);
                }
              }}
              className="mt-9 rounded-md bg-alpha p-4 px-12 text-white"
            >
              {!discountCodeInfo?.valid ? 'Apply' : 'Change'}
            </button>
          </div>

          {oneTimeProduct && (
            <>
              {allBundles.map((bundle) => (
                <BundledProduct
                  key={bundle?.subscriptionPrice.id}
                  subscriptionName={bundle?.subscriptionProduct?.name ?? ''}
                  subscriptionPrice={bundle?.subscriptionPrice as StripePrice}
                  subscriptionDiscount={bundle?.subscriptionDiscount}
                  oneTimeProductName={bundle?.onetimeProduct?.name ?? ''}
                  oneTimePrice={bundle?.oneTimeProductPrice as StripePrice}
                  oneTimeDiscount={bundle?.oneTimeProductDiscount}
                  selectedPrice={selectedPrice}
                  setSelectedPrice={setSelectedPrice}
                />
              ))}
            </>
          )}

          <Infobox type={InfoType.Error} visible={!!completionError}>
            <span>{completionError}</span>
          </Infobox>

          <OwnFormPaymentDetails
            purchaseType="subscription"
            parameters={{ invoiceItems, email, address, name, phone }}
            selectedPrice={selectedPrice}
            clientSecretLocalStorageVariable="order_subscription_clientsecret"
            onComplete={() => router.push(`/order/completed`)}
            onError={(message) => setCompletionError(message)}
            paymentButtonText="Make Payment & Sign Up"
            createUser={true}
            redirectOnCreate={'/setup/password'}
            disableButton={!email || email !== confirmEmail || !name?.first || !name?.last || invalidAddress}
            discountCode={(discountedProducts?.length ?? 0) > 0 ? discountCode : undefined}
          />
        </div>
      </ContentBox>
    </div>
  );
};
