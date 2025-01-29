import { stripe } from '../../../utils/stripe';
import { fetchStripeResource } from './fetchStripeResource';
import Stripe from 'stripe';

export const fetchStripeCustomers = async (expand?: string[]) =>
  await fetchStripeResource<Stripe.Customer>('customers', expand);

export const fetchStripeProducts = async (expand?: string[]) =>
  await fetchStripeResource<Stripe.Product>('products', expand);

export const fetchStripeSubscriptions = async (expand?: string[]) =>
  await fetchStripeResource<Stripe.Subscription>('subscriptions', expand);

export const fetchStripePrices = async (expand?: string[]) => await fetchStripeResource<Stripe.Price>('prices', expand);

export const fetchStripeCoupons = async (expand?: string[]) =>
  await fetchStripeResource<Stripe.Coupon>('coupons', expand);

export const fetchStripePromotionCodes = async (expand?: string[]) =>
  await fetchStripeResource<Stripe.PromotionCode>('promotionCodes', expand);
