import { SCHEMA_NAME } from './_schemaName';
import UUIDMixin from '@/database/mixins/UUID.mixin';
import { withRelations } from '@/database/relations/util/withRelations';
import { createModel, PrismaModel } from 'schemix';

export default withRelations(
  createModel((StripeProductModel) => {
    StripeProductModel.mixin(UUIDMixin)
      .string('productId', { unique: true })
      .boolean('active', { optional: true })
      .string('name', { optional: true })
      .string('description', { optional: true })
      .string('image', { optional: true })
      .json('metadata', { optional: true })
      .relation('coupons', new PrismaModel('StripeCouponProduct'), { list: true })
      .relation('price', new PrismaModel('StripePrice'), { list: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
