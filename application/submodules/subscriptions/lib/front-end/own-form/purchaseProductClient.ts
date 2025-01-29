import { PurchaseProductRequestBody } from '../../api/functions/own-form/purchaseProductZodBody';
import { getClientSecretParams } from './getClientSecretForPurchaseType';
import axios, { AxiosError } from 'axios';

export const purchaseProductClient = async (
  price: string,
  parameters: getClientSecretParams['product'],
  createUser?: boolean,
  redirect?: string
): Promise<{ data: { clientSecret: string; user: { id: string; email?: string } } }> => {
  try {
    return await axios.post(`/api/stripe/Purchase?createUser=${createUser}&redirect=${redirect}`, {
      price,
      ...parameters
    } as PurchaseProductRequestBody);
  } catch (e) {
    throw new Error((e as AxiosError)?.response?.data as string);
  }
};
