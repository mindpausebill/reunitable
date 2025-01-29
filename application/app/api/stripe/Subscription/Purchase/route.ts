import { purchaseSubscription } from '@/submodules/subscriptions/lib/api/functions/own-form/purchaseSubscription';
import _ from 'lodash';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  return await purchaseSubscription(request);
};
