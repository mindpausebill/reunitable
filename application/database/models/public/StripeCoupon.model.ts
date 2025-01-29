import { SCHEMA_NAME } from './_schemaName';
import StripeCouponDurationEnum from '@/database/enums/public/StripeCouponDurationEnum';
import UUIDMixin from '@/database/mixins/UUID.mixin';
import { withRelations } from '@/database/relations/util/withRelations';
import { createModel, PrismaModel } from 'schemix';

export default withRelations(
  createModel((StripeCouponModel) => {
    StripeCouponModel.mixin(UUIDMixin)
      .string('couponId', { unique: true })
      .int('amountOff', { optional: true })
      .string('currency', { optional: true })
      .enum('duration', StripeCouponDurationEnum)
      .int('duration_in_months', { optional: true })
      .string('name', { optional: true })
      .float('percentOff', { optional: true })
      .relation('promotionCodes', new PrismaModel('StripePromotionCode'), { list: true })
      .relation('products', new PrismaModel('StripeCouponProduct'), { list: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
