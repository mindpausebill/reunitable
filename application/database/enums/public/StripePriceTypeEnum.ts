import { createEnum } from 'schemix';
import { SCHEMA_NAME } from './_schemaName';

export default createEnum((StripPriceTypeEnum) => {
  StripPriceTypeEnum.addValue('one_time').addValue('recurring').addValue(`@@schema("${SCHEMA_NAME}")`);
});
