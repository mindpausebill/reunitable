import { SCHEMA_NAME } from './_schemaName';
import StripeSubscriptionSatusEnum from '@/database/enums/public/StripeSubscriptionSatusEnum';
import UUIDMixin from '@/database/mixins/UUID.mixin';
import { withRelations } from '@/database/relations/util/withRelations';
import { createModel, PrismaModel } from 'schemix';

export default withRelations(
  createModel((StripeSubscriptionModel) => {
    StripeSubscriptionModel.mixin(UUIDMixin)
      .string('subscriptionId', { unique: true })
      .enum('subscriptionStatus', StripeSubscriptionSatusEnum, { optional: true })
      .json('metadata', { optional: true })
      .int('quantity', { optional: true })
      .boolean('cancelAtPeriodEnd', { optional: true })
      .dateTime('created')
      .dateTime('currentPeriodStart')
      .dateTime('currentPeriodEnd')
      .dateTime('endedAt', { optional: true })
      .dateTime('cancelAt', { optional: true })
      .dateTime('canceledAt', { optional: true })
      .dateTime('trialStart', { optional: true })
      .dateTime('trialEnd', { optional: true })
      .relation('price', new PrismaModel('StripePrice'), {
        fields: ['priceId'],
        references: ['priceId']
      })
      .string('priceId')
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
