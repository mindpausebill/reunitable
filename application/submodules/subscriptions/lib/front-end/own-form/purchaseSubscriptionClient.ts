import { PurchaseSubscriptionRequestBody } from '../../api/functions/own-form/purchaseSubscriptionZodBody';
import { getClientSecretParams } from './getClientSecretForPurchaseType';
import axios, { AxiosError } from 'axios';

export const purchaseSubscriptionClient = async (
  price: string,
  parameters: getClientSecretParams['subscription'],
  createUser?: boolean,
  redirect?: string,
  discountCode?: string
): Promise<{ data: { clientSecret: string; user: { id: string; email?: string } } }> => {
  try {
    return await axios.post(`/api/stripe/Subscription/Purchase?createUser=${createUser}&redirect=${redirect}`, {
      subscriptionPrice: [{ price }],
      ...parameters,
      discountCode
    } as PurchaseSubscriptionRequestBody);
  } catch (e) {
    throw new Error((e as AxiosError)?.response?.data as string);
  }
};
