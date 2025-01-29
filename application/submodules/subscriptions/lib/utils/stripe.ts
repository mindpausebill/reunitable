import Stripe from 'stripe';
require('dotenv').config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-04-10'
});
