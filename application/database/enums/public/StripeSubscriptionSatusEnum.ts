import { createEnum } from 'schemix';
import { SCHEMA_NAME } from './_schemaName';

export default createEnum((StripeSubscriptionStatusEnum) => {
  StripeSubscriptionStatusEnum.addValue('active')
    .addValue('trialing')
    .addValue('canceled')
    .addValue('incomplete')
    .addValue('incomplete_expired')
    .addValue('past_due')
    .addValue('unpaid')
    .addValue('paused')
    .addValue(`@@schema("${SCHEMA_NAME}")`);
});
