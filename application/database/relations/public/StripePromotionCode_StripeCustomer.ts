import { oneToMany } from '../util/oneToMany';

export const StripePromotionCode_StripeCustomer = oneToMany(
  {
    modelName: 'StripePromotionCode',
    fieldName: 'user',
    options: { fields: ['userId'], references: ['userId'], optional: true }
  },
  { modelName: 'StripeCustomer', fieldName: 'promotionCode' }
);
