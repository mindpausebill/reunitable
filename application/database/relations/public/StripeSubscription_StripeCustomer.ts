import { oneToOne } from '../util/oneToOne';

export const StripeSubscription_StripeCustomer = oneToOne(
  {
    modelName: 'StripeSubscription',
    fieldName: 'user',
    options: { fields: ['userId'], references: ['userId'] }
  },
  { modelName: 'StripeCustomer', fieldName: 'subscription' }
);
