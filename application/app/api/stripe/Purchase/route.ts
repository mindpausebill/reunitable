import { purchaseProduct } from '@/submodules/subscriptions/lib/api/functions/own-form/purchaseProduct';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  return await purchaseProduct(request);
}
