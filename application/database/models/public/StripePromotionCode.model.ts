import { SCHEMA_NAME } from './_schemaName';
import UUIDMixin from '@/database/mixins/UUID.mixin';
import { withRelations } from '@/database/relations/util/withRelations';
import { createModel, PrismaModel } from 'schemix';

export default withRelations(
  createModel((StripePromotionCode) => {
    StripePromotionCode.mixin(UUIDMixin)
      .string('promotionCodeId', { unique: true })
      .boolean('active')
      .string('code')
      .relation('coupon', new PrismaModel('StripeCoupon'), {
        fields: ['couponId'],
        references: ['couponId']
      })
      .string('couponId')
      .int('maxRedemptions', { optional: true })
      .dateTime('expires_at', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
