import { ToggleCancelAtPeriodEndBody } from '../../api/functions/own-form/toggleCancelAtPeriodEndZodBody';
import axios, { AxiosError } from 'axios';

export const toggleCancelAtPeriodEndClient = async (subscriptionId: string, cancelAtPeriodEnd: boolean) => {
  try {
    const response = await axios.post('/api/stripe/Subscription/Cancel', {
      subscriptionId,
      cancelAtPeriodEnd
    } as ToggleCancelAtPeriodEndBody);

    if (response) return { success: true };
  } catch (e) {
    return { error: (e as AxiosError).message };
  }
};
