import StripePriceIntervalEnum from '@/database/enums/public/StripePriceIntervalEnum';
import StripePriceTypeEnum from '@/database/enums/public/StripePriceTypeEnum';
import UUIDMixin from '@/database/mixins/UUID.mixin';
import { withRelations } from '@/database/relations/util/withRelations';
import { createModel, PrismaModel } from 'schemix';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((StripePriceModel) => {
    StripePriceModel.mixin(UUIDMixin)
      .string('priceId', { unique: true })
      .relation('product', new PrismaModel('StripeProduct'), {
        fields: ['productId'],
        references: ['productId'],
        optional: true
      })
      .string('productId', { optional: true })
      .boolean('active', { optional: true })
      .string('description', { optional: true })
      .int('unitAmount', { optional: true })
      .string('currency', { optional: true })
      .enum('type', StripePriceTypeEnum, { optional: true })
      .enum('pricingPlanInterval', StripePriceIntervalEnum, { optional: true })
      .int('intervalCount', { optional: true })
      .int('trialPeriodDays', { optional: true })
      .relation('subscription', new PrismaModel('StripeSubscription'), { list: true })
      .json('metadata', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
