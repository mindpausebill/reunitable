import { createEnum } from 'schemix';
import { SCHEMA_NAME } from './_schemaName';

export default createEnum((StripePriceIntervalEnum) => {
  StripePriceIntervalEnum.addValue('day')
    .addValue('week')
    .addValue('month')
    .addValue('year')
    .addValue(`@@schema("${SCHEMA_NAME}")`);
});
