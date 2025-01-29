import { purchaseProductClient } from './purchaseProductClient';
import { purchaseSubscriptionClient } from './purchaseSubscriptionClient';

export interface AddressObject {
  address1: string;
  address2: string;
  address3?: string;
  postcode: string;
  city: string;
}

export interface NameObject {
  first: string;
  last: string;
}

export interface getClientSecretParams {
  subscription: {
    invoiceItems?: { price: string }[];
    email?: string;
    address?: AddressObject;
    name?: NameObject;
    phone?: string;
  };
  product: {
    collectionMethod: string;
    description: string;
    email?: string;
    address?: AddressObject;
    name?: NameObject;
  };
}

export const getClientSecretForPurchaseType = async <PT extends keyof getClientSecretParams>(
  purchaseType: PT,
  price: string,
  parameters?: getClientSecretParams[PT],
  createUser?: boolean,
  redirect?: string,
  discountCode?: string
) => {
  if (purchaseType === 'subscription') {
    return await purchaseSubscriptionClient(
      price,
      parameters as getClientSecretParams['subscription'],
      createUser,
      redirect,
      discountCode
    );
  }

  return await purchaseProductClient(price, parameters as getClientSecretParams['product'], createUser, redirect);
};
