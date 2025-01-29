import { stripe } from '../../../utils/stripe';
import { toggleCancelAtPeriodEndZodBody } from './toggleCancelAtPeriodEndZodBody';
import { NextRequest, NextResponse } from 'next/server';

export const toggleCancelAtPeriodEndAPI = async (request: NextRequest) => {
  const requestBody = await request.json();

  try {
    const { subscriptionId, cancelAtPeriodEnd } = toggleCancelAtPeriodEndZodBody.parse(requestBody);

    const cancel = await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: cancelAtPeriodEnd });
    if (!cancel) throw new Error('An error occurred');
  } catch (e) {
    return new NextResponse('An error occurred', { status: 500 });
  }

  return new NextResponse('Success', { status: 200 });
};
