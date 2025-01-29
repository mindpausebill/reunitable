import { toggleCancelAtPeriodEndAPI } from '@/submodules/subscriptions/lib/api/functions/own-form/toggleCancelAtPeriodEndAPI';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  return await toggleCancelAtPeriodEndAPI(request);
};
