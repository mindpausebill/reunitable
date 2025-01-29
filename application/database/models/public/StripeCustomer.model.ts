import UUIDMixin from '@/database/mixins/UUID.mixin';
import { withRelations } from '@/database/relations/util/withRelations';
import { createModel } from 'schemix';
import { SCHEMA_NAME } from './_schemaName';

export default withRelations(
  createModel((StripeCustomerModel) => {
    StripeCustomerModel.mixin(UUIDMixin)
      .string('userId', { raw: '@database.Uuid', unique: true })
      .string('customerId', { optional: true })
      .string('fullName', { optional: true })
      .string('avatarUrl', { optional: true })
      .json('billingAddress', { optional: true })
      .json('paymentMethod', { optional: true })
      .raw(`@@schema("${SCHEMA_NAME}")`);
  })
);
