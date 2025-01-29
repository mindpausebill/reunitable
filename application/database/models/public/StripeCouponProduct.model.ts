import { SCHEMA_NAME } from './_schemaName';
import UUIDMixin from '@/database/mixins/UUID.mixin';
import { withRelations } from '@/database/relations/util/withRelations';
import { createModel, PrismaModel } from 'schemix';

export default withRelations(
  createModel((StripeCouponProduct) => {
    StripeCouponProduct.mixin(UUIDMixin)
      .relation('product', new PrismaModel('StripeProduct'), {
        fields: ['productId'],
        references: ['productId']
      })
      .string('productId')
      .relation('coupon', new PrismaModel('StripeCoupon'), {
        fields: ['couponId'],
        references: ['couponId']
      })
      .string('couponId')
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
